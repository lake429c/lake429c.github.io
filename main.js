import {Drawer} from './module/drawer.mjs'
import {Jenerator} from './module/jenerator.mjs'
import {Tester} from './module/tester.mjs'
import {Solver} from './module/solver.mjs'


// 迷路の一辺のサイズ
const size = 50;
// 迷路の状態を格納する正方形の二次元配列
let maze = new Array(size);
for(let i=0;i<size;i++){
  maze[i] = new Array(size).fill(0);
}

const drawer = new Drawer(maze, 'maze_canvas');
const jenerator = new Jenerator(maze);

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


let canvas = document.getElementById('maze_canvas'); // canvas要素(HTMLCanvasElement)
let ctx; // 2Dコンテキスト(CanvasRenderingContext2D)
let mouseX; // 最後にクリックされた位置のx座標
let mouseY; // 最後にクリックされた位置のy座標
let rect_size = 10;

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

function click_maze(e) {

  // クリック位置の座標計算（canvasの左上を基準）
  let rect = e.target.getBoundingClientRect();
  mouseX = e.clientX - Math.floor(rect.left);
  mouseY = e.clientY - Math.floor(rect.top);

  // クリック位置のマスを塗る
  let y = Math.floor(mouseX/rect_size);
  let x = Math.floor(mouseY/rect_size);

  // クリックされたマスはキャラの隣か
  let nearby_chara = false;
  if(maze[x-1][y] == 5){
    nearby_chara = true;
    if(maze[x][y] == 1){
      maze[x][y] = 5;
      drawer.drawSquare(x, y);
      maze[x-1][y] = 6;
      drawer.drawSquare(x-1, y);
    }else if(maze[x][y] == 6){
      maze[x][y] = 5;
      drawer.drawSquare(x, y);
      maze[x-1][y] = 1;
      drawer.drawSquare(x-1, y);
    }
  }else if(maze[x+1][y] == 5){
    nearby_chara = true;
    if(maze[x][y] == 1){
      maze[x][y] = 5;
      drawer.drawSquare(x, y);
      maze[x+1][y] = 6;
      drawer.drawSquare(x+1, y);
    }else if(maze[x][y] == 6){
      maze[x][y] = 5;
      drawer.drawSquare(x, y);
      maze[x+1][y] = 1;
      drawer.drawSquare(x+1, y);
    }
  }else if(maze[x][y-1] == 5){
    nearby_chara = true;
    if(maze[x][y] == 1){
      maze[x][y] = 5;
      drawer.drawSquare(x, y);
      maze[x][y-1] = 6;
      drawer.drawSquare(x, y-1);
    }else if(maze[x][y] == 6){
      maze[x][y] = 5;
      drawer.drawSquare(x, y);
      maze[x][y-1] = 1;
      drawer.drawSquare(x, y-1);
    }
  }else if(maze[x][y+1] == 5){
    nearby_chara = true;
    if(maze[x][y] == 1){
      maze[x][y] = 5;
      drawer.drawSquare(x, y);
      maze[x][y+1] = 6;
      drawer.drawSquare(x, y+1);
    }else if(maze[x][y] == 6){
      maze[x][y] = 5;
      drawer.drawSquare(x, y);
      maze[x][y+1] = 1;
      drawer.drawSquare(x, y+1);
    }
  }

}
//window.onload = click_maze();
canvas.addEventListener('click', click_maze, false);
