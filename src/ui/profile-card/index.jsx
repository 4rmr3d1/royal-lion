import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, MenuItem, IconButton, makeStyles } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
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
        <h4>
          {email}
        </h4>
        <div className={classes.balance}>
          {balance}
        </div>
      </div>
    </Block>
  )
}

const useStyles = makeStyles({
  MuiList: {
    root: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid #EDEFF5',
      borderRadius: 5
    },
    padding: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 15,
      paddingLeft: 15
    }
  },
  MuiListItem: {
    root: {
      paddingTop: 0,
      '&:not(:last-child)': {
        borderBottom: '1px solid #EDEFF5',
        paddingBottom: 10
      },
      '&:not(:first-child)': {
        paddingTop: 10
      }
    },
    gutters: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  MuiMenuItem: {
    root: {
      color: '#939A9E',
      lineHeight: '14px',
      fontSize: 12
    }
  }
})

export const HeaderProfileCard = ({ firstName, lastName, balance }) => {
  const { dispatch } = useDispatch()
  const history = useHistory()
  const styles = useStyles()
  console.log(styles)

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
        src="img/defaultAvatar.png"
      />

      <div>
        <span>
          {firstName} {lastName}
          <IconButton
            size='small'
            onClick={onMenuOpen}
          >
            <ArrowDropDown/>
          </IconButton>
        </span>

        <div className={classes.balance}>
          {balance}
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
          >
              Профиль
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
        <img src="img/defaultAvatar.png'"/>
      </div>

      <div>
        <h4>{firstName} {lastName}</h4>
        <span>{email}</span>
        <h3>{balance}</h3>
      </div>
    </div>
  )
}
