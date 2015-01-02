$(document).ready(function () {

    var mypaper = new Raphael(document.getElementById('table_canvas', '100%', '100%'));
    var initBallSize = 10;
    var minBallSize = 5;
    var maxBallSize = 15;
    var tableSizeOffset = 50;
    var tableWidth = mypaper.width - tableSizeOffset;
    var tableHeight = tableWidth * 2;
    var tableImg = mypaper.image('images/table-med.jpg', 0, 0, tableWidth, tableHeight);
    var ballColors = ['#fff','#ff0', '#00f', '#f00', '#8000ff', '#ff8000', '#008000', '#800040', '#000']; // '0-#f00-#fff-#f00'
    var balls = mypaper.set();
    var ballsSpacing = 30;
    var ballsInitPt = {x: tableWidth + tableSizeOffset / 2, y: 300};
    for (var i =0; i < ballColors.length; i++) {
        var x = ballsInitPt.x;
        var y = ballsInitPt.y + (i * ballsSpacing);
        var ball = mypaper.circle(x, y, initBallSize).attr({fill: ballColors[i], stroke: '#fff', opacity: 1});
        balls.push(ball);
    }

    // target
    var target = mypaper.circle(tableWidth/2, tableHeight/2, 30).attr({fill: '#006400', stroke: '#000', opacity: 1});

    // control buttons
    var curBallSize = initBallSize;
    mypaper.text(ballsInitPt.x, 25, 'B').attr({stroke: '#fff', opacity: 1, 'font-size': 20}).click(function() {
        curBallSize = (curBallSize >= maxBallSize) ? minBallSize : curBallSize + 1;
        balls.attr({r: curBallSize});
    });

    mypaper.text(ballsInitPt.x, 65, 'L').attr({stroke: '#fff', opacity: 1, 'font-size': 20}).click(function(e) {
        isLineMode = !isLineMode;
        var fontSize = (isLineMode) ? 40 : 20;
        this.attr({'font-size': fontSize});
        if (!isLineMode) {
            startPt = null;
        }
    });

    mypaper.text(ballsInitPt.x, 105, 'U').attr({stroke: '#fff', opacity: 1, 'font-size': 20}).click(function() {
        if (lines.length > 0) {
            var lastLine = lines.pop();
            var lastLinePath = lastLine.getPath();
            var startX = lastLinePath[0][1];
            var startY = lastLinePath[0][2];
            startPt = {x: startX, y: startY};
            lastLine.remove();
        }
        if (lines.length == 0) {
            startPt = null;
        }
    });

    mypaper.text(ballsInitPt.x, 145, 'R').attr({stroke: '#fff', opacity: 1, 'font-size': 20}).click(function(e) {
        // CB
        var cbXY = rndXY();
        balls[0].attr({cx: cbXY.x, cy: cbXY.y});
        // OB
        var obXY = rndXY();
        balls[1].attr({cx: obXY.x, cy: obXY.y});
        // Target
        var trgXY = rndXY();
        target.attr({cx: trgXY.x, cy: trgXY.y});
    });

    var rndXY = function() {
        var st = {x: 26, y: 28};
        var stepSize = {w:14.25, h:15.75}; // quoter diamond
        var stepX = randomIntFromInterval(0, 16);
        var stepY = randomIntFromInterval(0, 32);
        return {x: st.x + stepSize.w * stepX, y: st.y + stepSize.h * stepY};
    };

    var randomIntFromInterval = function (min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    };

    var ballDragStart = function () {
        this.ox = this.attr('cx');
        this.oy = this.attr('cy');
        this.animate({opacity: 0.5}, 500, '>');
    };
    var ballDragMove = function (dx, dy) {
        this.attr({cx: this.ox + dx, cy: this.oy + dy});
    };
    var ballDragUp = function () {
        this.animate({opacity: 1}, 500, '>');
    };
    balls.drag(ballDragMove, ballDragStart, ballDragUp);
    target.drag(ballDragMove, ballDragStart, ballDragUp);

    // Line drawing
    var isLineMode = false;
    var startPt = null;
    var curPt = null;
    var lines = [];

    tableImg.mousedown(function (e) {
        console.log("-- mouse down");
        if (isLineMode) {
            curPt = {x: e.pageX, y: e.pageY};
            if (startPt != null) {
                var pathStr = 'M' + startPt.x + ',' + startPt.y + ' L' + curPt.x + ',' + curPt.y;
                var curLine = mypaper.path(pathStr);
                lines.push(curLine);
            }
            startPt = curPt;
        }
    });





});