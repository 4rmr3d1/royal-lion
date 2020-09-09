import React from 'react';
import { Link } from 'react-router-dom';

import classes from './style.module.scss'

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
		<div className={`row ${classes.match}`}>
			<div className='col-lg-1'>
				<div className={classes.time}>23:30</div>
				<div className={classes.date}>26 авг</div>
			</div>
			<div className='col-lg-5'>
				<div className={classes.name}>
					<div className={classes.command}>
						<div className={classes.label}>{team1}</div>
						<div className={classes.logo}>
							<img src='img/barselona.png' alt='' />
						</div>
					</div>
					<div className={classes.score}>— : —</div>
					<div className={classes.command}>
						<div className={classes.logo}>
							<img src='img/barselona.png' alt='' />
						</div>
						<div className={classes.label}>{team2}</div>
					</div>
				</div>
			</div>
			<div className='col-lg-6'>
				<div className={classes.coefficient}>
					<Link className={classes.item}>
						1x <span className={classes.number}>{cf1}</span>
					</Link>
					<Link className={classes.item}>
						x <span className={classes.number}>{cf2}</span>
					</Link>
					<Link className={classes.item}>
						2x <span className={classes.number}>{cf3}</span>
					</Link>
					<Link className={classes.item}>
						Б <span className={classes.number}>{cf4}</span>
					</Link>
					<Link className={classes.item}>
						Т <span className={classes.number}>{cf5}</span>
					</Link>
					<Link className={classes.item}>
						М <span className={classes.number}>{cf6}</span>
					</Link>
					<Link className={classes.more}>+16 событий</Link>
				</div>
			</div>
		</div>
	);
};
