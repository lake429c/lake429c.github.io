import {Drawer} from './module/drawer.mjs'
import {Jenerator} from './module/jenerator.mjs'
import {Tester} from './module/tester.mjs'
import {Solver} from './module/solver.mjs'
import {Arrows} from './module/arrows.mjs'

let maze = new Vue({
  el: '#mazeMsg',
  data: {
    charaX: 0,
    charaY: 0,
    size: 30,
    map: [],
    score: 0
  },
  methods: {
    change: function(){
      contents.able = false;
      contents.goalFlg = true;
      contents.scoreFlg = true;
      contents.message = 100;
    }
  }
})

let inputMazeSize = new Vue({
  el: '#mazeSize',
  watch: {
    value: function(newVal, oldVal) {
      this.error.require = (newVal.length < 1) ? true : false;
      this.error.tooSmall = (newVal.length > 0 && newVal < 10) ? true : false;
      this.error.tooLarge = (newVal > 500) ? true : false;
    }
  },
  data: {
    value: 30,
    error: {
      require: false,
      tooSmall: false,
      tooLarge: false
    }
  }
})

let arrows;
let contents = new Vue({
  el: '#contents',
  data: {
    seen: false,
    able: false,
    goalFlg: false,
    scoreFlg: false,
    message: 0
  },
  methods: {
    change: function(){
      this.seen = true;
      this.able = true;
      this.goalFlg = false;
      this.scoreFlg = false;
    },
    // 矢印ボタンが押されたらキャラを動かす
    arrowUp: function(){
      arrows.arrowUp();
    },
    arrowLeft: function(){
      arrows.arrowLeft();
    },
    arrowRight: function(){
      arrows.arrowRight();
    },
    arrowDown: function(){
      arrows.arrowDown();
    }
  }
})

function toHankaku(str) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

// Jenerateボタンが押されたら，フォームの数値を大きさとして迷路を生成する
document.getElementById('jenBt').onclick = function(){

  // 入力された迷路のサイズが不正な場合何もしない
  if(inputMazeSize.error.require || inputMazeSize.error.tooSmall || inputMazeSize.error.tooLarge){
    return;
  }
  // 迷路の一辺のサイズ
  let inputMsg = inputMazeSize.value;
  //inputMsg =  toHankaku(inputMsg);
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
  contents.change();

}

// solveボタンが押されたら最短路を表示する
document.getElementById('solveBt').onclick = function(){
  if(contents.goalFlg){
    return;
  }
  const solver = new Solver(maze);
  solver.solveMaze();
  const drawer = new Drawer(maze, 'maze_canvas');
  drawer.drawMaze();
  contents.able = false;
  contents.scoreFlg = true;
  contents.message = maze.score;
}

// 矢印キーも矢印ボタンと同様
arrows = new Arrows(maze);
document.addEventListener('keydown', (event) => {
  if(!contents.able){
    return;
  }
  console.log(event.key);
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
