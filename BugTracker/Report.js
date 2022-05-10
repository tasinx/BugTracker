import React from 'react';
import formValidation from './formValidation';
import { useNavigate } from 'react-router-dom';

const Report = ({ id, reportData, reportComments, setReportComments, createComment, setCreateComment, setError, setReports }) => {
    const navigate = useNavigate()

    const handleComment = (e) => {
        const { id, value } = e.target;
        setCreateComment((prevState) => {return {...prevState, [id]:value,}})
        console.log(createComment)
        }

    const handleSubmit = () => {
        const commentApi = (reportId) => {
            if (createComment === null) return
            //API call to create comment input
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    report: reportId,
                    text: createComment.text
                }),
                };
                fetch("/api/create-comment", requestOptions)
                .then((response) => response.json())
                .then(data => {setReportComments(data)})   
                .then(document.getElementById('text').value = "")
            }


            if (id==="create"){
                //If creating a report, calling API to create new Report object
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        subject: reportData.subject,
                        name: reportData.name,
                        report_status: reportData.reportStatus,
                        email: reportData.email,
                    }),
                    };
                    if(createComment===null || createComment.text==="") {
                        setError("Message box empty...")
                        return
                    }
                    let errors = formValidation(reportData)   
                    let errorsExist = Object.keys(errors).length !== 0 && errors.constructor === Object
                    if(!errorsExist){
                        fetch("/api/create-report", requestOptions)
                        .then((response) => response.json())
                        .then(data => {commentApi(data.id), navigate("/bugtracker/" + data.id),console.log(data)})
                    }else setError("Invalid Inputs...")

            }else {
                //If not creating, calling API to update Name/Subject/Email
                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        code: id,
                        name: reportData.name,
                        report_status: reportData.reportStatus,
                        email: reportData.email,
                        subject: reportData.subject,
                        })
                };
                    let errors = formValidation(reportData)   
                    let errorsExist = Object.keys(errors).length !== 0 && errors.constructor === Object
                    if(!errorsExist){
                        fetch("/api/update-report", requestOptions)
                        .then((response) => response.json())
                        .then(data => setReports({data}))   
                        .then(commentApi(id))
                        .then(setError("Submitted..."))
                        if(reportData.reportStatus==="Closed") navigate('/bugtracker')
                        
                    }else setError("Invalid Inputs...")      
                        
            }

        }
    
    const renderReport = () => {
        return(
        <>
            <div className='report-comments'>
                {reportComments?reportComments.map((item) => {
                    return (
                        <li key={item.text} className="report-comments-item">
                            {item.text}
                        </li>
                    )
                }):null}       
            </div>    
        </>
        )}


    return (
        <>
            {id!=="create"?renderReport():null}
            <div className='create-comment'>
                <textarea type="text" id='text' placeholder='Type message here...' onChange={handleComment} 
                style={{height:'100%', width:'100%',marginTop:'0',
                backgroundColor:"inherit",fontSize:"inherit"}}/>

            </div>
            <div className='button-box'>
                <button className='submit-button' onClick={handleSubmit}>Submit</button>
                <div>
                </div>
            </div>
        </>
  );
};

export default Report;
