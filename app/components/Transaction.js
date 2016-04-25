import React, {Component, PropTypes} from 'react';

class Transaction extends Component {

	render() {
		return (
			<li className='transaction'>
				<span className='id'>{this.props.id}</span>
				<span className='amount'>{this.props.amount}</span>
				<span className='bank'>{this.props.bank}</span>
				<button onClick={this.props.onClickRemove}>remove</button>
			</li>
		)
	}
}

Transaction.propTypes = {
	id: PropTypes.number.isRequired,
	amount: PropTypes.number.isRequired,
	bank: PropTypes.string.isRequired,
	onClickRemove: PropTypes.func.isRequired
}

export default Transaction;
