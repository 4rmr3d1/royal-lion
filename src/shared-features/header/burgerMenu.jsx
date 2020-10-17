import React from 'react'
import { Modal, Backdrop, Slide } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from '@app/store'
import { HeaderProfileCard } from '@app/ui'
import classes from './style.module.scss'

const BurgerMenu = () => {
  const { dispatch } = useDispatch()

  const isLoggedIn = useSelector(state => state.authReducer.login.isLoggedIn)
  const firstName = useSelector(state => state.authReducer.user?.data?.first_name)
  const secondName = useSelector(state => state.authReducer.user?.data?.second_name)
  const balance = useSelector(state => state.authReducer.user?.data?.customer_account?.current_balance)

  const visible = useSelector(state => state.authReducer.properties.burgerVisible)

  const handleBurger = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: { burgerVisible: !visible }
    })
  }, [dispatch, visible])

  const onAuthModalOpen = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: {
        authModalVisible: true
      }
    })
  }, [dispatch])

  return (
    <div>
      {visible ? (
        <button
          className="btn-burger-close"
          type="button"
          onClick={handleBurger}
        >
          <span></span>
          <span></span>
        </button>
      ) : (
        <button
          className="btn-burger"
          type="button"
          onClick={handleBurger}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      )}

      <Modal
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
          style: { backgroundColor: 'transparent' }
        }}
        closeAfterTransition
        open={visible}
        style={{ zIndex: 1099 }}
        onClose={handleBurger}
      >
        <Slide
          direction="left"
          in={visible}
        >
          <div className={classes.paper}>
            {isLoggedIn ? (
              <HeaderProfileCard
                balance={balance}
                firstName={firstName}
                secondName={secondName}
              />
            ) : (
              <div className={`${classes.userNav}`}>
                <a
                  className={classes.enter}
                  href='#'
                  onClick={onAuthModalOpen}
                >
                      Вход
                </a>
                <NavLink
                  className='btn btn-mini'
                  to='/registration'
                  onClick={handleBurger}
                >
                      Регистрация
                </NavLink>
              </div>
            )}
            <nav className={`${classes.menu}`}>
              <NavLink
                activeClassName={classes.activeLink}
                exact
                to='/'
                onClick={handleBurger}
              >
                  Линия
              </NavLink>
              <NavLink
                activeClassName={classes.activeLink}
                to='/live'
                onClick={handleBurger}
              >
                  Лайв
              </NavLink>
              <NavLink
                activeClassName={classes.activeLink}
                to='/result'
                onClick={handleBurger}
              >
                  Результаты
              </NavLink>
            </nav>
          </div>
        </Slide>
      </Modal>
    </div>
  )
}
export default BurgerMenu
