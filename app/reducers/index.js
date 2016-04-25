import { combineReducers } from 'redux';
import {
	SET_TRANSACTIONS,
	SET_BANKS,
	REMOVE_TRANSACTION,
	ADD_TRANSACTION,
	AUTHORIZATION
} from '../actions';

function transactions(state = [], action) {
	switch (action.type) {
		case SET_TRANSACTIONS:
			return action.data;
		case REMOVE_TRANSACTION:
			return state.filter(ta => action.id === ta.id ? false : true);
		case ADD_TRANSACTION:
			return state.concat([{
				id: state.length ? state[state.length-1].id + 1 : 1,
				amount: action.amount,
				bankId: action.bankId
			}]);
		default:
			return state;
	}
}

function banks(state = [], action) {
	switch (action.type) {
		case SET_BANKS:
			return action.data;
		default:
			return state;
	}
}

function user(state = {auth: JSON.parse(sessionStorage.auth || false)}, action) {
	switch (action.type) {
		case AUTHORIZATION:
			return Object.assign({}, state, {auth: action.state});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	transactions: transactions,
	banks: banks,
	user: user
});

export default rootReducer;

