import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {authorization} from '../actions';

class NavBar extends Component {

	onClickLogOut() {
		this.props.dispatch(authorization(false));
		sessionStorage.auth = false;
		browserHistory.push('/login');
	}

	render() {
		return (
			<div className='navbar'>
				<nav>
					<Link to='' activeClassName='active'>Transactions</Link>
					<Link to='/add_transaction' activeClassName='active'>Add Transaction</Link>
				</nav>
				<button onClick={this.onClickLogOut.bind(this)}>Log out</button>
			</div>
		)
	}
}

export default connect()(NavBar);

