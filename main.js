import {Drawer} from './module/drawer.mjs'
import {Jenerator} from './module/jenerator.mjs'
import {Tester} from './module/tester.mjs'
import {Solver} from './module/solver.mjs'


let maze = {
  charaX : 0,
  charaY : 0,
  size: 30,
  map : []
};
let drawer;

// Jenerateボタンが押されたら，フォームの数値を大きさとして迷路を生成する
document.getElementById('jenBt').onclick = function(){

  // 迷路の一辺のサイズ
  let inputMsg = document.getElementById("mazeSize").value;
  maze.size = parseInt(inputMsg, 10);
  // 迷路の状態を格納する正方形の二次元配列
  maze.map = new Array(maze.size);
  for(let i=0;i<maze.size;i++){
    maze.map[i] = new Array(maze.size).fill(0);
  }


  const jenerator = new Jenerator(maze);
  drawer = new Drawer(maze, 'maze_canvas');
  // 迷路を生成
  jenerator.jenerateMaze();

  // 迷路に欠陥がないかテスト
  const tester = new Tester(maze);
  if(tester.testMaze()){
    // 問題なければボタンにクリックイベントをつける
    document.getElementById('solveBt').onclick = function(){
      const solver = new Solver(maze);
      solver.solveMaze();
      drawer.drawMaze();
    }
  }else{
    console.log("Sorry. Please reload this page.");
  }

  // スタート地点を探す
  for(let i=1;i<maze.size-1;i++){
    for(let j=1;j<maze.size-1;j++){
      if(maze.map[i][j] == 2){
        // スタートの隣の通路にキャラを配置
        maze.charaX = i;
        maze.charaY = j;
        if(maze.map[i-1][j] == 1){
          maze.charaX--;
        }else if(maze.map[i+1][j] == 1){
          maze.charaX++;
        }else if(maze.map[i][j-1] == 1){
          maze.charaY--;
        }else if(maze.map[i][j+1] == 1){
          maze.charaY++;
        }
      }
    }
  }
  maze.map[maze.charaX][maze.charaY] = 5;

  drawer.drawMaze();

}

// ボタン入力
document.getElementById('ArrowUp').onclick = arrowUp;
document.getElementById('ArrowDown').onclick = arrowDown;
document.getElementById('ArrowLeft').onclick = arrowLeft;
document.getElementById('ArrowRight').onclick = arrowRight;
// キー入力
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case "ArrowUp":
      arrowUp();
      break;
    case "ArrowDown":
      arrowDown();
      break;
    case "ArrowLeft":
      arrowLeft();
      break;
    case "ArrowRight":
      arrowRight();
      break;
  }
});

// 矢印ボタンの実装
function arrowUp(){
  let x = maze.charaX, y = maze.charaY;
  // 行きたい方向が通路やもう通った場所か
  if(maze.map[x-1][y] == 1){
    maze.map[x][y] = 6;
    drawer.drawSquare(x, y);
    maze.map[x-1][y] = 5;
    drawer.drawSquare(x-1, y);
    maze.charaX--;
  }else if(maze.map[x-1][y] == 6){
    maze.map[x][y] = 1;
    drawer.drawSquare(x, y);
    maze.map[x-1][y] = 5;
    drawer.drawSquare(x-1, y);
    maze.charaX--;
  }
}
function arrowDown(){
  let x = maze.charaX, y = maze.charaY;
  // 行きたい方向が通路やもう通った場所か
  if(maze.map[x+1][y] == 1){
    maze.map[x][y] = 6;
    drawer.drawSquare(x, y);
    maze.map[x+1][y] = 5;
    drawer.drawSquare(x+1, y);
    maze.charaX++;
  }else if(maze.map[x+1][y] == 6){
    maze.map[x][y] = 1;
    drawer.drawSquare(x, y);
    maze.map[x+1][y] = 5;
    drawer.drawSquare(x+1, y);
    maze.charaX++;
  }
}
function arrowLeft(){
  let x = maze.charaX, y = maze.charaY;
  // 行きたい方向が通路やもう通った場所か
  if(maze.map[x][y-1] == 1){
    maze.map[x][y] = 6;
    drawer.drawSquare(x, y);
    maze.map[x][y-1] = 5;
    drawer.drawSquare(x, y-1);
    maze.charaY--;
  }else if(maze.map[x][y-1] == 6){
    maze.map[x][y] = 1;
    drawer.drawSquare(x, y);
    maze.map[x][y-1] = 5;
    drawer.drawSquare(x, y-1);
    maze.charaY--;
  }
}
function arrowRight(){
  let x = maze.charaX, y = maze.charaY;
  // 行きたい方向が通路やもう通った場所か
  if(maze.map[x][y+1] == 1){
    maze.map[x][y] = 6;
    drawer.drawSquare(x, y);
    maze.map[x][y+1] = 5;
    drawer.drawSquare(x, y+1);
    maze.charaY++;
  }else if(maze.map[x][y+1] == 6){
    maze.map[x][y] = 1;
    drawer.drawSquare(x, y);
    maze.map[x][y+1] = 5;
    drawer.drawSquare(x, y+1);
    maze.charaY++;
  }
}
