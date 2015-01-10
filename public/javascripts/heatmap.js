'use strict';

var data = [[11, 12, 13, 14],
            [21, 22, 23, 24],
            [31, 32, 33, 34],
            [41, 42, 43, 44]];

var cellWidth = 30;
var cellHeight = 30;

var height = (cellHeight) * (data.length) + 1;
var width = (cellWidth) * (data[0].length) + 1;

var map = d3.select('.heatmap')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'rgb(0,0,255)');

var row = map.selectAll('g')
    .data(data)
    .enter().append('g')
    .attr('transform', function (d, i) {return 'translate(0, ' + i * (cellWidth) + ')';});


var col = row.selectAll('rect')
    .data(function (d) {return d;})
    .enter().append('rect')
    .attr('width', cellHeight)
    .attr('height', cellWidth)
    .attr('x', .5)
    .attr('y', .5)
    .attr('transform', function (d, i) {return 'translate(' + i * (cellHeight) + ' ,0)';})
    .style({'stroke-width': 1, 
            'stroke': 'rgb(255,255,255)'})
    .style('fill', function (d) {return d;});

var text = row.selectAll('text')
    .data(function (d) {return d;})
    .enter().append('text')
    .attr('transform', function (d, i) {return 'translate(' + i * (cellHeight) + ' ,0)';})
    .text(function (d) {return d;})
    .attr('y', 15)
    .attr('x', 5)
    .style({'fill': 'rgb(255,255,255)', 
            'font': '10px sans-serif'});

