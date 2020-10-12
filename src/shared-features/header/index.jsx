import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, useMediaQuery } from '@material-ui/core'
import { useSelector, useDispatch } from '@app/store'
import { HeaderProfileCard } from '@app/ui'
import { LoginModal } from '../login-modal'
import BurgerMenu from './burgerMenu'
import classes from './style.module.scss'

export const Header = () => {
  const { dispatch } = useDispatch()

  const isLoggedIn = useSelector(state => state.authReducer.login.isLoggedIn)
  const firstName = useSelector(state => state.authReducer.user?.data?.first_name)
  const secondName = useSelector(state => state.authReducer.user?.data?.second_name)
  const authModalVisible = useSelector(state => state.authReducer.properties.authModalVisible)
  const mdBreakPoint = useMediaQuery('(min-width: 991px)')
  const onAuthModalOpen = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: {
        authModalVisible: true
      }
    })
  }, [dispatch])

  const onAuthModalClose = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: {
        authModalVisible: false
      }
    })
  }, [dispatch])

  return (
    <>

      <LoginModal
        visible={authModalVisible}
        onClose={onAuthModalClose}
      />
      {mdBreakPoint ? (
        <AppBar
          position='sticky'
        >
          <div className={classes.header}>
            <Toolbar className='justify-content-center'>
              <div className='container row align-items-center'>
                <div className={`col-lg-2 col-auto ${classes.brand}`}>
                  <NavLink to='/'>
                    <img
                      alt=''
                      src='img/logo.svg'
                    />
                  </NavLink>
                </div>
                <nav className={`col-auto ml-auto mr-auto ${classes.menu}`}>
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
                  {/* <NavLink
                    activeClassName={classes.activeLink}
                    to='/contact'
                  >
                    Контакты
                  </NavLink> */}
                </nav>
                {isLoggedIn ? (
                  <HeaderProfileCard
                    firstName={firstName}
                    secondName={secondName}
                  />
                ) : (
                  <div className={`col-lg-3 col-auto ${classes.userNav}`}>
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
              </div>
            </Toolbar>
          </div>
        </AppBar>
      ) : (
        <AppBar
          className={classes.appbar}
          position='relative'
        >
          <div className={classes.header}>
            <Toolbar
              className='justify-content-center'
              disableGutters
            >
              <div className="container">
                <div className='row align-items-center justify-content-between'>
                  <div className={`col-auto ${classes.brand}`}>
                    <NavLink to='/'>
                      <img
                        alt=''
                        src='img/logo.svg'
                      />
                    </NavLink>
                  </div>
                  <div className="col-auto">
                    <BurgerMenu />
                  </div>
                </div>
              </div>
            </Toolbar>
          </div>
        </AppBar>
      )}
    </>
  )
}
