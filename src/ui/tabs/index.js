import React from 'react'
import cn from 'classnames'

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

function Link ({ children, tabKey, className }) {
  const { onTabChange, activeTab } = React.useContext(TabsContext)

  const onLinkClick = React.useCallback((e, key) => {
    e.preventDefault()

    onTabChange(key)
  }, [onTabChange])

  return (
    <a
      className={cn(classes.tabLink, className, { [classes.activeTabLink]: activeTab === tabKey })}
      href={String(tabKey)}
      onClick={e => onLinkClick(e, tabKey)}
    >
      {children}
    </a>
  )
}

export const Tabs = {
  Provider,
  Pane,
  PaneContainer,
  Link
}
