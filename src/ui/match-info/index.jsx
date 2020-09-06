import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export const MatchInfo = ({
	date,
	team1,
	team2,
	cf1,
	cf2,
	cf3,
	cf4,
	cf5,
	cf6
}) => {
	return (
		<div className='match row'>
			<div className='col-lg-1'>
				<div className='time'>23:30</div>
				<div className='date'>26 авг</div>
			</div>
			<div className='col-lg-5'>
				<div className='name'>
					<div className='command'>
						<div className='label'>{team1}</div>
						<div className='logo'>
							<img src='img/barselona.png' alt='' />
						</div>
					</div>
					<div className='score'>— : —</div>
					<div className='command'>
						<div className='logo'>
							<img src='img/barselona.png' alt='' />
						</div>
						<div className='label'>{team2}</div>
					</div>
				</div>
			</div>
			<div className='col-lg-6'>
				<div className='coefficient'>
					<Link className='item'>
						1x <span className='number'>{cf1}</span>
					</Link>
					<Link className='item'>
						x <span className='number'>{cf2}</span>
					</Link>
					<Link className='item'>
						2x <span className='number'>{cf3}</span>
					</Link>
					<Link className='item'>
						Б <span className='number'>{cf4}</span>
					</Link>
					<Link className='item'>
						Т <span className='number'>{cf5}</span>
					</Link>
					<Link className='item'>
						М <span className='number'>{cf6}</span>
					</Link>
					<Link className='more'>+16 событий</Link>
				</div>
			</div>
		</div>
	);
};
