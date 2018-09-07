import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import '../styles/Header.css';

function Header(){
  return (
    <div className="flex pal justify-between nowrap rainbow">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          news
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          create
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Header);