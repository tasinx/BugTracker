import React from 'react'

const Inputs = ({ setReportData, error, requestorName, requestorEmail, requestorSubject, requestorStatus }) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setReportData((prevState) => {return {...prevState, [id]:value,}})

    }
    
    return (
        <>

        <div style={{display:"flex", justifyContent:'space-between',margin:"1.5% 1% 1% 0"}}>
            <span style={{paddingLeft:"3%"}}>Requestor:</span>  
            <select id="reportStatus" className='report-select-input' onChange={handleChange} value={requestorStatus}>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
            </select>            
        </div>
        <input id="name" className='report-input' maxlength="50" onChange={handleChange} placeholder="Name" value={requestorName}/>
        <input id="email" className='report-input' maxlength="50" onChange={handleChange} placeholder="Email" value={requestorEmail}/>
        <span style={{paddingLeft:"3%"}}>Issue:</span>              
        <input id="subject" className='report-input' maxlength="50" onChange={handleChange} placeholder="Subject" value={requestorSubject}/>
        <div style={{display:"flex",justifyContent:"center",height:"15%", alignItems:"center",color:"red",fontWeight:"bold"}}>
            {error}
        </div>

    </>
  )
}

export default Inputs