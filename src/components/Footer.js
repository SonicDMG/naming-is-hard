import React from 'react';
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
  },
};

const labels = [];

export const chartData = {
  labels,
  datasets: [
    {
      label: 'Elapsed time in millis',
      //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: [202],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
  ],
};

function Footer () {
  const data = useSelector((state) => state.data);

  const labels = data.map((item) => item.labels);
  labels.shift();
  //console.log("Labels IS: ", labels);

  const dataset = data.map((item) => item.dataset);
  dataset.shift();
  //console.log("dataset IS: ", dataset);

  chartData.labels = labels;
  chartData.datasets[0].data = dataset;
  console.log("chartData IS: ", chartData);
  //chartData.datasets[0].data = [400,39,300];

  return (
    <div className="App-footer">
      <Line options={options} data={chartData} />
    </div>
  );
}

export default Footer;
