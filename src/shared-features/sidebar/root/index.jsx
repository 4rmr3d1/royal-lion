import React from 'react'
import cn from 'classnames'
import { useDispatch } from '@app/store'
import classes from './style.module.scss'

const categories = {
  football: 'Football',
  tennis: 'Tennis',
  hockey: 'Hockey',
  basketball: 'Basketball',
  volleyball: 'Volleyball',
  baseball: 'Baseball',
  pingPong: 'PingPong',
  gandbol: 'Gandbol',
  americanFootball: 'AmericanFootball',
  badminton: 'Badminton'
}

export const Sidebar = () => {
  const [activeCategory, setActveCategory] = React.useState(categories.football)

  return (
    <aside className={classes.aside}>
      <div className='container'>
        <nav className={classes.category}>
          <div className='row justify-content-around'>
            <Categories.Provider
              activeCategory={activeCategory}
              onCategoryChange={setActveCategory}
            >
              {Object.values(categories).map((category, index) => (
                <div
                  className='col-lg-auto'
                  key={category.id | index}
                >
                  <Categories.Link
                    categoryKey={category}
                    key={index}
                  >
                    <i className={`icon${category}`}></i>
                  </Categories.Link>
                </div>
              ))}
            </Categories.Provider>
          </div>
        </nav>
      </div>
    </aside>
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
