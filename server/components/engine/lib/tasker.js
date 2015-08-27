/**
 * Task queue engine
 */


var kue = require('kue'),
  _ = require('lodash'),
  Persistor = new (require('./persistor'))();

module.exports = Tasker;

function Tasker() {
  this.queue = kue.createQueue();
  
  this.createTask = function(data, broker, fn) {
    var job = this.queue.create(data.type, {title:'Task job'}).removeOnComplete(true);
    job.data.data = data;

    // TODO: Check errors
    job.on( 'complete', function () {
      console.log( " Job %d complete", job.id );
      broker.socketEvent({name: data.type + "-" + job.id, data: {job: job.id}});
    } ).on( 'enqueue', function () {
      console.log( " Job enqueue" );
    } ).on( 'failed', function () {
      console.log( " Job failed" );
    } ).on( 'progress', function ( progress ) {
      console.log( '\r  job #' + job.id + ' ' + progress + '% complete' );
    } );

    job.save(function(err) {
      if( !err ) fn(job.id);
    });
  };

  this.processTask = function(type, task) {
    this.queue.process(type, 1, function(job, done) {
      console.log("Processing job %d", job.id);
      task(job.id, job.data.data, done);
    });
  };

  this.getTaskData = function(task, persistor, cb) {
    persistor.getTaskResults(task, cb);
  }
}