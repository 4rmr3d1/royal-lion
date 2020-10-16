import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

export const NotFound = () => {
  return (
    <section className='notFound'>
      <div className="row align-items-center">
        <div className="col-lg-6">
          <img
            alt=""
            src="img/notFound.svg"
          />
        </div>
        <div className="col-lg-6">
          <div className="text">
            <img
              alt=""
              className="label"
              src="img/notFoundLabel.svg"
            />
            <p>Потерялся? Загляни к нам на <NavLink to="/">главную страницу</NavLink></p>
          </div>
        </div>
      </div>
    </section>
  )
}
