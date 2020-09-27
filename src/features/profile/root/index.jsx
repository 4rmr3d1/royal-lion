import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { ProfileCard, Tabs } from '@app/ui'
import { useDispatch, useSelector } from '@app/store'
import { userActions } from '@app/store/actions/userActions'
import { ProfileTab } from '../profile-tab'
import { ConfigurationTab } from '../configuration-tab'
import { BetHistoryTab } from '../bet-history-tab'
import { WithdrawTab } from '../withdraw-tab'
import { SupportTab } from '../support-tab'

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

  const isLoggedIn = useSelector(state => state.authReducer?.isLoggedIn)
  const firstName = useSelector(state => state.authReducer?.user?.data?.first_name)
  const secondName = useSelector(state => state.authReducer?.user?.data?.second_name)
  const email = useSelector(state => state.authReducer.user?.data?.email)

  const [activeTab, setActiveTab] = React.useState(location.pathname)

  React.useEffect(() => {
    setActiveTab(location.pathname)
    dispatch(userActions.getUser())
  }, [])

  if (!isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <section className={classes.profile}>
      <div className='container'>
        <div className='row'>
          <Tabs.Provider
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            <div className="col-lg-12">
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

            <div className='col-lg-3'>
              <ProfileCard
                email={email}
                firstName={firstName}
                secondName={secondName}
              />
            </div>

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

                <Tabs.Pane key={tabs.coupon}></Tabs.Pane>

              </Tabs.PaneContainer>
            </div>
          </Tabs.Provider>
        </div>
      </div>
    </section>
  )
}
