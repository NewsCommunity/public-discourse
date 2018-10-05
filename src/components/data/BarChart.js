import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

export default class BarChart extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { titles, numMessages } = this.props
    const data = {
      labels: titles,
      datasets: [
        {
          label: 'Messages',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: numMessages
        }
      ]
    }

    return (
      <div>
                HELLO
            </div>
    )
  }
}
