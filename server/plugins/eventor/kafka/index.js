/**
 * Spark acquisition engine
 */

var kafka = require('kafka-node'),
    Client = kafka.Client,
    Consumer = kafka.HighLevelConsumer,
    Q = require('q');

module.exports = KafkaPlugin;

function KafkaPlugin(socket, data) {
  // Kafka data needed to stablish the connection
  this.data = data;
  this.client = new Client(this.data.address);
  this.consumer = new Consumer(this.client, this.data.topics, this.data.options);
  this.socket = socket;
}

// Set Kafka event handlers on
KafkaPlugin.prototype.connect = function() {
  var parent = this;

  this.client.on('ready', function() {
    console.log("Kafka client ready");
  });

  this.consumer.on('message', function (message) {
    // Extract the message identifier
    // Get Redis visualizations and match identifier (time is a requirement)
    // Invoke tasker in order to put the acquisitor on ready (acquisitor must communicate to visualizator and return a result)
    // Get results and emit a callback to emit a response through websocket
    parent.messageParsed('hola');
  });

  this.consumer.on('error', function (err) {
    console.log('error', err);
  });
};

KafkaPlugin.prototype.messageParsed = function(data) {
  this.socket.emit('updateVisualization', data);
};