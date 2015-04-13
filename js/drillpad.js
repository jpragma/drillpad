$(document).ready(function () {

    var mypaper = new Raphael(0, 0, $(window).width(), $(window).height());

    var drawTable = function() {
        var table = mypaper.rect(0, 0, mypaper.width, mypaper.height, 10);
        table.attr('fill', '#fff');
        return table;
    };

    var secPerDmd = 3;
    var verticalLineCnt = 8 * secPerDmd;
    var horizontalLineCnt = 4 * secPerDmd;
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

    var randomLine = function () {
        var vRnd = randomIntFromInterval(0, verticalLineCnt);
        var hRnd = randomIntFromInterval(0, horizontalLineCnt);
        var rndLineSet = mypaper.set();
        rndLineSet.push(
            drawLine('M' + mypaper.width / verticalLineCnt * vRnd + ',0 V' + mypaper.height, true),
            drawLine('M0,' + mypaper.height/ horizontalLineCnt * hRnd + ' H' + mypaper.width, true)
        );
        rndLineSet.attr('stroke', 'red').attr('stroke-width', 3);
        return rndLineSet;
    };

    var curLine = null;
    var table = drawTable();
    drawGrid();
    table.click(function () {
        if (curLine)
            curLine.remove();
        curLine = randomLine();
    });
});