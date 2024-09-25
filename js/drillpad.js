$(document).ready(function () {

    var mypaper = new Raphael(0, 0, $(window).width(), $(window).height());

    var getNumOfLines = function() {
        var hash = window.location.hash.replace('#', '');
        if (hash) {
            return Math.min(parseInt(hash), 6);
        }
        return -1;
    };

    var isLandscape = function () {
        return (window.innerHeight < window.innerWidth);
    };

    var drawTable = function() {
        var table = mypaper.rect(0, 0, mypaper.width, mypaper.height, 10);
        table.attr('fill', '#fff');

        mypaper.circle(0, 0, 20).attr('fill', '#000');
        if (isLandscape()) {
            mypaper.circle(mypaper.width/2, 0, 15).attr('fill', '#000');
        } else {
            mypaper.circle(0, mypaper.height/2, 15).attr('fill', '#000');
        }
        mypaper.circle(mypaper.width, 0, 20).attr('fill', '#000');
        mypaper.circle(0, mypaper.height, 20).attr('fill', '#000');
        mypaper.circle(mypaper.width, mypaper.height, 20).attr('fill', '#000');
        if (isLandscape()) {
            mypaper.circle(mypaper.width/2, mypaper.height, 15).attr('fill', '#000');
        } else {
            mypaper.circle(mypaper.width, mypaper.height/2, 15).attr('fill', '#000');
        }

        return table;
    };

    var secPerDmd = 4;
    var verticalLineCnt = (isLandscape() ? 8 : 4) * secPerDmd;
    var horizontalLineCnt = (isLandscape() ? 4 : 8) * secPerDmd;
    var drawGrid = function () {
        // Vertical
        for (var i = 1; i < verticalLineCnt; i++) {
            var p = 'M' + (mypaper.width / verticalLineCnt * i) + ',0 V' + mypaper.height;
            drawLine(p, (i % secPerDmd == 0));
        }
        // Horizontal
        for (i = 1; i < horizontalLineCnt; i++) {
            p = 'M0,' + (mypaper.height / horizontalLineCnt * i) + ' H' + mypaper.width;
            drawLine(p, (i % secPerDmd == 0));
        }

    };

    var drawLine = function(path, solid) {
        var pathElem = mypaper.path(path);
        pathElem.attr('stroke-dasharray', (solid) ? '' : '. ');
        return pathElem;
    };

    var randomIntFromInterval = function (min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    };

    var randomLine = function (color) {
        var vRnd = randomIntFromInterval(0, verticalLineCnt);
        var hRnd = randomIntFromInterval(0, horizontalLineCnt);
        var rndLineSet = mypaper.set();
        rndLineSet.push(
            drawLine('M' + adjustAtEdge(mypaper.width / verticalLineCnt * vRnd, mypaper.width) + ',0 V' + mypaper.height, true),
            drawLine('M0,' + adjustAtEdge(mypaper.height/ horizontalLineCnt * hRnd, mypaper.height) + ' H' + mypaper.width, true)
        );
        rndLineSet.attr('stroke', color).attr('stroke-width', 3);
        return rndLineSet;
    };

    var randomTarget = function () {
        var vRnd = randomIntFromInterval(0, verticalLineCnt);
        var hRnd = randomIntFromInterval(0, horizontalLineCnt);
        var radius = mypaper.width / verticalLineCnt;
        var targetSet = mypaper.set();
        targetSet.push (
            mypaper.circle(mypaper.width / verticalLineCnt * vRnd, mypaper.height / horizontalLineCnt * hRnd, radius*2).attr('stroke', '#0f0').attr('stroke-width', 2),
            mypaper.circle(mypaper.width / verticalLineCnt * vRnd, mypaper.height / horizontalLineCnt * hRnd, radius).attr('stroke', '#f00').attr('stroke-width', 2),
            mypaper.circle(mypaper.width / verticalLineCnt * vRnd, mypaper.height / horizontalLineCnt * hRnd, radius/2).attr('stroke', '#000').attr('stroke-width', 2)
        );
        return targetSet;
    };

    var adjustAtEdge = function (val, max) {
        var pxl = 4;
        if (val == 0)
            return pxl;
        else if (val == max)
            return val - pxl;
        else
            return val;
    };


    var colors = ['red', 'blue', 'green', 'purple', '#FFD700', '#FF00FF'];
    var curLines = [];
    var table = drawTable();
    drawGrid();
    table.click(function () {
        $.each(curLines, function (index, line) {
            line.remove();
        });
        curLines = [];
        var numOfLines = getNumOfLines();
        for (var i=0; i<Math.abs(numOfLines); i++) {
            curLines.push(randomLine(colors[i]));
        }
        if (numOfLines == -1) {
            curLines.push(randomTarget());
        }
    });
});
