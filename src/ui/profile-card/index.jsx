import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, MenuItem } from '@material-ui/core'
import { useDispatch } from '@app/store'
import { userActions } from '@app/store/actions/userActions'
import { Block } from '../block'

import classes from './style.module.scss'

export const ProfileCard = ({ firstName, lastName, email, balance }) => {
  return (
    <Block>
      <div className={classes.profileCard}>
        <img
          src='img/defaultAvatar.png'
        />
        <h3>
          {firstName} {lastName}
        </h3>
        <h4> {email} </h4>
        <div className={classes.balance}> {balance} </div>
      </div>
    </Block>
  )
}

export const HeaderProfileCard = ({ firstName, lastName, balance }) => {
  const { dispatch } = useDispatch()
  const history = useHistory()

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

  return (
    <div className={classes.headerProfileCard}>
      <img
        alt=""
        src="img/defaultAvatar.png"
      />
      <div>
        <button
          onClick={onMenuOpen}
        >
          {firstName} {lastName}
        </button>
        <div className={classes.balance}>37 829 ₽</div>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchorEl)}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={onMenuClose}
        >
          <MenuItem onClick={() => history.push('/profile')}>
            Профиль
          </MenuItem>

          <MenuItem onClick={() => history.push('/profile/configurations')}>
            Настройки профиля
          </MenuItem>

          <MenuItem onClick={() => history.push('/profile/history')}>
            История ставок
          </MenuItem>

          <MenuItem onClick={() => history.push('/profile/withdraw')}>
            Вывод средств
          </MenuItem>

          <MenuItem onClick={() => history.push('/profile/support')}>
            Поддержка
          </MenuItem>

          <MenuItem onClick={() => history.push('/profile/coupon')}>
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
        <img src="img/defaultAvatar.png'"/>
      </div>

      <div>
        <h4>{firstName} {lastName}</h4>
        <span>{email}</span>
        <h3>37 829 ₽</h3>
      </div>
    </div>
  )
}
