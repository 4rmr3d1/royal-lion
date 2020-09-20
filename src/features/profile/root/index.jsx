import React from 'react'
import { Redirect } from 'react-router-dom'
import { ProfileCard, Tabs } from '@app/ui'
import { useDispatch, useSelector } from '@app/store'
import { userActions } from '@app/store/actions/userActions'
import { ProfileTab } from './profile-tab'

import classes from './style.module.scss'

const tabs = {
  profile: 'profile',
  configurations: 'configurations',
  history: 'history',
  withdraw: 'withdraw',
  support: 'support',
  coupon: 'coupon'
}

export const Profile = () => {
  const { dispatch } = useDispatch()

  const isLoggedIn = useSelector(state => state.authReducer?.isLoggedIn)
  const firstName = useSelector((state) => state.authReducer?.user?.data?.first_name)
  const secondName = useSelector((state) => state.authReducer?.user?.data?.second_name)
  const email = useSelector((state) => state.authReducer.user?.data?.email)

  const [activeTab, setActiveTab] = React.useState(tabs.profile)

  React.useEffect(() => {
    dispatch(userActions.getUser())
  }, [dispatch])

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
                <Tabs.Link tabKey={tabs.profile}>
                  Профиль
                </Tabs.Link>

                <Tabs.Link tabKey={tabs.configurations}>
                  Настройки профиля
                </Tabs.Link>

                <Tabs.Link tabKey={tabs.history}>
                  История ставок
                </Tabs.Link>

                <Tabs.Link tabKey={tabs.withdraw}>
                  Вывод средств
                </Tabs.Link>

                <Tabs.Link tabKey={tabs.support}>
                  Поддержка
                </Tabs.Link>

                <Tabs.Link tabKey={tabs.coupon}>
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

            <div className='col-lg-8'>
              <Tabs.PaneContainer>
                <Tabs.Pane key={tabs.profile}>
                  <ProfileTab />
                </Tabs.Pane>

                <Tabs.Pane key={tabs.configurations}>
                  <div>настройки </div>
                </Tabs.Pane>

                <Tabs.Pane key={tabs.history}>
                  <div>history</div>
                </Tabs.Pane>

                <Tabs.Pane key={tabs.withdraw}></Tabs.Pane>

                <Tabs.Pane key={tabs.support}></Tabs.Pane>

                <Tabs.Pane key={tabs.coupon}></Tabs.Pane>

              </Tabs.PaneContainer>
            </div>
          </Tabs.Provider>
        </div>
      </div>
    </section>
  )
}
