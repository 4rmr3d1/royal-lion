import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { ArrowDropDown } from '@material-ui/icons'
import { useDispatch, useSelector } from '@app/store'
import { userActions } from '@app/store/actions/userActions'
import { Block } from '../block'

import classes from './style.module.scss'

export const ProfileCard = ({ firstName, lastName, email, balance }) => {
  const logining = useSelector(state => state.authReducer.login.logining)

  return (
    <Block>
      <div className={classes.profileCard}>
        <img
          src='https://king-kong.bet/img/defaultAvatar.png'
        />

        <h3>
          {logining ? (
            <Skeleton
              heigth={40}
              width={170}
            />
          ) : (
            <>{firstName} {lastName}</>
          )}
        </h3>

        <h4>
          {logining ? (
            <Skeleton
              heigth={20}
              width={170}
            />
          ) : (
            <>{ email }</>
          )}
        </h4>

        <div className={classes.balance}>
          {logining ? (
            <Skeleton
              heigth={50}
              width={170}
            />
          ) : (
            <>{ balance }</>
          )}
        </div>
      </div>
    </Block>
  )
}

export const HeaderProfileCard = ({ firstName, lastName, balance }) => {
  const { dispatch } = useDispatch()
  const history = useHistory()

  const logining = useSelector(state => state.authReducer.login.logining)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const onMenuOpen = React.useCallback(e => {
    setAnchorEl(e.currentTarget)
  })

  const onMenuClose = React.useCallback(e => {
    setAnchorEl(null)
  })

  const onLogout = React.useCallback(() => {
    dispatch(userActions.logout())
  })

  const handleBurger = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: { burgerVisible: false }
    })
  }, [dispatch])

  return (
    <div className={classes.headerProfileCard}>
      <img
        alt=""
        src="https://king-kong.bet/img/defaultAvatar.png"
      />

      <div>
        <span>
          {logining ? (
            <Skeleton
              heigth={30}
              width={110}
            />
          ) : (
            <>
              {firstName} {lastName}
              <IconButton
                size='small'
                onClick={onMenuOpen}
              >
                <ArrowDropDown/>
              </IconButton>
            </>
          )}
        </span>

        <div className={classes.balance}>
          {logining ? (
            <Skeleton
              heigth={22}
              width={110}
            />
          ) : (
            <>
              {balance}
            </>
          )}
        </div>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          className={classes.menu}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchorEl)}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={onMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleBurger()
              history.push('/profile')
            }}
            style={{color: 'black'}}
          >
            <b>Пополнить счёт</b>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleBurger()
              history.push('/profile/configurations')
            }}
          >
            Настройки профиля
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleBurger()
              history.push('/profile/history')
            }}
          >
            История ставок
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleBurger()
              history.push('/profile/withdraw')
            }}
          >
            Вывод средств
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleBurger()
              history.push('/profile/support')
            }}
          >
            Поддержка
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleBurger()
              history.push('/profile/coupon')
            }}
          >
            Купон
          </MenuItem>

          <MenuItem
            onClick={onLogout}
          >
            Выход
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export const ProfileCardSmall = ({ firstName, lastName, email, balance }) => {
  return (
    <div className={classes.profileCardSmall}>
      <div>
        <img src='https://king-kong.bet/img/defaultAvatar.png'/>
      </div>

      <div>
        <h4>{firstName} {lastName}</h4>
        <span>{email}</span>
        <h3>{balance}</h3>
      </div>
    </div>
  )
}
