'use strict';

angular.module('thedashboardApp')
  .factory('TimeFilter', function ($rootScope) {
    function dateMinutesAgo(minutes) {
      var now = new Date().getTime();
      return new Date(now - minutes * 60000);
    }
    return {
      observerCallbacks: {},
      registerObserver: function(name, callback) {
        if (!this.observerCallbacks[name]) {
          this.observerCallbacks[name] = [];
        }
        this.observerCallbacks[name].push(callback);
      },
      notifyObservers: function (name) {
        _.each(this.observerCallbacks[name], function(cb) {
          cb();          
        })
      },
      isVisible: false,
      toogle: function(name) {
        this.isVisible = !this.isVisible;
        this.notifyObservers(name);
      },
      setAbsolute: function(dates) {
        this.mode = 'absolute';
        this.absoluteDates = dates;
        this.notifyObservers('absolute');
      },
      setQuick: function(name, quick) {
        this.quick = quick;
        this.mode = 'quick';
        this.notifyObservers(name);
      },
      from: function() {
        if (this.mode == 'quick') {
          return this.quick.from();
        } else {
          return this.absoluteDates.from;
        }
      },
      to: function() {
        if (this.mode == 'quick') {
          return this.quick.to();
        } else {
          return this.absoluteDates.to;
        }
      },
      quicks: [
        [
          {
            name: 'Last 15 minutes',
            from: function() {
              return dateMinutesAgo(15);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 30 minutes',
            from: function() {
              return dateMinutesAgo(30);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 1 hour',
            from: function() {
              return dateMinutesAgo(60);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 4 hours',
            from: function() {
              return dateMinutesAgo(60 * 4);
            },
            to: function() {
              return new Date();
            }
          }
        ],
        [
          {
            name: 'Last 12 hours',
            from: function() {
              return dateMinutesAgo(60 * 12);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 24 hours',
            from: function() {
              return dateMinutesAgo(60 * 24);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 7 days',
            from: function() {
              return dateMinutesAgo(60 * 24 * 7);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 30 days',
            from: function() {
              return dateMinutesAgo(60 * 24 * 30);
            },
            to: function() {
              return new Date();
            }
          }
        ],
        [
          {
            name: 'Last 60 days',
            from: function() {
              return dateMinutesAgo(60 * 24 * 60);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 90 days',
            from: function() {
              return dateMinutesAgo(60 * 24 * 90);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 6 months',
            from: function() {
              return dateMinutesAgo(60 * 24 * 180);
            },
            to: function() {
              return new Date();
            }
          },
          {
            name: 'Last 1 year',
            from: function() {
              return dateMinutesAgo(60 * 24 * 365);
            },
            to: function() {
              return new Date();
            }
          }
        ]
      ],
      quick: null,
      absoluteDates: null,
      mode: null
    };
  });
