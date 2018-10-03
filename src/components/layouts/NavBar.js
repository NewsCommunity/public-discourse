import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
  <nav className='navbar navbar-inverse'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <Link className='navbar-brand' to={`/discourseList`}>publicDiscourse</Link>

      </div>
      <ul className='nav navbar-nav'>
        <li className='active'><a href='#'>Login/logout</a></li>
      </ul>
      <ul className='nav navbar-nav navbar-right'>
        <a href='#'><span className='glyphicon glyphicon-log-in' /> ACCOUNT</a>
      </ul>
    </div>
  </nav>
)
