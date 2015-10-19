/**
 * Plugins configuration
 */

var config = require('./environment'),
    path = require('path');


var plugins = [
  {
    name: 'acquisitor',
    pluginName: 'phoenix',
    pluginTitle: 'Phoenix',
    active: true, 
    config: {
      jdbc: {
        url: 'jdbc:phoenix:10.128.19.60',
        minpoolsize: 10,
        maxpoolsize: 100,
        user: '',
        password: ''
      },
      java: {
        libPath: path.join(config.root, 'server', 'plugins', 'acquisitor', 'phoenix', 'jar', 'phoenix-4.5.0-HBase-1.0-client.jar'),
        driverName: 'org.apache.phoenix.jdbc.PhoenixDriver',
      },
      // Waiting seconds to listen new events
      realtime_delay: { "10": 10, "20": 20, "30": 30, "60": 60},
      listen_ratio: {"1":1,"2":2,"3":3,"4":4,"5":5},

      // Error margin to use data saved in the persistor (in hours)
      data_delay: {
        from: {"1":1, "2":2, "3":3, "5":5, "10":10, "24":24},
        to: {"1":1, "2":2, "3":3, "5":5, "10":10, "24":24}
      }
    }
  },
  {
    name: 'acquisitor',
    pluginName: 'spark',
    pluginTitle: 'Spark',
    active: true,
    config: {
      url: 'jdbc:hive2://10.128.19.61:10000/default',
      user: '',
      password: '',
      libpath: path.join(config.root, 'server', 'plugins', 'acquisitor', 'spark', 'jar', 'custom-jdbc-hive-0.0.1.jar'),
      libs: [],
      drivername: 'org.apache.hive.jdbc.HiveDriver'
    }
  },
  {
    name: 'acquisitor',
    pluginName: 'mysql',
    pluginTitle: 'MySQL',
    active: true,
    config: {
      address: 'localhost',
      database: 'thedashboard',
      user: 'root',
      password: '',
      // Waiting seconds to listen new events
      realtime_delay: { "11": 11, "22": 22, "33": 33, "66": 66},
      listen_ratio: {"1":1,"2":2,"3":3,"4":4,"5":5},

      // Error margin to use data saved in the persistor (in hours)
      data_delay: {
        from: {"1":1, "2":2, "3":3, "5":5, "10":10, "24":24},
        to: {"1":1, "2":2, "3":3, "5":5, "10":10, "24":24}
      }
    }
  },
  {
    name: 'eventor',
    pluginName: 'kafka',
    pluginTitle: 'Kafka',
    active: true,
    config: {
      address: '10.128.19.58:2181,10.128.19.59:2181,10.128.19.60:2181/kafka',
      // TODO: Partition number could be required in a near future
      topics: [
        {topic: 'logstash.collectd'},
        {topic: 'logstash.netflow'}
      ],
      options: { groupId: 'spark', autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024*1024 }
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
