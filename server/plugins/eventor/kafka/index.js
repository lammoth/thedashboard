/**
 * Spark acquisition engine
 */

var kafka = require('kafka-node'),
    Client = kafka.Client,
    Consumer = kafka.HighLevelConsumer,
    Q = require('q');

module.exports = KafkaPlugin;

function KafkaPlugin(data) {
  // Kafka data needed to stablish the connection
  this.data = data;
  this.client = new Client(this.data.address);
  this.consumer = new Consumer(this.client, this.data.topics, this.data.options);
}

// Set Kafka event handlers on
KafkaPlugin.prototype.connect = function() {
  this.client.on('ready', function() {
    console.log("Kafka client ready");
  });

  this.consumer.on('message', function (message) {
    // console.log(message);
  });

  this.consumer.on('error', function (err) {
    console.log('error', err);
  });
};