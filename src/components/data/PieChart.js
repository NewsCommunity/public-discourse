import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export default class PieChart extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let sources = Object.keys(this.props.sourcesData)
    let values = []
    sources.forEach(source => {
      values.push(this.props.sourcesData[source])
    })

    const data = {
      labels: sources,
      datasets: [
        {
          data: values,
          backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
        }
      ]
    }
    const options = {
      responsive: true
    }
    return (
      <div>
        <Pie data={data} options={options} />
      </div>
    )
  }
}
