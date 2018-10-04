import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { thunkGetDiscourseList } from '../../state/discourse/actions'

class BarChart extends Component {
  constructor (props) {
    super(props)
  }
  async componentDidMount () {
    await this.props.getDiscourseList()
  }

  render () {
    const { discourseList } = this.props
    const labels = []
    discourseList.forEach(discourse => {
      labels.push(discourse.article.title)
    })
    console.log('THE LABELS', labels)
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Messages',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45, 8, 9, 10]
        }
      ]
    }

    console.log('THE DISCOURSE LIST IN THE BARCHART', discourseList)
    return (
      <div>
        <Bar
          data={data}
          width={100}
          height={200}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    display: false
                  }
                }
              ]
            }
          }}
                />
      </div>
    )
  }
}

// ====== CONTAINER ======

function mapState (state) {
  return {
    discourseList: state.discourseReducer.discourseList
  }
}

function mapDispatch (dispatch) {
  return {
    getDiscourseList: () => {
      dispatch(thunkGetDiscourseList())
    }
  }
}

export default connect(mapState, mapDispatch)(BarChart)
