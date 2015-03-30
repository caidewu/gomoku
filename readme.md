# 五子棋
## 快速开始
1. 直接打开index.html，点击start按钮即可开始游戏
2.  将gomoku放在http服务器中运行亦可

## 说明
用户执黑先行，电脑执白
1. 下棋部分
该五子棋使用canvas进行绘图，使用一个二维数组保存落子的信息：
未落子时坐标的值为0，黑子为1，白子为2

2. 算法部分
15x15的标准棋盘组成五连组理论上有572种情况，分别遍历这572个区域，
按照评分规则给这个区域打分（可以累加），例如：当五元组为空时得分为7分，
当五元组有黑子又有白子，表示该五元组失效了，得0分（详情参考下面的评分表）
分数最高的坐标点，即最优的落子点

评分表

 五元组   |    得分 
 ------- | --------
 none      |    7     
 W         |    15    
 WW        |    400   
 WWW       |    5800  
 WWWW      |    100000
 B         |    35    
 BB        |    800   
 BBB       |    15000 
 BBBB      |    800000
 WB?       |    0     

## 代码结构
```
├── index.html<br>
├── js<br>
    ├── ai.js<br>
    ├── draw.js<br>
	└── judge.js
```

## License
[MIT](LICENSE)	
