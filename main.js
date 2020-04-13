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
