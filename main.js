import {Drawer} from './module/drawer.mjs'
import {Jenerator} from './module/jenerator.mjs'
import {Tester} from './module/tester.mjs'
import {Solver} from './module/solver.mjs'
import {Arrows} from './module/arrows.mjs'

let maze = new Vue({
  data: {
    charaX: 0,
    charaY: 0,
    size: 30,
    map: [],
    score: 0
  },
  methods: {
    init: function() {
      this.map = new Array(this.size);
      for(let i=0;i<this.size;i++){
        this.map[i] = new Array(this.size).fill('wall');
      }
    },
    jenerate: function() {
      // 迷路を初期化
      this.init();
      // 迷路を生成
      const jenerator = new Jenerator(this);
      jenerator.jenerateMaze();
      // 迷路を描画
      const drawer = new Drawer(this, 'maze_canvas');
      drawer.drawMaze();
      contents.ready();
    },
    reachGoal: function() {
      contents.seen = false;
      contents.goalFlg = true;
      contents.solveFlg = true;
      contents.score = 100;
    }
  }
})

let inputMazeSize = new Vue({
  el: '#inputMazeSize',
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
  },
  methods: {
    jenerateClick: function(){
      // 入力された迷路のサイズが不正な場合何もしない
      if(this.error.require || this.error.tooSmall || this.error.tooLarge){
        return;
      }
      // 迷路の一辺のサイズ
      maze.size = parseInt(this.value, 10);
      //
      maze.jenerate();
    }
  }
})

let contents = new Vue({
  el: '#contents',
  data: {
    seen: false,
    goalFlg: false,
    solveFlg: false,
    score: 0
  },
  methods: {
    // 迷路が生成されたら矢印ボタンやsolveボタンを表示
    ready: function(){
      this.seen = true;
      this.goalFlg = false;
      this.solveFlg = false;
    },
    // solveボタンの実装
    solveClick: function() {
      if(this.goalFlg) return;
      const solver = new Solver(maze);
      solver.solveMaze();
      const drawer = new Drawer(maze, 'maze_canvas');
      drawer.drawMaze();
      this.seen = false;
      this.solveFlg = true;
      this.score = maze.score;
    },
    // 矢印ボタンの実装
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

// 矢印キーの実装
let arrows = new Arrows(maze);
document.addEventListener('keydown', (event) => {
  if(!contents.seen) return;
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
