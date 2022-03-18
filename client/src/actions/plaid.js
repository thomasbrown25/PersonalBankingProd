import api from '../utils/api';
import { CREATE_LINK_TOKEN, CREATE_LINK_TOKEN_ERROR, USER_LOADED } from "./types";

// actions will go here
export const createLinkToken = () => async (dispatch) => {
	await api.post("/plaid/create_link_token")
		.then((res) => {
			console.table(res.data);

			dispatch({
				type: CREATE_LINK_TOKEN,
				payload: res.data.linkToken,
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: CREATE_LINK_TOKEN_ERROR,
				payload: { msg: err.response.statusText, status: err.response }
			  });
		})
};

export const publicTokenExchange = (publicToken, email) => async (dispatch) => {
	await api.post("/plaid/public_token_exchange", { publicToken, email })
		.then((res) => {
			console.table(res.data);

			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};

//SANDBOX
export const createSandboxToken = () => async (dispatch) => {
	await api.post("/plaid/sandbox/create_public_token")
		.then((res) => {

			dispatch({
				type: CREATE_LINK_TOKEN,
				payload: res.data.publicToken,
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: CREATE_LINK_TOKEN_ERROR,
				payload: { msg: err.response.statusText, status: err.response }
			  });
		})
};