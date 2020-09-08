import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export const Avatar = () => {
	return (
		<div className="avatar">
			<img src="img/avatar.png" alt=""/>
			<h3>Иван Иванов</h3>
			<Link >mailforexpample@mail.ru</Link>
			<div className="ballance">37 829 ₽</div>
		</div>
	);
};
