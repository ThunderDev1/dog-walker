import * as React from 'react';
import userManager from '../userManager';
import {Link} from 'react-router-dom';

const Nav = () => {
  const logout = (event: any) => {
    event.preventDefault();
    userManager.signoutRedirect();
    userManager.removeUser();
  };

  return (
    <header className="navbar">
      <section className="navbar-section">
        <Link to="/" className="btn btn-link btn-lg">
          Nova Walker
        </Link>
        <Link to="/user" className="btn btn-link">
          User
        </Link>
        <button className="btn btn-default btn-sm" onClick={event => logout(event)}>
          Logout
        </button>
      </section>
    </header>
  );
};

export default Nav;
