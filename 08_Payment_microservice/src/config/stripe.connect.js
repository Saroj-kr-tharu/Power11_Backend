const {STRIPE_SECRET_KEY} = require('./stripe.config');

const stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = stripe;