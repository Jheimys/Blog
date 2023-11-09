import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>
        <span>Blog</span>
      </Link> 

      <ul>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/about'>Sobre</Link>
        </li>
      </ul> 
    </nav>
  )
}

export default Navbar