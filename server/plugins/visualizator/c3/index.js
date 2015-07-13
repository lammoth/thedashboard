/**
 * C3 visualizator engine
 */


module.exports = C3Plugin;

function C3Plugin(data) {

  // C3 data needed to stablish the connection
  this.data = data;

  // C3 query lib
  this.queryClient = null;
}
