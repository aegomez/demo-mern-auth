import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className='navbar-fixed'>
      <nav className='z-depth-0'>
        <div className='nav-wrapper white'>
          <Link
            to='/'
            style={{
              fontFamily: 'monospace'
            }}
            className='col s5 brand-logo center black-text'>
            <em className='material-icons'>code</em>
            MERN
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
