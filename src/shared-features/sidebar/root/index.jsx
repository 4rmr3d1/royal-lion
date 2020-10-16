import React from 'react'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import { useMediaQuery, Drawer, Toolbar } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { useDispatch } from '@app/store'

import classes from './style.module.scss'

const categories = {
  Football: '1',
  Hockey: '2',
  Basketball: '3',
  Tennis: '4',
  Baseball: '5',
  Volleyball: '6',
  PingPong: '10',
  Gandbol: '8',
  AmericanFootball: '7',
  Badminton: '16'
}

export const Sidebar = () => {
  const location = useLocation()
  const xlBreakPoint = useMediaQuery('(min-width: 1280px)')
  const lgBreakPoint = useMediaQuery('(max-width: 1279px)')
  const smBreakPoint = useMediaQuery('(max-width: 599px)')

  const [activeCategory, setActveCategory] = React.useState(categories.Football)
  const container = React.useRef()

  const onArrowClick = React.useCallback((scrollOffset) => {
    container.current.scrollLeft += scrollOffset
  }, [container])

  const currentTitle = React.useMemo(() => {
    switch (location.pathname) {
    case '/': return 'Линия'
    case '/live': return 'Лайв'
    case '/result': return 'Результаты'

    default: return null
    }
  }, [location])

  return (
    <>
      {xlBreakPoint && (
        <Drawer
          style={{ flexShrink: 0 }}
          variant='permanent'
        >
          <Toolbar/>
          <div className={classes.categoryColumn}>
            <Categories.Provider
              activeCategory={activeCategory}
              onCategoryChange={setActveCategory}
            >
              {Object.entries(categories).map(([key, category], index) => (
                <div
                  key={category.id | index}
                >
                  <Categories.Link
                    categoryKey={category}
                    key={index}
                  >
                    <i className={`icon${key}`}></i>
                  </Categories.Link>
                </div>
              ))}
            </Categories.Provider>
          </div>
        </Drawer>
      )}

      {lgBreakPoint && (
        <aside className={classes.aside}>
          <div
            className={classes.categories}
          >
            {smBreakPoint && (
              <>
                <div className={classes.title}>
                  {currentTitle}
                </div>
                <div className={classes.arrows}>
                  <button onClick={() => onArrowClick(-69)}>
                    <ArrowBack/>
                  </button>
                  <button onClick={() => onArrowClick(69)}>
                    <ArrowForward/>
                  </button>
                </div>
              </>
            )}
            <nav ref={container}>
              <Categories.Provider
                activeCategory={activeCategory}
                onCategoryChange={setActveCategory}
              >
                {Object.entries(categories).map(([key, category], index) => (
                  <div
                    key={category.id | index}
                  >
                    <Categories.Link
                      categoryKey={category}
                      key={index}
                    >
                      <i className={`icon${key}`}></i>
                    </Categories.Link>
                  </div>
                ))}
              </Categories.Provider>
            </nav>
          </div>
        </aside>
      )}

    </>

  )
}

const CategoryContext = React.createContext({
  onCategoryChange: () => {},
  activeCategory: ''
})

function Provider ({ children, ...providerProps }) {
  return (
    <CategoryContext.Provider value={providerProps}>
      {children}
    </CategoryContext.Provider>
  )
}

function Link ({ children, categoryKey }) {
  const { dispatch } = useDispatch()

  const { onCategoryChange, activeCategory } = React.useContext(CategoryContext)

  const onLinkClick = React.useCallback(
    (e, key) => {
      e.preventDefault()

      dispatch({
        type: 'change-category',
        category: categoryKey
      })

      onCategoryChange(key)
    },
    [onCategoryChange, dispatch, categoryKey]
  )

  return (
    <a
      className={cn(classes.btnSort, {
        [classes.select]: activeCategory === categoryKey
      })}
      href={String(categoryKey)}
      onClick={(e) => onLinkClick(e, categoryKey)}
    >
      {children}
    </a>
  )
}

export const Categories = {
  Provider,
  Link
}
