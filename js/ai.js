(function(){
    var gapNum = this.gapNum;
    var chessboard = this.chessboard;
    var scoreboard = new Array();
    for (var i = 0; i <= gapNum; i++) {
        scoreboard[i] = new Array();
        for (var j = 0; j <= gapNum; j++) {
            scoreboard[i][j] = 0;//初始化每个位置评分为0
        }
    }

    //ai
    function ai(){

        //水平方向 horizontal
        horizontal();
        //垂直方向 vertical
        vertical();
        //正斜方向 forwardslash
        forwardSlash();
        //反斜方向 backslash
        backslash();
        return getHighScore();

    }

    var horizontal = function(){
        for(var index in chessboard) {
            var end = 5;
            while(end <= gapNum+1){

                var empty = 0;
                var black = 0;
                var white = 0;
                var isZero = false;
                for (var start = end - 5; start < end; start++) {
                    //遍历一个五元组

                    if (chessboard[start][index] === 1) {
                        if (white > 0) {
                            isZero = true;
                            break;   //该五元组评分为0
                        }
                        black++;


                    } else if (chessboard[start][index] === 2) {
                        if (black > 0) {
                            isZero = true;
                            break;   //该五元组评分为0
                        }
                        white++;
                    } else {
                        empty++;
                    }
                }
                if (!isZero) {
                    if (empty === 5) {
                        //加7
                        addScore(7,end,index,'a');

                    } else if (black > 0) {
                        //同黑
                        addScore(getScore('black',black),end,index,'a');
                    } else {
                        addScore(getScore('white',white),end,index,'a');
                    }
                }
                end++;
            }

        }
    }
    var vertical = function(){
        for(var index in chessboard) {
            var end = 5;
            while(end <= gapNum+1){

                var empty = 0;
                var black = 0;
                var white = 0;
                var isZero = false;
                for (var start = end - 5; start < end; start++) {
                    //遍历一个五元组

                    if (chessboard[index][start] === 1) {
                        if (white > 0) {
                            isZero = true;
                            break;   //该五元组评分为0
                        }
                        black++;


                    } else if (chessboard[index][start] === 2) {
                        if (black > 0) {
                            isZero = true;
                            break;   //该五元组评分为0
                        }
                        white++;
                    } else {
                        empty++;
                    }
                }
                if (!isZero) {
                    if (empty === 5) {
                        //加7
                        addScore(7,end,index,'b');

                    } else if (black > 0) {
                        //同黑
                        addScore(getScore('black',black),end,index,'b');
                    } else {
                        addScore(getScore('white',white),end,index,'b');
                    }
                }
                end++;
            }

        }
    }
    var forwardSlash = function(){
        var px = 0;
        var py = 1;
        while(px <= gapNum-4){
            loop(px,0);
            px++;

        }
        // px = 0;
        while(py<= gapNum-4){
            loop(0,py);
            py++;
        }
        function loop(px,py){
            var end = 5;
            while(end <= gapNum+1-px-py){

                var empty = 0;
                var black = 0;
                var white = 0;
                var isZero = false;
                for (var start = end - 5; start < end; start++) {
                    //遍历一个五元组

                    if (chessboard[start+px][start+py] === 1) {
                        if (white > 0) {
                            isZero = true;
                            break;   //该五元组评分为0
                        }
                        black++;


                    } else if (chessboard[start+px][start+py] === 2) {
                        if (black > 0) {
                            isZero = true;
                            break;   //该五元组评分为0
                        }
                        white++;
                    } else {
                        empty++;
                    }
                }
                if (!isZero) {
                    if (empty === 5) {
                        //加7
                        addScore(7,end,null,'c',px,py);

                    } else if (black > 0) {
                        //同黑
                        addScore(getScore('black',black),end,null,'c',px,py);
                    } else {
                        addScore(getScore('white',white),end,null,'c',px,py);
                    }
                }
                end++;
            }
        }
    }
    var backslash = function(){
        var px = 0;
        var py = 1;
        while(px <= gapNum-4){
            loop(px,0);
            px++;

        }
        // px = 0;
        while(py<= gapNum-4){
            loop(0,py);
            py++;
        }
        function loop(px,py){
            var end = 5;
            while(end <= gapNum+1-px-py){

                var empty = 0;
                var black = 0;
                var white = 0;
                var isZero = false;
                for (var start = end - 5; start < end; start++) {
                    //遍历一个五元组

                    if (chessboard[gapNum-(start+px)][start+py] === 1) {
                        if (white > 0) {
                            isZero = true;
                            break;   //该五元组评分为0
                        }
                        black++;


                    } else if (chessboard[gapNum-(start+px)][start+py] === 2) {
                        if (black > 0) {
                            isZero = true;
                            break;   //该五元组评分为0
                        }
                        white++;
                    } else {
                        empty++;
                    }
                }
                if (!isZero) {
                    if (empty === 5) {
                        //加7
                        addScore(7,end,null,'d',px,py);

                    } else if (black > 0) {
                        //同黑
                        addScore(getScore('black',black),end,null,'d',px,py);
                    } else {
                        addScore(getScore('white',white),end,null,'d',px,py);
                    }
                }
                end++;
            }
        }
    }

    var addScore = function (score,end,index,type,px,py){

        for (var start = end-5; start < end; start++) {
            if(type == 'b'){
                if(chessboard[index][start] == 0){
                    //空的位置，设置评分
                    scoreboard[index][start] +=score;
                }
            }else if(type == 'a'){
                if(chessboard[start][index] == 0){
                    //空的位置，设置评分
                    scoreboard[start][index] +=score;
                }
            }else if(type == 'c'){
                if(chessboard[start+px][start+py] == 0){
                    //空的位置，设置评分
                    scoreboard[start+px][start+py] +=score;
                }
            }else{
                if(chessboard[gapNum-(start+px)][start+py] == 0){
                    //空的位置，设置评分
                    scoreboard[gapNum-(start+px)][start+py] +=score;
                }
            }

        }
    };

    var getHighScore = function(){
        var highestScore = 0;
        var points = [];

        for(var x in scoreboard){
            for(var y in scoreboard[x]){
                if(scoreboard[x][y] > highestScore){
                    highestScore = scoreboard[x][y];
                }
            }
        }
        for(var x in scoreboard){
            for(var y in scoreboard[x]){
                if(scoreboard[x][y] == highestScore){
                    points.push(new Point(x,y));
                }
                scoreboard[x][y] = 0;
            }
        }
        console.log(points);
        return points[Math.floor(Math.random() * (points.length-1))];

    };

    function Point(x,y){
        this.x = parseInt(x);
        this.y = parseInt(y);
    };

    var getScore = function (type,score){
        if(type === 'black'){
            switch (score){
                case 1: return 35;
                    break;
                case 2: return 800;
                    break;
                case 3: return 15000;
                    break;
                case 4: return 800000;
                    break;
            }

        }else{
            switch (score){
                case 1: return 15;
                    break;
                case 2: return 400;
                    break;
                case 3: return 5800;
                    break;
                case 4: return 100000;
                    break;
            }
        }
    };

    this.ai = ai;
})();