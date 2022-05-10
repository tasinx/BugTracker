import React from 'react'
import PieChart from './PieChart';

const Dashboard = ({reports, setReports, setView, staticReports}) => {
    let newReports = []
    let openReports = []
    let pendingReports = []
    staticReports.data.forEach(item => {
        if(item.report_status==="New") newReports.push(item)
        if(item.report_status==="Open") openReports.push(item)
        if(item.report_status==="Pending") pendingReports.push(item)
    })

    const graphClickEvent = (e, item) => {
        const pieIndex = item[0].index
        if (pieIndex===0) {
            setView({changeView:"reports"})
            const newList = staticReports.data.filter(element => element.report_status==="New")
            setReports({...reports, data:newList})
        }
        if (pieIndex===1) {
            setView({changeView:"reports"})
            const newList = staticReports.data.filter(element => element.report_status==="Open")
            setReports({...reports, data:newList})
        }
        if (pieIndex===2) {
            setView({changeView:"reports"})
            const newList = staticReports.data.filter(element => element.report_status==="Pending")
            setReports({...reports, data:newList})
        }
    }

  return (
    <>
    <div style={{gridColumn:"4 /span 15", gridRow:"1 / span 17", 
        display:"flex",justifyContent:"center",alignItems:"center",
         height:"100%",width:"100%"}}>
        <div className='dashboard-container'>
            <div className='dashboard-item dbitem1'>
                <PieChart chartData={{
                labels: [
                    'New',
                    'Open',
                    'Pending'
                ],
                  datasets: [{
                    label: 'Active Reports',
                    data: [newReports.length, openReports.length, pendingReports.length],
                    backgroundColor: [
                      'rgb(255, 205, 86)',
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                    ],
                    hoverOffset: 6
                  }]}}
                chartOptions={{ 
                    onClick: graphClickEvent,
                    maintainAspectRatio: false,
                    plugins: {

                        tooltip: {
                            enabled: false
                        },

                        title: {
                            display: true,
                            text: "Active Reports",
                            font: {
                                size: 40
                            }
                        },
                        legend: {
                            display: true,
                            labels: {

                                font: {
                                    size: 16
                                }
                            }
                        },
                    }
                    
                }}
                    />
            </div>
            <div className='dashboard-item dbitem2'></div>
            <div className='dashboard-item dbitem3'></div>
            <div className='dashboard-item dbitem4'></div>

        </div>
    </div>

    </>
            )
    }


export default Dashboard