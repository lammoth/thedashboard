/**
 * Plugins configuration
 */


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
        pluginName: 'druid',
        pluginTitle: 'ES',
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
        name: 'visualizator',
        active: null,
        config: {
            address: null
        }
    }
];

module.exports = plugins;
