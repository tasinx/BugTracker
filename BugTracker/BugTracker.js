import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard';
import Report from './Report';
import ReportList from './ReportList';
import SideBar from './SideBar/SideBar';
import Login from './Users/Login';

const BugTracker = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [reports,setReports] = useState(null)   
    const [staticReports, setStaticReports] = useState(null)
    const [view, setView] = useState({changeView:"dashboard"})    
    const [reportData, setReportData] = useState({ data:null })    
    const [reportComments, setReportComments] = useState(null)
    const [createComment, setCreateComment] = useState(null)
    const [error, setError] = useState("")
    const [listSorting, setListSorting] = useState("")
    document.body.style.backgroundColor = "#f0ead6"

    const handleSort = (param) => {
        if (param==="all") {
            setView({changeView:"reports"})
            const newList = staticReports.data
            setReports({...reports, data:newList})
        }
        if (param==="new") {
            setView({changeView:"reports"})
            const newList = staticReports.data.filter(element => element.report_status==="New")
            setReports({...reports, data:newList})
        }
        if (param==="open") {
            setView({changeView:"reports"})
            const newList = staticReports.data.filter(element => element.report_status==="Open")
            setReports({...reports, data:newList})
        }
        if (param==="pending") {
            const newList = staticReports.data.filter(element => element.report_status==="Pending")
            console.log(newList)
            setReports({...reports,data:newList})
            setView({changeView:"reports"})
        }
    }


    useEffect(() => {
        const callApi = () => {
            fetch('/api/get-list')
            .then(response => response.json())
            .then(data => {
                setReports({...reports, sorted:"created"}),
                setStaticReports({data})
                
            })    
        }
        callApi()
    },[,navigate])
    useEffect(() => {
        let apiCall = () => {
            fetch("/api/get-report" + "?code=" + id)
            .then(res => res.json())
        .then(data => {
            setReportData({ 
            name: data[0].name,
            email: data[0].email,
            subject: data[0].subject,
            reportStatus: data[0].report_status,
            createdAt: data[0].created_at
            })
            ,setReportComments(data[1])  
        })
        }
        if (id !== undefined && id !== "create" && id!== "login") {              
            apiCall()
            setError("")
        } else {

        }  
    },[,navigate])

    return (
    <>
    <div className='report'>
        <SideBar 
        id={id}
        error={error}
        setError={setError}
        reports={reports}
        setView={setView}
        reportData={reportData}
        setReportData={setReportData}
        setCreateComment={setCreateComment}
        staticReports={staticReports}
        handleSort={handleSort}/>

        {id===undefined && reports!==null && view.changeView!=="dashboard" ? <ReportList reports={reports} setReports={setReports} staticReports={staticReports}/> : null}

        {staticReports!==null && id===undefined && view.changeView==="dashboard" ? <Dashboard reports={reports} setReports={setReports} setView={setView} staticReports={staticReports}/> : null}

        {id!==undefined && id!=="login" && reports !== "dashboard"?
        <Report
        id={id}
        setError={setError}
        reportData={reportData}
        reportComments={reportComments}
        setReportComments={setReportComments}
        createComment={createComment}
        setCreateComment={setCreateComment}
        setReports={setReports}
        /> : null}  

        {id==="login"?<Login/>:null}

    </div>
    </>
  )
};

export default BugTracker;
