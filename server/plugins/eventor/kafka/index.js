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
  this.client = new Client(this.data.address);
  this.consumer = new Consumer(this.client, this.data.topics, this.data.options);
  this.eventor = eventor;
}

// Set Kafka event handlers on
KafkaPlugin.prototype.connect = function() {
  var parent = this;
  this.client.on('ready', function() {
    console.log("Kafka client ready");
  });

  // var mcount = 0;
  this.consumer.on('message', function (message) {
    // Extract the message identifier
    // Get Redis visualizations and match identifier (time is a requirement)
    // Invoke tasker in order to put the acquisitor on ready (acquisitor must communicate to visualizator and return a result)
    // Get results and emit a callback to emit a response through websocket
    parent.messageParsed(message);
    // console.log('message ', mcount++);
  });

  this.consumer.on('error', function (err) {
    console.log('error', new Date(), err);
  });
};

KafkaPlugin.prototype.messageParsed = function(data) {
  this.eventor.emit('updateVisualization', data);
};
