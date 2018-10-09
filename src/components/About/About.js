import React, { Component } from 'react'

export default class About extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const styles = {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '1em',
      alignItems: 'center',
      padding: '3em'
    }

    const imgStyles = {
      maxHeight: '80%',
      maxWidth: '80%',
      paddingBottom: '2em'
    }

    return (
      <div className='about' style={styles}>
        <img
          src='https://qph.fs.quoracdn.net/main-qimg-a8a9f6b1a3b68d7be5e9272d31e184ee-c'
          style={imgStyles}
          alt=''
                />
        <p>
                    publicDiscourse is a react application for chatting with others
                    while consuming news content
                </p>
        <p>
                    State management of the application is handled through react-redux
                </p>
        <p>
                    To facilitate real-time chatting, we used the google cloud Firestore{' '}
        </p>
        <p>
                    MaterialUI handles the majority of our styled components
                </p>
        <p>
                    Chart.js is used to compose our data section
                </p>
        <p>
                    We have also incorporated a block-chain micropayment system to
                    donate money to content creators and others users
                </p>
        <ul>
                    Our Team:
                    <li>
                        Matt Mintzer
                    </li>
          <li>
                        Drake Evans
                    </li>

          <li>
                        Dennison Bertram
                    </li>
        </ul>
      </div>
    )
  }
}
