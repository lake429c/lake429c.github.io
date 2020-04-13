import {Drawer} from './module/drawer.mjs'
import {Jenerator} from './module/jenerator.mjs'
import {Tester} from './module/tester.mjs'
import {Solver} from './module/solver.mjs'


// 迷路の一辺のサイズ
const size = 100;
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
//var canvasW = 400; // canvas要素の横幅(px)
//var canvasH = 400; // canvas要素の縦幅(px)
let mouseX; // 最後にクリックされた位置のx座標
let mouseY; // 最後にクリックされた位置のy座標
let rect_size = 8;

function click_maze(e) {

  // クリック位置の座標計算（canvasの左上を基準）
  let rect = e.target.getBoundingClientRect();
  mouseX = e.clientX - Math.floor(rect.left);
  mouseY = e.clientY - Math.floor(rect.top);

  // クリック位置のマスを塗る
  let y = Math.floor(mouseX/rect_size);
  let x = Math.floor(mouseY/rect_size);
  if(maze[x][y] == 1){
    maze[x][y] = 5;
  }else if(maze[x][y] == 5){
    maze[x][y] = 1;
  }
  drawer.drawSquare(x, y);

}
//window.onload = click_maze();
canvas.addEventListener('click', click_maze, false);
