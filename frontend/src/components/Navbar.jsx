import React, { useState } from 'react';
import './navbarstyle.css';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Menuitem } from './Menuitem';
import ReactCurvedText from 'react-curved-text';
import { UseAuthStore } from '../store/authUser';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    setClicked(!clicked);
  };

  // Handle logout
  const handleLogout = async () => {
    const { logout } = UseAuthStore.getState(); // Access the logout function
    await logout();
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <nav className='navBar'>
      <ReactCurvedText
        width='384'
        height='117'
        cx='142'
        cy='100'
        rx='165'
        ry='31'
        startOffset='85'
        reversed={true}
        text='Streamio'
        textProps={{ className: 'logo', style: { fontSize: '40' } }}
        textPathProps={{ fill: '#FF0000' }}
        tspanProps={null}
        ellipseProps={{ fill: 'none', stroke: 'none' }}
        svgProps={null}
      />

      <div className='menu-icons' onClick={handleClick}>
        <i className={clicked ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-bars'}></i>
      </div>
      <ul className={clicked ? 'navbaritem active' : 'navbaritem'}>
        {Menuitem.map((item, index) => {
          if (item.url === '/') {
            return (
              <li key={index} onClick={handleLogout}>
                <span className={item.cName}>
                  <i className={item.icon}></i>
                  {item.title}
                </span>
              </li>
            );
          } else {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
