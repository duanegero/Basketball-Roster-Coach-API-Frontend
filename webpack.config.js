const path = require('path');

module.exports = {
    entry: {
        app: './js/app.js',      // Entry point for app.js
        login: './js/login.js',  // Entry point for login.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js', // [name] will use the key from the entry object
    },
    mode: 'production',
};
