import React from 'react'
import cn from 'classnames'
import { useMediaQuery, Drawer, Toolbar } from '@material-ui/core'
import { useDispatch } from '@app/store'

import classes from './style.module.scss'

const categories = {
  Football: '1',
  Tennis: '2',
  Hockey: '3',
  Basketball: '4',
  Volleyball: '5',
  Baseball: '6',
  PingPong: '7',
  Gandbol: '8',
  AmericanFootball: '9',
  Badminton: '10'
}

export const Sidebar = () => {
  const matches = useMediaQuery('(min-width: 1280px)')
  const [activeCategory, setActveCategory] = React.useState(categories.Football)

  return (
    <>
      {matches ? (
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
        </Drawer>)
        : <aside className={classes.aside}>

          <div className='container'>
            <nav className={classes.categoryRow}>
              <div className='row justify-content-around'>
                <Categories.Provider
                  activeCategory={activeCategory}
                  onCategoryChange={setActveCategory}
                >
                  {Object.entries(categories).map(([key, category], index) => (
                    <div
                      className='col-lg-auto'
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
            </nav>
          </div>
        </aside>
      }
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
