import {Drawer} from './drawer.mjs'
import {Jenerator} from './jenerator.mjs'
import {Solver} from './solver.mjs'


// 迷路の一辺のサイズ
const size = 400;
// 迷路の状態を格納する正方形の二次元配列
let maze = new Array(size);
for(let i=0;i<size;i++){
  maze[i] = new Array(size).fill(0);
}

const drawer = new Drawer(maze, 'maze_canvas');
const jenerator = new Jenerator(maze);
const solver = new Solver(maze);

// 迷路を生成
jenerator.jenerateMaze();
drawer.drawMaze();

// ボタンにクリックイベントをつける
document.getElementById('solveBt').onclick = function(){
  solver.solveMaze();
  drawer.drawMaze();
}
