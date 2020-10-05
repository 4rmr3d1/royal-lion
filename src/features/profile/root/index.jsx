import React from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import { ProfileCard, ProfileCardSmall, Tabs } from '@app/ui'
import { useSelector, userActions, useDispatch } from '@app/store'
import { ProfileTab } from '../profile-tab'
import { ConfigurationTab } from '../configuration-tab'
import { BetHistoryTab } from '../bet-history-tab'
import { WithdrawTab } from '../withdraw-tab'
import { SupportTab } from '../support-tab'
import { CouponTab } from '../coupon-tab'

import classes from './style.module.scss'

const tabs = {
  profile: '/profile',
  configurations: '/profile/configurations',
  history: '/profile/history',
  withdraw: '/profile/withdraw',
  support: '/profile/support',
  coupon: '/profile/coupon'
}

export const Profile = () => {
  const { dispatch } = useDispatch()
  const location = useLocation()

  const firstName = useSelector(state => state.authReducer?.user?.data?.first_name)
  const secondName = useSelector(state => state.authReducer?.user?.data?.second_name)
  const email = useSelector(state => state.authReducer.user?.data?.email)

  const breakPoint = useMediaQuery('(max-width: 576px)')

  const [activeTab, setActiveTab] = React.useState(location.pathname)

  React.useEffect(() => {
    setActiveTab(location.pathname)
  }, [location])

  React.useEffect(() => {
    dispatch(userActions.getUser())
  }, [dispatch])

  return (
    <Tabs.Provider
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className={classes.profilePage}>
        {breakPoint && (
          <ProfileCardSmall
            email={email}
            firstName={firstName}
            secondName={secondName}
          />
        )}

        <div className={classes.tabContainer}>
          <div className={classes.tabPanel}>
            <Tabs.Link
              tabKey={tabs.profile}
              to={'/profile'}
            >
                Профиль
            </Tabs.Link>

            <Tabs.Link
              tabKey={tabs.configurations}
              to={'/profile/configurations'}
            >
                Настройки профиля
            </Tabs.Link>

            <Tabs.Link
              tabKey={tabs.history}
              to={'/profile/history'}
            >
                История ставок
            </Tabs.Link>

            <Tabs.Link
              tabKey={tabs.withdraw}
              to={'/profile/withdraw'}
            >
                Вывод средств
            </Tabs.Link>

            <Tabs.Link
              tabKey={tabs.support}
              to={'/profile/support'}
            >
                Поддержка
            </Tabs.Link>

            <Tabs.Link
              tabKey={tabs.coupon}
              to={'/profile/coupon'}
            >
                Купон
            </Tabs.Link>
          </div>
        </div>

        <div className={classes.profileContent}>
          <section className={classes.profile}>
            <div className='row'>
              {!breakPoint && (
                <div className='col-lg-3'>
                  <ProfileCard
                    email={email}
                    firstName={firstName}
                    secondName={secondName}
                  />
                </div>
              )}

              <div className='col-lg-9'>
                <Tabs.PaneContainer>
                  <Tabs.Pane key={tabs.profile}>
                    <ProfileTab />
                  </Tabs.Pane>

                  <Tabs.Pane key={tabs.configurations}>
                    <ConfigurationTab />
                  </Tabs.Pane>

                  <Tabs.Pane key={tabs.history}>
                    <BetHistoryTab />
                  </Tabs.Pane>

                  <Tabs.Pane key={tabs.withdraw}>
                    <WithdrawTab/>
                  </Tabs.Pane>

                  <Tabs.Pane key={tabs.support}>
                    <SupportTab/>
                  </Tabs.Pane>

                  <Tabs.Pane key={tabs.coupon}>
                    <CouponTab/>
                  </Tabs.Pane>

                </Tabs.PaneContainer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Tabs.Provider>
  )
}
