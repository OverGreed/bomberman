define([], function() {
    'use strict';

    return {
        last: 0,
        elapsed: 0,
        tick: function(){
            var now = new Date().getTime();
            this.elapsed = now - this.last;
            this.last = now;
        }
    }
});
