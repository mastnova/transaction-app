import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import NavBar from './NavBar';
import {pushTransaction} from '../actions';

class AddTransactionPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			amount: '',
			inputValidation: '',
			bankId: 0,
			selectValidation: ''
		}
	}

	componentWillMount() {
		if(!this.props.auth) {
			browserHistory.push('/login');
		}
	}

	onChangeInput(e) {
		const value = e.target.value;
		const intValue = parseInt(value);
		if ( Number.isInteger(intValue) ) {
			this.setState({
				amount: intValue,
				inputValidation: 'success'
			});
		} else if (value === '' || value === '-' || intValue === 0) {
			this.setState({
				amount: value,
				inputValidation: ''
			});
		}
	}

	onChangeSelect(e) {
		const value = parseInt(e.target.value);
		this.setState({
			bankId: value,
			selectValidation: 'success'
		})
	}

	onClickAdd() {
		if (this.state.amount && this.state.amount !== '-'  && this.state.bankId) {
			this.setState({
				amount: '',
				inputValidation: ''
			});
			this.props.dispatch(pushTransaction(this.state.amount, this.state.bankId));
		} else {
			if (!this.state.amount || this.state.amount === '-') {
				this.setState({inputValidation: 'error'});
			}
			if (!this.state.bankId) {
				this.setState({selectValidation: 'error'});
			}
		}
	}

	render() {
		return (
			<div className="page">
				<NavBar />
				<div className='add-form'>
					<input
						value={this.state.amount}
						onChange={this.onChangeInput.bind(this)}
						className={this.state.inputValidation}
						type='text'
						placeholder='amount'/>
					<select
						onChange={this.onChangeSelect.bind(this)}
						value={this.state.bankId}
						className={this.state.selectValidation} >
						<option disabled value={0}>Select bank</option>
						{this.props.banks.map(bank => {
							return <option key={bank.id} value={bank.id}>{bank.name}</option>
						})}
					</select>
					<button className='btn-primary' onClick={this.onClickAdd.bind(this)}>Add</button>
				</div>
		</div>
		)
	}
}

AddTransactionPage.propTypes = {
	banks: PropTypes.array.isRequired,
	auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
	return {
		banks: state.banks,
		auth: state.user.auth
	}
}

export default connect(mapStateToProps)(AddTransactionPage);
