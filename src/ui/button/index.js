import React from 'react'
import cn from 'classnames'
import classes from './style.module.scss'

export const Button = ({ onClick, type, children }) => {
	return (
		<>
			<button
				className={cn(
					classes.btn,
					{ [classes.btnBig]: type === 'big' },
					{ [classes.btnSmall]: type === 'small' }
				)}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	)
}
