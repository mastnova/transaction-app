import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {removeTransaction} from '../actions';
import {connect} from 'react-redux';
import NavBar from './NavBar';
import TransactionsList from '../components/TransactionsList';

class TransactionsPage extends Component {

	onClickRemove(id) {
		this.props.dispatch(removeTransaction(id));
	}

	componentWillMount() {
		if(!this.props.auth) {
			browserHistory.push('/login');
		}
	}

	render() {
		return (
			<div className="page">
			<NavBar />
			<TransactionsList
				transactions={this.props.transactions}
				onClickRemove={this.onClickRemove.bind(this)} />
		</div>
		)
	}
}

TransactionsPage.propTypes = {
	transactions: PropTypes.array.isRequired,
	auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
	const banks = state.banks
	const transactions = state.transactions.map( ta => {
		for (let i = 0; i < banks.length; i++) {
			if (ta.bankId === banks[i].id) {
				ta.bankName = banks[i].name;
				break;
			}
		}
		return ta;
	});
	return {
		transactions: transactions,
		auth: state.user.auth
	}
}

export default connect(mapStateToProps)(TransactionsPage);
