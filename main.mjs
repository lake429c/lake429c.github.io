
import {Drawer} from './drawer.mjs'
import {Tester} from './tester.mjs'
import {solveMaze} from './solver.mjs'


//// ジェネレータ ////

// 迷路の一辺のサイズ
const size = 400;

/*
  迷路のマスの状態
  0:壁（黒）
  1:通路（白）
  2:スタート（赤）
  3:ゴール（緑）
  4:最短路（青）
*/
let maze = new Array(size);
for(let i=0;i<size;i++){
  maze[i] = new Array(size).fill(0);
}
const drawer = new Drawer(maze);

// 周りを掘ることが可能な通路マス
let digables = [];
// 行き止まりのマス
let deadends = [];

// min以上max未満の整数乱数を得る関数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// (x,y)のdirection方向のマスが掘れる
// 0:左 1:右 2:上 3:下
function isDigable(x, y, direction){
  switch (direction) {
    case 0:
      if(y-1 != 0
        && maze[x][y-1] == 0
        && maze[x][y-2] == 0
        && maze[x-1][y-1] == 0
        && maze[x+1][y-1] == 0
      ) return true;
      break;
    case 1:
      if(y+1 != size-1
        && maze[x][y+1] == 0
        && maze[x][y+2] == 0
        && maze[x-1][y+1] == 0
        && maze[x+1][y+1] == 0
      ) return true;
      break;
    case 2:
      if(x-1 != 0
        && maze[x-1][y] == 0
        && maze[x-2][y] == 0
        && maze[x-1][y-1] == 0
        && maze[x-1][y+1] == 0
      ) return true;
      break;
    case 3:
      if(x+1 != size-1
        && maze[x+1][y] == 0
        && maze[x+2][y] == 0
        && maze[x+1][y-1] == 0
        && maze[x+1][y+1] == 0
      ) return true;
      break;
  }
  return false;
}

// (x,y)周りにまだ掘れるマスがある
function isDigableAround(x, y){
  for(let i=0;i<4;i++){
    if(isDigable(x, y, i)) return true;
  }
  return false;
}

// 通路マスでかつまだ掘れるものを保存する配列の更新
function updateDigables(){
  let tmp = [];
  for(let i=0;i<digables.length;i++){
    if(isDigableAround(digables[i][0],digables[i][1])){
      tmp.push([digables[i][0],digables[i][1]]);
    }
  }
  digables = tmp;
}

// 周りが掘れなくなるまで通路を伸ばす
function goForward(x, y){
  // 進む方向を決める
  let direction;
  do{
    direction = getRandomInt(0, 4);
  } while(!isDigable(x, y, direction));
  // 決めた方向に進む
  switch (direction) {
    case 0:
      y--;
      break;
    case 1:
      y++;
      break;
    case 2:
      x--;
      break;
    case 3:
      x++;
      break;
  }
  maze[x][y] = 1;
  drawer.drawSquare(x, y);

  if(isDigableAround(x,y)){
    digables.push([x,y]);
    //setTimeout(goForward, 0, x, y);
    goForward(x,y);
  }else{
    if(deadends.length < 2) deadends.push([x,y]);
    setTimeout(addSidePath, 0);
    //addSidePath();
  }
}

// 増やせなくなるまで脇道を増やす
function addSidePath(){
  updateDigables();
  // 周りを掘れるマスがなくなるまで通路を増やす
  if(digables.length != 0){
    // 掘り始める通路マスを決める
    let index = getRandomInt(0,digables.length);
    goForward(digables[index][0], digables[index][1]);
  }else{
    //スタートの設定
    let indexS = getRandomInt(0,deadends.length/2);
    maze[deadends[indexS][0]][deadends[indexS][1]] = 2;
    drawer.drawSquare(deadends[indexS][0], deadends[indexS][1]);
    // ゴールの設定
    let indexG = getRandomInt(deadends.length/2,deadends.length);
    maze[deadends[indexG][0]][deadends[indexG][1]] = 3;
    drawer.drawSquare(deadends[indexG][0], deadends[indexG][1]);

    //  テストを実行してみて，問題なければ
    // ボタンにクリックイベントを紐づけ
    const tester = new Tester(maze);
    if(tester.test()){
      console.log("Jenerated");
      let solveEle = document.getElementById('solveBt');
      solveEle.onclick = onSolveClick;
    }else{
      console.log("Sorry. Please reload this page.");
    }
  }
}

// 穴掘り法で迷路を生成する関数
function jenerateMaze() {
  console.log("Jenerating...");
  drawer.drawMaze();
  // 最初に一マス穴開ける
  let x = getRandomInt(1,size-1), y = getRandomInt(1,size-1);
  maze[x][y] = 1;
  drawer.drawSquare(x, y);
  digables.push([x,y]);
  // 穴を掘り始める
  addSidePath();
}

// solveボタンの実装
function onSolveClick(){
  solveMaze(maze);
  drawer.drawMaze();
}

export {jenerateMaze}
