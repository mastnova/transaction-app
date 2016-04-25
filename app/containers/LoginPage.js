import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import {auth} from '../actions';

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			nameValidation: '',
			password: '',
			passwordValidation: ''
		};
	}

	onClickLogin() {
		if(this.state.name && this.state.password) {
			this.props.dispatch(auth(this.state.name, this.state.password));
		} else {
			if (!this.state.name) {
				this.setState({nameValidation: 'error'});
			}
			if (!this.state.password) {
				this.setState({passwordValidation: 'error'});
			}
		}
	}

	componentWillMount() {
		if(this.props.auth)
			browserHistory.push('/');
	}

	onChangeInput(e) {
		const input = e.target;
		switch (input.name) {
			case 'login':
				this.setState({
					name: input.value,
					nameValidation: input.value ? 'success': ''
				});
				break;
			case 'password':
				this.setState({
					password: input.value,
					passwordValidation: input.value ? 'success' : ''
				});
				break;
		}
	}

	render() {
		return (
			<div className='login-form'>
				<input
					value={this.state.name}
					onChange={this.onChangeInput.bind(this)}
					className={this.state.nameValidation}
					name='login'
					type='text'
					placeholder='Login'/>
				<input
					value={this.state.password}
					onChange={this.onChangeInput.bind(this)}
					className={this.state.passwordValidation}
					name='password'
					type='password'
					placeholder='Password'/>
				<button className='btn-primary' onClick={this.onClickLogin.bind(this)}>Log In</button>
			</div>
		)
	}
}

LoginPage.propTypes = {
	auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
	return {
		auth: state.user.auth
	}
}

export default connect(mapStateToProps)(LoginPage);
