define([], function() {
    'use strict';

    var positions = [];
    var colors = [];

    return {
        list:[],
        add: function(light) {
            this.list.push(light);
        },
        remove: function(light) {
            var index = this.list.indexOf(light);
            if(index!=-1) {
                this.list.splice(index, 1);
            }
        },
        step: function(){
            positions = [];
            this.list.forEach(function(light) {
                positions.push(light.position[0]);
                positions.push(light.position[1]);
                positions.push(light.position[2]);
            });

            colors = [];
            this.list.forEach(function(light) {
                colors.push(light.color[0]);
                colors.push(light.color[1]);
                colors.push(light.color[2]);
            });
        },
        getPosition: function(){
            return positions;
        },
        getColor: function() {
            return colors;
        }
    };
});
