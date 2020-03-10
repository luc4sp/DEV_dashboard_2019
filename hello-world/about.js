const about = {
    client: {
        host: null
    },
    server: {
        current_time: null,
        services: [{
            name: 'CryptoExchanger',
            widgets: [{
                name: 'CryptoExchanger',
                description: 'Give the price in ISD of cryptocurrency',
                params: [{
                    name: 'currency',
                    type: 'string'
                }]
            }]
        }, {
            name: 'Exchanger',
            widgets: [{
                name: 'Exchanger',
                description: 'Know the rate of different currency',
                params: [{
                    name: 'fromCurrency',
                    type: 'string'
                }, {
                    name: 'toCurrency',
                    type: 'string'
                }]
            }]
        }, {
            name: 'Joker',
            widgets: [{
                name: 'Joker',
                description: 'Print a joke',
                params: [{
                    name: 'category',
                    type: 'string'
                }]
            }]
        }, {
            name: 'PasswordGenerator',
            widgets: [{
                name: 'PasswordGenerator',
                description: 'Give a password',
                params: [{
                    name: 'length',
                    type: 'integer'
                }, {
                    name: 'type',
                    type: 'string'
                }]
            }]
        }, {
            name: 'RandomThing',
            widgets: [{
                name: 'RandomThing',
                description: 'Give a random fact about a theme',
                params: [{
                    name: 'theme',
                    type: 'string'
                }]
            }]
        }, {
            name: 'Weather',
            widgets: [{
                name: 'Weather',
                description: 'Give a temperature and description of weather',
                params: [{
                    name: 'city',
                    type: 'string'
                }]
            }]
        }]
    }
};

export default about;