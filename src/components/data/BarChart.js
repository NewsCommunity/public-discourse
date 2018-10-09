import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

export default class BarChart extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let countries = Object.keys(this.props.countries)
    let values = Object.values(this.props.countries)
    const data = {
      labels: countries,
      datasets: [
        {
          label: 'Story origin',
          display: 'false',
          data: values,
          backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
        }
      ]
    }
    const options = {
      responsive: false
    }
    return (
      <div>
        <Bar data={data} options={options} />
      </div>
    )
  }
}
