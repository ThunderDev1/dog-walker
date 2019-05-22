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
          Nova
        </Link>
        <Link to="/user" className="btn btn-link">
          Profil
        </Link>
        <Link to="/friends" className="btn btn-link">
          Amis
        </Link>
        <Link to="/meetings" className="btn btn-link">
          Balades
        </Link>
      </section>
      <section className="navbar-center">
        <button className="btn btn-primary btn-sm mx-2" onClick={event => logout(event)}>
          <i className="icon icon-shutdown" />
        </button>
      </section>
    </header>
  );
};

export default Nav;
