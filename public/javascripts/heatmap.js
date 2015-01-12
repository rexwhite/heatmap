'use strict';

var data = generateArray();

var cellWidth = 40;
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
    .attr('transform', function (d, i) {return 'translate(0, ' + i * (cellHeight) + ')';});


var col = row.selectAll('rect')
    .data(function (d) {return d;})
    .enter().append('rect')
    .attr('height', cellHeight)
    .attr('width', cellWidth)
    .attr('x', .5)
    .attr('y', .5)
    .attr('transform', function (d, i) {return 'translate(' + i * (cellWidth) + ' ,0)';})
    .style({'stroke-width': 1, 
            'stroke': 'rgb(255,255,255)'})
    .style('fill', function (d) {return mapColor(d);});

var text = row.selectAll('text')
    .data(function (d) {return d;})
    .enter().append('text')
    .attr('transform', function (d, i) {return 'translate(' + i * (cellWidth) + ' ,0)';})
    .text(function (d) {return (d < 1) ? d.toPrecision(3) : d.toPrecision(4);})
    .attr('y', 18)
    .attr('x', 8)
    .style({'fill': function (d) {return fontColor(d);}, 
            'font': '10px sans-serif'});


function generateArray () {
    var row, cell, cpus, appliances;
    var data = [];

    for (appliances = 1; appliances <= 50; appliances++) {
        row = [];
        for (cpus = 2; cpus <= 32; cpus++) {
            cell = 0.435 * 20 / cpus * appliances;
            row.push( (cell < 100) ? cell : 100 );
        }
        data.push(row);
    }

    return data;
};


function mapColor (x) {
    if (x > 100) x = 100;

    var yellow = d3.hsl(60, 1, 0.55);
    var red = d3.hsl(0, 1, 0.40);
    var green = d3.hsl(116, 1, 0.15);


    if (x <= 30) {
        x = x / 47
        return d3.interpolateHsl(green, yellow)(x);
    }

    else {
        x = (x-30) / 50;
        if (x > 1) x = 1;

        return d3.interpolateHsl(yellow, red)(x);
    }
};

function fontColor(x) {
    var rgb = d3.rgb(mapColor(x));
    var luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

    return (luminance < 0.54) ? d3.rgb('white') : d3.rgb('black');
  
    // return (d3.hsl(mapColor(x)).l < .5 ) ? d3.rgb('white') : d3.rgb('black');
}