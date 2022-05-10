import React from 'react'
import { useNavigate } from 'react-router-dom'

const ReportList = ({reports, setReports, staticReports}) => {
    const navigate = useNavigate()
    const handleOnClickNavigate = (e) => {
        let report = e.target.id
        if(report === "create-report-button") {
            navigate("/bugtracker/create")
            
            return
        }
        if (report === '') return
        navigate("/bugtracker/" + report) 
    }

    const formatTime = (param) => {
        const date = new Date(param)
        const hour = date.getHours()
        const minute = date.getMinutes()
        const month = date.getMonth()
        const monthList = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Decr"];
        const day = date.getDate()
        const year = date.getFullYear()
        let h, t
        const m = minute < 10 ? "0" + minute : minute  
        if (hour >= 12){
            h = hour - 12  
            t = "PM"              
        }
        else if (hour < 12){
            h = hour
            t = "AM"
        }
        const time = (`${monthList[month]} ${day} ${year}, ${h}:${m} ${t}`)
        return time
    }

    const sortReports = (sortQuery) => {
        if(sortQuery==="subject") {
            if(reports.sorted==="subject") {
                setReports({...reports, data:reports.data.reverse()})
                return
            }
            const newList = reports.data.sort(function(a, b){
                var nameA = a.subject.toLowerCase(), nameB = b.subject.toLowerCase();
                if (nameA < nameB) 
                 return -1;
                if (nameA > nameB)
                 return 1;
                return 0; 
               });
            setReports({...reports,data:newList,sorted:"subject"})
        }
        if(sortQuery==="name") {
            if(reports.sorted==="name") {
                setReports({...reports, data:reports.data.reverse()})
                return
            }
            const newList = reports.data.sort(function(a, b){
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) 
                 return -1;
                if (nameA > nameB)
                 return 1;
                return 0; 
               });
            setReports({...reports,data:newList,sorted:"name"})
        }
        if(sortQuery==="created") {
            if(reports.sorted==="created") {
                setReports({...reports, data:reports.data.reverse()})
                return
            }
            const newList = reports.data.sort(function(a, b){
                if (a.created_at < b.created_at) 
                 return -1;
                if (a.created_at > b.created_at)
                 return 1;
                return 0; 
               });
            setReports({...reports,data:newList,sorted:"created"})
        }


    }
    console.log(reports)
    console.log(staticReports)
    let dynamicReports
    reports===undefined
    ?dynamicReports=staticReports
    :dynamicReports=reports
    
  return (
    <>
    <div className='report-container'>
        <div className='report-list-column'>
            <div></div>
            <div id="subject"className='report-list-column-items' onClick={e => sortReports(e.target.id)}>Subject</div>
            <div id="name" className='report-list-column-items' onClick={e => sortReports(e.target.id)}>Requestor</div>
            <div id="created" className='report-list-column-items' onClick={e => sortReports(e.target.id)}>Created</div>
        </div>
        <div className='report-list'>
            {dynamicReports.data.map((item,i) => { return (
                <li key={i} className='report-list-container' id={item.id} onClick={handleOnClickNavigate} >
                <div className='report-list-item'>{item.report_status}</div>
                <div className='report-list-item'>{item.subject}</div>
                <div className='report-list-item'>{item.name}</div>
                <div className='report-list-item'>{formatTime(item.created_at)}</div>
            </li>)})}           
        </div>
    </div>

    </>
  )
}

export default ReportList
