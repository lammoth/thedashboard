'use strict';


function BrokerService() {
    this.emit = function(cb, data) {
        cb(data);
    };
}

module.exports = BrokerService;