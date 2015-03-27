(function(){
    var chessboard = this.chessboard;
    var gapNum = this.gapNum;
    var judge = function (offsetX, offsetY) {
        var color = chessboard[offsetX][offsetY];
        //左右判断
        var num = 0;
        for (var i = offsetX; i >= 0; i--) {
            if (chessboard[i][offsetY] != color) {
                break;
            }
            num++;
        }
        for (var i = offsetX + 1; i <= gapNum; i++) {
            if (chessboard[i][offsetY] != color) {
                break;
            }
            num++;
        }
        if (num >= 5) return true;
        //判断上下方向
        num = 0;
        for (var i = offsetY; i >= 0; i--) {
            if (chessboard[offsetX][i] != color) {
                break;
            }
            num++;
        }
        for (var i = offsetY + 1; i <= gapNum; i++) {
            if (chessboard[offsetX][i] != color) {
                break;
            }
            num++;
        }
        if (num >= 5) return true;

        //反斜线方向判断
        num = 0;
        for (var i = offsetX, j = offsetY; (i >= 0) && (j >= 0);) {
            if (chessboard[i][j] != color) {
                break;
            }
            num++;
            i--;
            j--;
        }
        for (var i = offsetX + 1, j = offsetY + 1; (i <= gapNum) && (j <= gapNum);) {
            if (chessboard[i][j] != color) {
                break;
            }
            num++;
            i++;
            j++;
        }
        if (num >= 5) return true;

        //正斜线方向判断
        num = 0;
        for (var i = offsetX, j = offsetY; (i >= 0) && (j <= gapNum);) {
            if (chessboard[i][j] != color) {
                break;
            }
            num++;
            i--;
            j++;
        }
        for (var i = offsetX + 1, j = offsetY - 1; (i <= gapNum) && (j >= 0);) {
            if (chessboard[i][j] != color) {
                break;
            }
            num++;
            i++;
            j--;
        }
        if (num >= 5) return true;

        return false;
    };
    this.judge = judge;
})();
