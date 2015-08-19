/**
 * Druid benchmark functions
 */

 module.exports = Benchmark;


 function Benchmark() {
  // Benchmark start time
  this.start = null;

  // Benchmark end time
  this.stop = null;
  
  // Initialize the benchmark
  this.startBenchmark = function() {
    this.start = new Date();
  }

  // Stop the benchmark
  this.stopBenchmark = function() {
    this.stop = new Date();
  }

  // Show benchmark results
  this.result = function(message) {
    return Math.floor(this.stop - this.start);
  }
 }