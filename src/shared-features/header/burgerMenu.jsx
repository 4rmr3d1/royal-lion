import React from 'react'
import { Modal, Backdrop, Slide } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from '@app/store'
import { HeaderProfileCard } from '@app/ui'
import classes from './style.module.scss'

const BurgerMenu = () => {
  const { dispatch } = useDispatch()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const isLoggedIn = useSelector(state => state.authReducer.login.isLoggedIn)
  const firstName = useSelector(state => state.authReducer.user?.data?.first_name)
  const secondName = useSelector(state => state.authReducer.user?.data?.second_name)
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
      {open ? (
        <button
          className="btn-burger-close"
          type="button"
          onClick={handleClose}
        >
          <span></span>
          <span></span>
        </button>
      ) : (
        <button
          className="btn-burger"
          type="button"
          onClick={handleOpen}
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
        open={open}
        onClose={handleClose}
      >
        <Slide
          direction="left"
          in={open}
        >
          <div className={classes.paper}>
            {isLoggedIn ? (
              <HeaderProfileCard
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
              >
                  Линия
              </NavLink>
              <NavLink
                activeClassName={classes.activeLink}
                to='/live'
              >
                  Лайв
              </NavLink>
              <NavLink
                activeClassName={classes.activeLink}
                to='/result'
              >
                  Результаты
              </NavLink>
              <NavLink
                activeClassName={classes.activeLink}
                to='/contact'
              >
                  Контакты
              </NavLink>
            </nav>
          </div>
        </Slide>
      </Modal>
    </div>
  )
}
export default BurgerMenu
