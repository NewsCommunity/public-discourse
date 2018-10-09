import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export default class PieChart extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log('THE PASSED IN PROPS, ', this.props)
    let sources = Object.keys(this.props.sourcesData)
    let values = Object.values(this.props.sourcesData)
    console.log('sources, ', Object.keys(this.props.sourcesData))
    console.log('counts', Object.values(this.props.sourcesData))

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