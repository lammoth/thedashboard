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
        url: 'jdbc:phoenix:10.128.19.62',
        minpoolsize: 10,
        maxpoolsize: 100,
        user: '',
        password: ''
      },
      java: {
        libPath: [
          path.join(config.root, 'server', 'plugins', 'acquisitor', 'phoenix', 'jar', 'phoenix-4.5.0-HBase-1.0-client.jar'),
          path.join(config.root, 'server', 'plugins', 'acquisitor', 'phoenix', 'jar', 'hadoop-common-2.6.0.jar'),
          path.join(config.root, 'server', 'plugins', 'acquisitor', 'phoenix', 'jar', 'hadoop-hdfs-2.6.0.jar'),
          path.join(config.root, 'server', 'plugins', 'acquisitor', 'phoenix', 'jar', 'hbase-site.xml')
        ],
        driverName: 'org.apache.phoenix.jdbc.PhoenixDriver',
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
      realtime_delay: [10, 20, 30, 60],
      // Listen events ratio
      listen_ratio: [1,2,3,4,5],
      // Error margin to use data saved in the persistor (in hours)
      data_delay: {
        from: [1, 2, 3, 5, 10, 24],
        to: [1, 2, 3, 5, 10, 24]
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
