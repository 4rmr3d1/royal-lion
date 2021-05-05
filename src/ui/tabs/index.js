import React from 'react'
import cn from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

import classes from './style.module.scss'

const TabsContext = React.createContext({
  onTabChange: () => {},
  activeTab: ''
})

function Provider ({ children, ...providerProps }) {
  return (
    <TabsContext.Provider value={providerProps}>
      {children}
    </TabsContext.Provider>
  )
}

function PaneContainer ({ children }) {
  const { activeTab } = React.useContext(TabsContext)

  return (
    <>
      {React.Children.map(children, element => {
        if (element.key === String(activeTab)) {
          return element
        } else {
          return false
        }
      })}
    </>
  )
}

const Pane = ({ children }) => {
  return (
    <div className={classes.pane}>
      {children}
    </div>
  )
}

function Link ({ children, tabKey, className, to }) {
  const { onTabChange, activeTab } = React.useContext(TabsContext)

  const onLinkClick = React.useCallback((e, key) => {
    onTabChange(key)
  }, [onTabChange])

  return (
    <RouterLink
      className={cn(classes.tabLink, className, { [classes.activeTabLink]: activeTab === tabKey })}
      to={to}
      onClick={e => onLinkClick(e, tabKey)}
    >
      {children}
    </RouterLink>
  )
}

export const Tabs = {
  Provider,
  Pane,
  PaneContainer,
  Link
}
