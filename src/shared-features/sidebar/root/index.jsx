import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from '@app/store'
import './index.scss'

export const Sidebar = () => {
	const { dispatch } = useDispatch()

	const onClick = React.useCallback(() => {
		dispatch({
			type: 'change-category',
			category: 'pohui'
		})
	}, [dispatch])

	return (
		<aside>
			<div className='container'>
				<nav className='category'>
					<div className='row justify-content-around'>
						<div className='col-lg-auto'>
							<Link className='btn-sort select' onClick={onClick}>
								<i className='icon-football'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-tennis'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-hockey'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-basketball'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-volleyball'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-baseball'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-ping-pong'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-gandbol'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-american-football'></i>
							</Link>
						</div>
						<div className='col-lg-auto'>
							<Link className='btn-sort'>
								<i className='icon-badminton'></i>
							</Link>
						</div>
					</div>
				</nav>
			</div>
		</aside>
	)
}
