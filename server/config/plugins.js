/**
 * Plugins configuration
 */

var config = require('./environment'),
    path = require('path');


var plugins = [
    {
        name: 'acquisitor',
        pluginName: 'druid',
        pluginTitle: 'Druid',
        active: true,
        config: {
            address: '10.128.19.58:2181,10.128.19.60:2181,10.128.19.65:2181/druid',
            parameters: '/discovery/broker',
            extra: {
              zookeeper: {
                sessionTimeout: 30000,
                spinDelay : 1000,
                retries : 10
              }
            }
        }
    },
    {
        name: 'acquisitor',
        pluginName: 'spark',
        pluginTitle: 'Spark',
        active: true,
        config: {
            url: 'jdbc:hive2://10.128.19.61:10000',
            user: '',
            password: '',
            libpath: path.join(config.root, 'server', 'plugins', 'acquisitor', 'spark', 'jar', 'hive-jdbc-0.10.0.jar'),
            libs: [],
            drivername: 'org.apache.hadoop.hive.jdbc.HiveDriver',
        }
    },
    {
        name: 'visualizator',
        pluginName: 'c3',
        pluginTitle: 'C3',
        active: true,
        config: {}
    }
];

module.exports = plugins;
