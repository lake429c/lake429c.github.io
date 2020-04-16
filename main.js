import {Drawer} from './module/drawer.mjs'
import {Jenerator} from './module/jenerator.mjs'
import {Tester} from './module/tester.mjs'
import {Solver} from './module/solver.mjs'


let maze;
let drawer;

// Jenerateボタンが押されたら，フォームの数値を大きさとして迷路を生成する
document.getElementById('jenBt').onclick = function(){

  // 迷路の一辺のサイズ
  let inputMsg = document.getElementById("mazeSize").value;
  const size = parseInt(inputMsg, 10);
  // 迷路の状態を格納する正方形の二次元配列
  maze = new Array(size);
  for(let i=0;i<size;i++){
    maze[i] = new Array(size).fill(0);
  }


  const jenerator = new Jenerator(maze);
  drawer = new Drawer(maze, 'maze_canvas');
  // 迷路を生成
  jenerator.jenerateMaze();
  drawer.drawMaze();

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
  for(let i=1;i<maze.length-1;i++){
    for(let j=1;j<maze.length-1;j++){
      if(maze[i][j] == 2){
        // 周りの通路にキャラを配置
        if(maze[i-1][j] == 1){
          maze[i-1][j] = 5;
          drawer.drawSquare(i-1, j);
        }else if(maze[i+1][j] == 1){
          maze[i+1][j] = 5;
          drawer.drawSquare(i+1, j);
        }else if(maze[i][j-1] == 1){
          maze[i][j-1] = 5;
          drawer.drawSquare(i, j-1);
        }else if(maze[i][j+1] == 1){
          maze[i][j+1] = 5;
          drawer.drawSquare(i, j+1);
        }
      }
    }
  }

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
  let x, y;
  // キャラの位置を見つける
  for(let i=1;i<maze.length-1;i++){
    for(let j=1;j<maze.length-1;j++){
      if(maze[i][j] == 5){
        x = i;
        y = j;
        break;
      }
    }
  }
  // 行きたい方向が通路やもう通った場所か
  if(maze[x-1][y] == 1){
    maze[x][y] = 6;
    drawer.drawSquare(x, y);
    maze[x-1][y] = 5;
    drawer.drawSquare(x-1, y);
  }else if(maze[x-1][y] == 6){
    maze[x][y] = 1;
    drawer.drawSquare(x, y);
    maze[x-1][y] = 5;
    drawer.drawSquare(x-1, y);
  }
}
function arrowDown(){
  let x, y;
  // キャラの位置を見つける
  for(let i=1;i<maze.length-1;i++){
    for(let j=1;j<maze.length-1;j++){
      if(maze[i][j] == 5){
        x = i;
        y = j;
        break;
      }
    }
  }
  // 行きたい方向が通路やもう通った場所か
  if(maze[x+1][y] == 1){
    maze[x][y] = 6;
    drawer.drawSquare(x, y);
    maze[x+1][y] = 5;
    drawer.drawSquare(x+1, y);
  }else if(maze[x+1][y] == 6){
    maze[x][y] = 1;
    drawer.drawSquare(x, y);
    maze[x+1][y] = 5;
    drawer.drawSquare(x+1, y);
  }
}
function arrowLeft(){
  let x, y;
  // キャラの位置を見つける
  for(let i=1;i<maze.length-1;i++){
    for(let j=1;j<maze.length-1;j++){
      if(maze[i][j] == 5){
        x = i;
        y = j;
        break;
      }
    }
  }
  // 行きたい方向が通路やもう通った場所か
  if(maze[x][y-1] == 1){
    maze[x][y] = 6;
    drawer.drawSquare(x, y);
    maze[x][y-1] = 5;
    drawer.drawSquare(x, y-1);
  }else if(maze[x][y-1] == 6){
    maze[x][y] = 1;
    drawer.drawSquare(x, y);
    maze[x][y-1] = 5;
    drawer.drawSquare(x, y-1);
  }
}
function arrowRight(){
  let x, y;
  // キャラの位置を見つける
  for(let i=1;i<maze.length-1;i++){
    for(let j=1;j<maze.length-1;j++){
      if(maze[i][j] == 5){
        x = i;
        y = j;
        break;
      }
    }
  }
  // 行きたい方向が通路やもう通った場所か
  if(maze[x][y+1] == 1){
    maze[x][y] = 6;
    drawer.drawSquare(x, y);
    maze[x][y+1] = 5;
    drawer.drawSquare(x, y+1);
  }else if(maze[x][y+1] == 6){
    maze[x][y] = 1;
    drawer.drawSquare(x, y);
    maze[x][y+1] = 5;
    drawer.drawSquare(x, y+1);
  }
}
