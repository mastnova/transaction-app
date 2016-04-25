import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Transaction from './Transaction';
import {removeTransaction} from '../actions';

class TransactionsList extends Component {

	render() {
		return (
			<ul className='transactions-list'>
				<li className='transactions-header'>
					<span className='id'>id</span>
					<span className='amount'>amount</span>
					<span className='bank'>bank</span>
				</li>
				{this.props.transactions.map((ta) =>
					<Transaction
						key={ta.id}
						id={ta.id}
						amount={ta.amount}
						bank={ta.bankName}
						onClickRemove={() => this.props.onClickRemove(ta.id)} />
				)}
			</ul>
		)
	}
}

TransactionsList.propTypes = {
	transactions: PropTypes.array.isRequired
}

export default TransactionsList;
