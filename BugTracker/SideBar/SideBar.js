import React from 'react'
import Navigation from './Navigation'
import Inputs from './Inputs'

const SideBar = ({id, reports, setView, reportData, setReportData, setCreateComment, error, staticReports, handleSort}) => {


  return (
    <>
    <div className='report-item-container'>   
        <div className='report-block1'>
            <Navigation 
            id={id}
            reports={reports}
            setView={setView}
            staticReports={staticReports}
            handleSort={handleSort}/>
        </div>
        <div className='report-block2'>
            {id!== undefined && id!=="create" && id!=="login"
            ?<Inputs 
            requestorName={reportData.name}
            requestorEmail={reportData.email}
            requestorSubject={reportData.subject}
            requestorStatus={reportData.reportStatus}
            error={error}
            setReportData={setReportData}/>
            :null}
            {id==="create"
            ?<Inputs 
            requestorName={null}
            requestorEmail={null}
            requestorSubject={null}
            requestorStatus={null}
            error={error}
            setReportData={setReportData}/>
            :null}
        </div>
    </div>
    </>
  )
}

export default SideBar


