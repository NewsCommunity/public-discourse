import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <nav className='navbar navbar-default fixed-top bg-light'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link className='navbar-brand' to={`/`}>publicDiscourse</Link>

          </div>
          <ul className='nav navbar-nav'>
            <li className='active'><a href='#'>Login/logout</a></li>
            <Link className='navbar-brand' to={`/data`}>Data</Link>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li className='dropdown'>
              <a className='dropdown-toggle' data-toggle='dropdown' href='#'>
                                UserStuff
                                <span className='caret' />
              </a>
              <ul className='dropdown-menu'>
                <li>UserStuff1</li>
                <li>UserStuff2</li>
                <li>UserStuff3</li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
