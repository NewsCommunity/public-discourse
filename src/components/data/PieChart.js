import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {
  const { sourcesData } = props;
  const sources = Object.keys(sourcesData);
  const values = [];
  sources.forEach((source) => {
    values.push(sourcesData[source]);
  });

  const data = {
    labels: sources,
    datasets: [
      {
        data: values,
        backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      },
    ],
  };
  const options = {
    responsive: true,
  };
  return (
    <div>
      <Pie
        data={data}
        options={options}
      />
    </div>
  );
};

export default PieChart;
