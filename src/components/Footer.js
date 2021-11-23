import React from "react";
import { useEffect, useState, useCallback } from 'react';
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
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  animation: true,
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
    filler: {
      drawTime: 'beforeDatasetDraw'
    }
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
  },
};

const labels = [];

export const chartData = {
  labels,
  datasets: [
    {
      label: "Elapsed time in millis",
      data: [],
      yAxisID: 'y',
      fill: true,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      stepped: true,
    },
  ],
};

function Footer({ children }) {
  const data = useSelector((state) => state.data);
  const [chartState, setChartState] = useState(chartData);

  const updateData = useCallback(async () => {
    const labels = data.map((item) => item.labels);
    labels.shift();
    //console.log("Labels IS: ", labels);

    const dataset = data.map((item) => item.dataset);
    dataset.shift();
    //console.log("dataset IS: ", dataset);

    setChartState({ ...chartState, labels, datasets: [{ ...chartState.datasets[0], data: dataset }] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    updateData();
  }, [updateData, data]);

  return (
    <div className="App-footer">
      <Line options={options} data={chartState}/>
      {children}
    </div>
  );
}

export default Footer;
