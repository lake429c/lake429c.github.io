import {Drawer} from './module/drawer.mjs'
import {Jenerator} from './module/jenerator.mjs'
import {Tester} from './module/tester.mjs'
import {Solver} from './module/solver.mjs'
import {Arrows} from './module/arrows.mjs'


let maze = {
  charaX: 0,
  charaY: 0,
  size: 30,
  map: []
};

let inputMazeSize = new Vue({
  el: '#mazeSize',
  watch: {
    size: function(newVal, oldVal) {
      this.error.require = (newVal.length < 1) ? true : false;
      this.error.tooSmall = (newVal.length > 0 && newVal < 5) ? true : false;
      this.error.tooLarge = (newVal > 500) ? true : false;
    }
  },
  data: {
    size: 30,
    error: {
      require: false,
      tooSmall: false,
      tooLarge: false
    }
  }
})

let arsl = new Vue({
  el: '#arrows',
  data: {
    seen: false
  },
  methods: {
    change: function(event){
      this.seen = true
    }
  }
})

// Jenerateボタンが押されたら，フォームの数値を大きさとして迷路を生成する
document.getElementById('jenBt').onclick = function(){

  // 入力された迷路のサイズが不正な場合何もしない
  if(inputMazeSize.error.require || inputMazeSize.error.tooSmall || inputMazeSize.error.tooLarge){
    return;
  }
  // 迷路の一辺のサイズ
  let inputMsg = inputMazeSize.size;
  maze.size = parseInt(inputMsg, 10);
  // 迷路の状態を格納する正方形の二次元配列
  maze.map = new Array(maze.size);
  for(let i=0;i<maze.size;i++){
    maze.map[i] = new Array(maze.size).fill('wall');
  }


  const jenerator = new Jenerator(maze);
  // 迷路を生成
  jenerator.jenerateMaze();

  // スタート地点を探す
  for(let i=1;i<maze.size-1;i++){
    for(let j=1;j<maze.size-1;j++){
      if(maze.map[i][j] == 'start'){
        // スタートの隣の通路にキャラを配置
        maze.charaX = i;
        maze.charaY = j;
        if(maze.map[i-1][j] == 'path'){
          maze.charaX--;
        }else if(maze.map[i+1][j] == 'path'){
          maze.charaX++;
        }else if(maze.map[i][j-1] == 'path'){
          maze.charaY--;
        }else if(maze.map[i][j+1] == 'path'){
          maze.charaY++;
        }
      }
    }
  }
  maze.map[maze.charaX][maze.charaY] = 'chara';

  const drawer = new Drawer(maze, 'maze_canvas');
  drawer.drawMaze();
  arsl.change();
}

// solveボタンが押されたら最短路を表示する
document.getElementById('solveBt').onclick = function(){
  const solver = new Solver(maze);
  solver.solveMaze();
  const drawer = new Drawer(maze, 'maze_canvas');
  drawer.drawMaze();
}

// 矢印ボタンが押されたらキャラを動かす
const arrows = new Arrows(maze);
document.getElementById('ArrowUp').onclick = arrows.arrowUp;
document.getElementById('ArrowDown').onclick = arrows.arrowDown;
document.getElementById('ArrowLeft').onclick = arrows.arrowLeft;
document.getElementById('ArrowRight').onclick = arrows.arrowRight;

// 矢印キーも矢印ボタンと同様
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case "ArrowUp":
      arrows.arrowUp();
      break;
    case "ArrowDown":
      arrows.arrowDown();
      break;
    case "ArrowLeft":
      arrows.arrowLeft();
      break;
    case "ArrowRight":
      arrows.arrowRight();
      break;
  }
});
