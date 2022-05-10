import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, ArcElement, Legend, Tooltip} from 'chart.js';
ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, ChartDataLabels, ArcElement, Legend, Tooltip );

const PieChart = ({ chartData, chartOptions }) => {

  return (
  <>
    <Pie
    data={chartData}
    options={chartOptions}
        

    />
  </>
  )
}

export default PieChart