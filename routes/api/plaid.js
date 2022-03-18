const express = require("express");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require('../../middleware/auth');


//Models
const User = require("../../models/User");


const configuration = new Configuration({
	basePath: PlaidEnvironments[process.env.PLAID_ENV],
	baseOptions: {
	  headers: {
		'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
		'PLAID-SECRET': process.env.PLAID_SECRET,
		'Plaid-Version': '2020-09-14',
	  },
	},
  });
  
const client = new PlaidApi(configuration);



// @route POST api/plaid/create_link_token
// @desc Creates a Link token
// @access Private
router.post("/create_link_token", auth, async (req, res) => {

	// Create the public_token with all of your configurations
	const response = await client.linkTokenCreate({
		user: {
			client_user_id: req.user.id
		},
		client_name: "Finance Your Money",
		products: process.env.PLAID_PRODUCTS.split(' '),
		country_codes: ["US"],
		language: "en"
	})
	.catch((e) => {
		// Get error status code and error message from Plaid server
		// Display error on client
		console.log(e.response.config.data)
		return res.status(e.response.status).send({ error: e.response.data.error_message });
	})

	console.log(`link token: ${response.data.link_token}`)
	return res.status(200).send({ linkToken: response.data.link_token });
});


// @route POST api/token/public_token_exchange
// @desc Gets and exchange public token
// @access Private
router.post("/public_token_exchange", auth, async (req, res) => {
	//destructure publicToken in response data
	const { publicToken, email } = req.body;
	console.log('sending request to exchange public token, email: ' + email)
	
	const response = await client
		.itemPublicTokenExchange({
			public_token: publicToken,
		  })
		.catch((e) => {
			// Display error on client
			console.log(e.response.config.data)
			return res.status(e.response.status).send({ error: e.response.data.error_message });
		});
	
	// const accessToken = response.data.access_token;
    // const itemID = response.data.item_id;

	console.log(`finding user with email: ${email}`)
	//save access token to user
	try {

		const user = await User.findOne({ _id: req.user.id })

		if (!user) {
			return res.status(404).send({ error: `no user found by email: ${email}` });
		}

		user.accessToken = response.data.access_token;
		user
			.save()
			.then((user) => {
				console.log("saved access token to user")
				return res.status(200).send(user);
			})
			.catch((e) => {
			// Get error status code and error message from Plaid server
			// Display error on client
			console.log(e)
			return res.status(500).send({ error: e.message });
		})

	} catch (e) {
		console.log(e)
		return res.status(500).send({ error: e.message });
	}
	

	//return res.status(404).send("no user find by email");
});


// @route POST api/plaid/create_public_token
// @desc Creates a Link token
// @access Private
router.post("/sandbox/create_public_token", auth, async (req, res) => {  

	// Create the public_token with all of your configurations
	const response = await client.sandboxPublicTokenCreate({
		institution_id: "ins_4",
		initial_products: process.env.PLAID_PRODUCTS.split(' '),
	})
	.catch((e) => {
		// Get error status code and error message from Plaid server
		// Display error on client
		console.log(e.response.config.data)
		return res.status(e.response.status).send({ error: e.response.data.error_message });
	})

	console.log(`public token: ${response.data.link_token}`)
	//plaid name for public token is also link token
	return res.status(200).send({ publicToken: response.data.public_token });
});

// @route POST api/plaid/institutions/get
// @desc Creates a Link token
// @access Private
router.post("/institutions/get",  async (req, res) => {

	// Pull institutions
	const institutionsGetRequest = {
		count: 500,
		offset: 0,
		country_codes: ['US'],
  	};


	try {
		const institutionResponse = await client.institutionsGet(institutionsGetRequest);
		const institutions = institutionResponse.data.institutions;
	
		return res.status(200).send( institutions );
	  } catch (e) {
		// Handle error
		return res.status(500).send({ error: e.message });
	  }
});



module.exports = router;