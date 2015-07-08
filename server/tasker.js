/**
 * Task queue engine
 */


var kue = require('kue');

module.exports = Tasker;

function Tasker() {
  this.queue = kue.createQueue();
  
  this.create = function(type, broker, cb) {
    var job = this.queue.create(type, {title:'Task job'});

    job.on( 'complete', function () {
      console.log( " Job %d complete", job.id );
      broker.socketEvent({name: type + "-" + job.id, data: {}});
    } ).on( 'enqueue', function () {
      console.log( " Job enqueue" );
    } ).on( 'failed', function () {
      console.log( " Job failed" );
    } ).on( 'progress', function ( progress ) {
      console.log( '\r  job #' + job.id + ' ' + progress + '% complete' );
    } );

    job.save(function(err) {
      if( !err ) return cb(job.id);
    });
  }

  this.queue.process('query', 1, function(job, done) {
    console.log("Processing job %d", job.id);
    done();
  });
}