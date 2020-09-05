import React from 'react';
import {Link} from 'react-router-dom';
import './index.scss';

const Sidebar = () => {
  return (
    <aside>
      <div className="container">
        <nav className="category">
          <div className="row justify-content-around">
            <div className="col-lg-auto">
              <Link className="btn-sort select">
                <i className="icon-football"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-tennis"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-hockey"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-basketball"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-volleyball"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-baseball"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-ping-pong"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-gandbol"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-american-football"></i>
              </Link>
            </div>
            <div className="col-lg-auto">
              <Link className="btn-sort">
                <i className="icon-badminton"></i>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
