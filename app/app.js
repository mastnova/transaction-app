import "./main.scss";
import 'file?name=[name].[ext]!./index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router';
import {Provider} from 'react-redux';

import AppLayout from './components/AppLayout';
import TransactionsPage from './containers/TransactionsPage';
import LoginPage from './containers/LoginPage';
import AddTransactionPage from './containers/AddTransactionPage';
import configureStore from './configureStore';
import {fetchBanks, fetchTransactions} from './actions';

const store = configureStore();
store.dispatch(fetchBanks());
store.dispatch(fetchTransactions());

ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route component={AppLayout}>
				<Route path='/' component={TransactionsPage} name='home' />
				<Route path='/login' component={LoginPage} />
				<Route path='/add_transaction' component={AddTransactionPage} />
				<Redirect from='*' to='/' />
			</Route>
		</Router>
	</Provider>
), document.getElementById('root'));
