'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL_EXT: '"https://{host}:{port}"',
    BASE_URL_INT: '"https://es2-rec1.cofely.com"',
    OKTA_ISSUER: '"https://engie.okta-emea.com"',
    OKTA_CLIENT_ID: '"0oa293yt6dkwcA1Rj0i7"',
    OKTA_REDIRECT_URL: '"http://localhost:8080/implicit/callback"',
});
