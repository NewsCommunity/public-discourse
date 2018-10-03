import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
  <nav className='navbar navbar-inverse'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <Link className='navbar-brand' to={`/`}>publicDiscourse</Link>

      </div>
      <ul className='nav navbar-nav'>
        <li className='active'><a href='#'>Login/logout</a></li>
      </ul>
      <ul className='nav navbar-nav navbar-right'>
        <li className='dropdown'>
          <a className='dropdown-toggle' data-toggle='dropdown' href='#'>
                        UserStuff
                        <span class='caret' />
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
