/**
 * Spark acquisition engine
 */

var kafka = require('kafka-node'),
    Client = kafka.Client,
    Consumer = kafka.HighLevelConsumer;

module.exports = KafkaPlugin;


function KafkaPlugin(eventor, data) {
  // Kafka data needed to stablish the connection
  this.data = data;
  this.client = new Client(this.data.address, 'wan');
  this.consumer = new Consumer(this.client, this.data.topics, this.data.options);
  this.eventor = eventor;
  this.isConnected = false;
}

// Set Kafka event handlers on
KafkaPlugin.prototype.connect = function() {
  var parent = this;
  parent.isConnected = true;

  this.client.on('ready', function() {
    console.log("Kafka client ready");
  });

  this.client.on('connect', function() {
    console.log("Kafka socket connected");
  });

  this.client.on('close', function(socket) {
    console.log("Kafka client closed");
  });

  this.consumer.on('message', function (message) {
    // Extract the message identifier
    // Get Redis visualizations and match identifier (time is a requirement)
    // Invoke tasker in order to put the acquisitor on ready (acquisitor must communicate to visualizator and return a result)
    // Get results and emit a callback to emit a response through websocket
    parent.messageParsed(message);
  });

  this.consumer.on('error', function (err) {
    console.log('error', new Date(), err);
  });

};

KafkaPlugin.prototype.close = function(cb) {
  var parent = this;
  this.consumer.close(function() {
    parent.isConnected = false;
    return cb();
  });
};

KafkaPlugin.prototype.messageParsed = function(data) {
  this.eventor.emit('updateVisualization', data);
};
