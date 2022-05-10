import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = ({id, staticReports, setView, handleSort}) => {
    const navigate = useNavigate()

    const handleViewChange = (e) => {
        let changeView = e.target.id
        setView({changeView})
        if(changeView==="reports") handleSort("all")
        navigate("/bugtracker")
    }


    const handleNavigation = (e) => {
        const clicked = e.target.id
        if (clicked==="create"){
            const comment = document.getElementById('text')
            if(comment) comment.value = ""
            navigate("/bugtracker/create")  
        }
        if (clicked==="login") navigate("/bugtracker/login")
    }

  return (
    <>
    <div style={{height:"30%",width:"100%",display:"flex", justifyContent:"space-between", marginTop:"1%"}}>
        <div id="login" onClick={handleNavigation} style={{display:"flex",fontSize:"smaller",alignItems:"center",
        justifyContent:"center",height:"70%", width:"22%"}}>
            Login
        </div>
        {id!=="create"? 
        <div id="create" className='create-report-button' onClick={handleNavigation}>+</div>
        :null}
    </div>

    <div>
        <div className='sidebar-item' id="dashboard" onClick={handleViewChange} style={{borderTop:"rgba(0,0,0, 1) 1px solid"}}>
            <div style={{zIndex:"5",pointerEvents:"none"}}>
                Dashboard
            </div>
        </div>
        <div className='sidebar-item' id="reports" onClick={handleViewChange} >
            <div style={{zIndex:"5",pointerEvents:"none"}}>
                Reports
            </div>
            <div style={{zIndex:"5",pointerEvents:"none", marginRight:"2%"}}>
                ({staticReports!==null?staticReports.data.length:null})
            </div>
        </div>
        <div className='sidebar-sort-container' id="reports" onClick={handleViewChange}>
            <div className='sidebar-sort-item'  onClick={e => handleSort("new")} style={{border:"none",background:"yellow"}}>
                N
            </div>
            <div className='sidebar-sort-item' onClick={e => handleSort("open")} style={{background:"red"}}>
                O
            </div>
            <div className='sidebar-sort-item' onClick={e => handleSort("pending")} style={{background:"rgb(54,162,235)"}}>
                P
            </div>
        </div>
    </div>

    </>
  )
}

export default Navigation