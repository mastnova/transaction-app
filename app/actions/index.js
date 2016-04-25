import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router'
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const SET_BANKS = 'SET_BANKS';
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const AUTHORIZATION = 'AUTHORIZATION';

export function fetchTransactions() {
	return dispatch => {
		fetch('/api/transactions').then(response => {
			if(response.ok) {
			response.json().then( data => {
				dispatch( setTransactions(data) );
				});
			}
		});
	}
}

function setTransactions(data) {
 return { type: SET_TRANSACTIONS, data: data };
}

export function fetchBanks() {
	return dispatch => {
		fetch('/api/banks').then( response => {
			if (response.ok) {
				response.json().then( data => {
					dispatch( setBanks(data) );
				});
			}
		});
	}
}

function setBanks(data) {
	return {type: SET_BANKS, data: data}
}

export function removeTransaction(id) {
	return {type: REMOVE_TRANSACTION, id: id}
}

export function pushTransaction(amount, bankId) {
	return dispatch => {
		fetch('/api/add_transaction', {
			method: 'POST',
			headers: new Headers({
			'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				amount: amount,
				bankId: bankId
			})
		}).then( response => {
			if (response.ok) {
				dispatch( addTransaction(amount, bankId) );
			}
		})
	}
}

function addTransaction(amount, bankId) {
	return {
		type: ADD_TRANSACTION,
		amount: amount,
		bankId: bankId
	}
}

export function auth(login, password){
	return dispatch => {
		fetch('/api/auth', {
			method: 'POST',
			headers: new Headers({
			'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				login: login,
				password: password
			})
		}).then( response => {
			if (response.ok) {
				sessionStorage.auth = true;
				dispatch( authorization(true) );
				browserHistory.push('/');
			}
		});
	}
}

export function authorization(state) {
	return {type: AUTHORIZATION, state: state}
}
