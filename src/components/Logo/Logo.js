import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
// webpackがimageをコピーしたファイルへのパスが入っている
import classes from './Logo.css';

const logo = (props) => (
	<div className={classes.Logo}>
		<img src={burgerLogo} alt="MyBurger" />
	</div>
);

export default logo;
