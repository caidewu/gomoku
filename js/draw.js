(function(){
    var baseX = 50,baseY = 50;//坐标[0,0]位置
    var gap = 30;   //间距
    var gapNum = 14; //棋盘格数（14表示15x15棋盘）
    // var lastTargetX = 0;
    // var lastTargetY = 0;
    var colorFlag ;

    var chessboard = new Array();
    var gomoku = document.getElementById("gomoku");
    gomoku.width = 520;
    gomoku.height = 520;
    var ctx = gomoku.getContext("2d");
    var initBoard  = function() {
        ctx.clearRect(0, 0, gomoku.width, gomoku.height);
        ctx.strokeStyle = "#171714";
        if (gomoku.getContext) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            //画横线
            for (var i = 0; i <= 14; i++) {
                ctx.moveTo(baseX, baseY + i * gap);
                ctx.lineTo(baseX + gapNum * gap, baseY + i * gap);
            }
            //画竖线
            for (var i = 0; i <= 14; i++) {
                ctx.moveTo(baseX + i * gap, baseY);
                ctx.lineTo(baseX + i * gap, baseY + gapNum * gap);
            }
            ctx.rect(baseX + Math.floor(gapNum / 4) * gap - 4, baseY + Math.floor(gapNum / 4) * gap - 4, 8, 8);
            ctx.rect(baseX + Math.ceil(gapNum * 3 / 4) * gap - 4, baseY + Math.floor(gapNum / 4) * gap - 4, 8, 8);
            ctx.rect(baseX + Math.floor(gapNum / 4) * gap - 4, baseY + Math.ceil(gapNum * 3 / 4) * gap - 4, 8, 8);
            ctx.rect(baseX + Math.ceil(gapNum * 3 / 4) * gap - 4, baseY + Math.ceil(gapNum * 3 / 4) * gap - 4, 8, 8);
            ctx.rect(baseX + Math.ceil(gapNum / 2) * gap - 4, baseY + Math.ceil(gapNum / 2) * gap - 4, 8, 8);
            ctx.closePath();
            ctx.stroke();
        }
    };
    initBoard();
    var initChess = function(){
        for (var i = 0; i <= gapNum; i++) {
            chessboard[i] = new Array();
            for (var j = 0; j <= gapNum; j++) {
                chessboard[i][j] = 0;//0表示没下棋，1表示下了黑棋，2表示下了白棋
            }
        }
    };

var putChess = function (offsetX, offsetY) {
    var rg = ctx.createRadialGradient(offsetX * gap + baseX, offsetY * gap + baseY, 0, offsetX * gap + baseX, offsetY * gap + baseY, gap / 3 - 2);

    if (colorFlag == 1) {
        rg.addColorStop(0, "#000000");
        rg.addColorStop(0.8, "#1C1B19");
        rg.addColorStop(1, "#776D64");
        chessboard[offsetX][offsetY] = 1;
        // speak(blackName + "已经下棋，现在轮到" + whiteName + "下" );
        colorFlag = 2;
    } else {
        rg.addColorStop(0, "#E3E5E4");
        rg.addColorStop(1, "#FFFFFF");
        chessboard[offsetX][offsetY] = 2;
        colorFlag = 1;
        // speak(whiteName + "已经下棋，现在轮到" + blackName + "下" );
    }
    ctx.beginPath();
    ctx.fillStyle = rg;
    ctx.arc(offsetX * gap + baseX, offsetY * gap + baseY, gap / 3 - 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
};

var clickHandler = function(e){

    var chessboardPos = gomoku.getBoundingClientRect();
    var mousePosX = e.pageX - chessboardPos.left;
    var mousePosY = e.pageY - chessboardPos.top;
    var offsetX = Math.round((mousePosX - baseX) / gap);
    var offsetY = Math.round((mousePosY - baseY) / gap);
    if (offsetX > gapNum || offsetY > gapNum || chessboard[offsetX][offsetY] != 0) {
        //原来的位置已经有棋子了
        return;
    }
    putChess(offsetX, offsetY);
    if(window.judge(offsetX, offsetY)){
        if(chessboard[offsetX][offsetY] == 1){
            alert('black win!');
            gomoku.removeEventListener('click',clickHandler,false);
        }else{
            alert('white win!');
            gomoku.removeEventListener('click',clickHandler,false);
        }
    }else{
        var point = window.ai();
        putChess(point.x, point.y);
        if(window.judge(point.x, point.y)){
            if(chessboard[point.x][point.y] == 1){
                alert('black win!');
                gomoku.removeEventListener('click',clickHandler,false);
            }else{
                alert('white win!');
                gomoku.removeEventListener('click',clickHandler,false);
            }
        }
    }


};

var start = function(){
    initBoard();
    initChess();
    //1表示黑色，默认黑色先下。2表示白色。
    colorFlag = 1;
    gomoku.addEventListener('click',clickHandler,false);
    console.log('start!!!');
};





//------------
//var getHighestScoredItems = function() {
//    // Create scoreboard. An array of objects {x: 0, y: 0, score: 50}.
//    var scoreboard = [];
//
//    function updateScoreboard(x, y, score) {
//        var result = scoreboard.filter(function(item) {
//            return item.x === x && item.y === y;
//        });
//
//        if (result.length === 0) {
//            scoreboard.push({
//                x: x,
//                y: y,
//                score: score
//            });
//        } else {
//            result[0].score += score;
//        }
//    }
//
//    // Loop through the game area and mark scores.
//    for (var x = 0; x < gapNum; x++) {
//        for (var y = 0; y < gapNum; y++) {
//            for (var i = 0, l = shapes.length; i < l; i++) {
//                var shape = shapes[i];
//
//                // Check if the shape was found at [x, y] coordinate.
//                if (checkShape(x, y, shape)) {
//                    // Add score to each peaceable position.
//                    shape.objects.forEach(function(position) {
//                        if (position.type === '*') {
//                            updateScoreboard(x + position.x, y + position.y, shape.score);
//                        }
//                    });
//                }
//            }
//        }
//    }
//
//    // Determine the highest score.
//    var highestScore = 0;
//    scoreboard.forEach(function(item) {
//        if (item.score > highestScore) {
//            highestScore = item.score;
//        }
//    });
//
//    // Make an array of all highest scored items.
//    var highestScoredItems = [];
//    scoreboard.forEach(function(item) {
//        if (item.score === highestScore) {
//            highestScoredItems.push(item);
//        }
//    });
//
//    this.scoreboard = scoreboard;
//
//    return highestScoredItems;
//};
//
//var checkShape = function(x, y, shape) {
//        var matches = 0;
//
//        var metTicOrToe = null; // Keep logging if we met either X or O along the way.
//
//        shape.objects.forEach(function(shapeObject) {
//            var gameObject = engine.getGameObject(x + shapeObject.x, y + shapeObject.y);
//
//            // Matched empty "*" or "-".
//            if ((shapeObject.type === '*' || shapeObject.type === '-') && gameObject === null) {
//                matches++;
//            }
//
//            // Matched "X".
//            var isGameObjectXOrO = gameObject && (gameObject.type === 0 || gameObject.type === 1);
//            if (shapeObject.type === 'X' && isGameObjectXOrO) {
//                // Make sure the match does not change type between X or O.
//                // i.e. we want *xxx* to match either 3 X's or 3 O's but not a mixed set of them.
//                var gameObjectTypeIsOk = metTicOrToe === null || gameObject.type === metTicOrToe;
//                if (gameObjectTypeIsOk) {
//                    matches++;
//                    metTicOrToe = gameObject.type;
//                }
//            }
//
//            // Matched "B" = Block. Either different X/O or out of game arena.
//            if (shapeObject.type === 'B') {
//                var outOfGameArena = false; // TODO: Implement! Out of game arena check does not work yet because the loop never goes out of the arena!
//                if (outOfGameArena) {
//                    matches++;
//                } else {
//                    if (gameObject && (metTicOrToe === null || gameObject.type !== metTicOrToe)) {
//                        matches++;
//                        metTicOrToe = 1 - gameObject.type; // Switch the object type around because we match a block, not a player object.
//                    }
//                }
//            }
//        });
//
//        // Return true if all shape objects matched, and match count > 0.
//        return (matches && shape.objects.length === matches);
//    };

this.start = start;
    this.chessboard = chessboard;
    this.gapNum = gapNum;


})();
