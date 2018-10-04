import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'

export default class Data extends Component {
  constructor (props) {
    super(props)
  }
  async componentDidMount () {}

  render () {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Messages per discourse',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }
      ]
    }
    return (
      <div>
        <Bar
          data={data}
          width={100}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
                />
      </div>
    )
  }
}
