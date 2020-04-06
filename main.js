'use strict';

// min以上max未満の整数乱数を得る関数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//// 描画 ////

// 迷路の一辺のサイズ
const size = 400;
// 一マスの一辺のサイズ
const rect_size = 5;

/*
  迷路のマスの状態
  0:壁（黒）
  1:通路（白）
  2:スタート（赤）
  3:ゴール（緑）
  4:最短路（青）
*/
let maze = [];
// 壁で埋める
for(let i=0;i<size;i++){
  let tmp = [];
  for(let j=0;j<size;j++){
    tmp.push(0);
  }
  maze.push(tmp);
}

function setMazeColor(x, y){
  const canvas = document.getElementById('maze_canvas');
  const ctx = canvas.getContext("2d");
  // マスの色の決定
  switch (maze[x][y]) {
    case 0:
      ctx.fillStyle = "rgb(0,0,0)";
      break;
    case 1:
      ctx.fillStyle = "rgb(255,255,255)";
      break;
    case 2:
      ctx.fillStyle = "rgb(255,0,0)";
      break;
    case 3:
      ctx.fillStyle = "rgb(0,255,0)";
      break;
    case 4:
      ctx.fillStyle = "rgb(0,100,255)";
      break;
  }
  // マスの描画
  ctx.fillRect(y*rect_size, x*rect_size, rect_size-1, rect_size-1);
}

// 迷路を描画する関数
function drawMaze(){
  for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
      setMazeColor(i, j);
    }
  }
}

//// ジェネレータ ////

let digables = [];
let deadends = [];

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

// 一歩進む
function goForward(x, y){

  let direction = getRandomInt(0, 4);

  // 行く方向を確認して決める
  while(!isDigable(x, y, direction)){
    direction = getRandomInt(0, 4);
  }
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
  setMazeColor(x, y);

  if(isDigableAround(x,y)){
    digables.push([x,y]);
    //setTimeout(goForward, 0, x, y);
    goForward(x,y);
  }else{
    deadends.push([x,y]);
    setTimeout(addStartingPoint, 0);
  }
}

// 穴掘り法
function addStartingPoint(){

  updateDigables();
  if(digables.length != 0){
    // 掘り始める通路マスを決める
    let index = getRandomInt(0,digables.length);
    goForward(digables[index][0], digables[index][1]);
  }else{
    //スタートの設定
    let indexS = getRandomInt(0,deadends.length/2);
    maze[deadends[indexS][0]][deadends[indexS][1]] = 2;
    setMazeColor(deadends[indexS][0], deadends[indexS][1]);
    // ゴールの設定
    let indexG = getRandomInt(deadends.length/2,deadends.length);
    maze[deadends[indexG][0]][deadends[indexG][1]] = 3;
    setMazeColor(deadends[indexG][0], deadends[indexG][1]);

    console.log("Jenerated");
    // ボタンにクリックイベントを紐づけ
    let solveEle = document.getElementById('solveBt');
    solveEle.onclick = onSolveClick;
  }
}

// 穴掘り法で迷路を生成する関数
function jenerateMaze() {
  const canvas = document.getElementById('maze_canvas');
  const ctx = canvas.getContext("2d");
  // キャンバスの大きさの決定
  canvas.width = (size+1)*rect_size;
  canvas.height = (size+1)*rect_size;
  drawMaze();
  // 最初に一マス穴開ける
  let x = getRandomInt(1,size-1), y = getRandomInt(1,size-1);
  maze[x][y] = 1;
  setMazeColor(x, y);
  digables.push([x,y]);
  // 穴を掘り始める
  addStartingPoint();
}

jenerateMaze();

//// テスター ////

/*
0:壁 1~:未探索通路 ~-1:探索済み通路
*/
let testMaze;

function checkLoop(x, y){
  let loopFlag = false;
  let cnt = 0;
  // 自身を探索済みに
  testMaze[x][y] = -1;
  if(y-1 != 0 && testMaze[x][y-1] >= 1){
    loopFlag = checkLoop(x, y-1);
  }else if(testMaze[x][y-1] == -1){
    cnt++;
  }
  if(y+1 != size-1 && testMaze[x][y+1] >= 1){
    loopFlag = checkLoop(x, y+1);
  }else if(testMaze[x][y+1] == -1){
    cnt++;
  }
  if(x-1 != 0 && testMaze[x-1][y] >= 1){
    loopFlag = checkLoop(x-1, y);
  }else if(testMaze[x-1][y] == -1){
    cnt++;
  }
  if(x+1 != size-1 && testMaze[x+1][y] >= 1){
    loopFlag = checkLoop(x+1, y);
  }else if(testMaze[x+1][y] == -1){
    cnt++;
  }
  // 後ろ以外に探索済みの通路に当たったらループになっている
  if(cnt > 1) return true;
  return loopFlag;
}

function checkClosed(){
  for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
      // ループチェックをした後，探索していない通路が残っていたら閉じた領域ができている
      if(testMaze[i][j] == 1) return true;
    }
  }
  return false;
}

// 通路の幅が1マスであることの確認
// 自身と左上・右上・左下・右下を対角とするそれぞれの四角の中ですべてが通路マスのものがあれば通路幅が1マスでない
function checkWidth(x, y){
  let widthFlag = true;
  // 自身を探索済みに
  testMaze[x][y] = -2;
  if(testMaze[x][y-1] == -1 && testMaze[x-1][y-1] == -1 && testMaze[x-1][y] == -1){
    return false;
  }
  if(testMaze[x][y+1] == -1 && testMaze[x-1][y+1] == -1 && testMaze[x-1][y] == -1){
    return false;
  }
  if(testMaze[x][y-1] == -1 && testMaze[x+1][y-1] == -1 && testMaze[x+1][y] == -1){
    return false;
  }
  if(testMaze[x][y+1] == -1 && testMaze[x+1][y+1] == -1 && testMaze[x+1][y] == -1){
    return false;
  }
  if(y-1 != 0 && testMaze[x][y-1] == -1){
    widthFlag = checkWidth(x, y-1);
  }
  if(y+1 != size-1 && testMaze[x][y+1] == -1){
    widthFlag = checkWidth(x, y+1);
  }
  if(x-1 != 0 && testMaze[x-1][y] == -1){
    widthFlag = checkWidth(x-1, y);
  }
  if(x+1 != size-1 && testMaze[x+1][y] == -1){
    widthFlag = checkWidth(x+1, y);
  }
  return widthFlag;
}

function test(){
  // テスト用にディープコピー
  testMaze = JSON.parse(JSON.stringify(maze));
  let checkStart;
  for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
      if(testMaze[i][j] == 1){
        checkStart = [i, j];
        break;
      }
    }
  }
  if(checkLoop(checkStart[0], checkStart[1])) console.log("Loop exist");
  else if(checkClosed()) console.log("Closed area exist");
  else if(!checkWidth(checkStart[0], checkStart[1])) console.log("Large path exist");
  else console.log("No problem");
}

//// ソルバー ////

// 幅優先探索で迷路を解く
function solveMaze(){

  // 幅優先探索のキュー
  let que = [];
  // 探索済みフラグ
  let checked = [];
  // スタートからの距離
  let dist = [];
  // 初期化
  for(let i=0;i<size;i++){
    let tmp = [];
    for(let j=0;j<size;j++){
      tmp.push(false);
    }
    checked.push(tmp);
  }
  for(let i=0;i<size;i++){
    let tmp = [];
    for(let j=0;j<size;j++){
      tmp.push(size*size);
    }
    dist.push(tmp);
  }

  let x, y;
  let cnt = 0;

  // スタート地点を探す
  for(let i=1;i<size-1;i++){
    for(let j=1;j<size-1;j++){
      if(maze[i][j] == 2){
        x = i;
        y = j;
        que.push([x,y]);
        dist[x][y] = 0;
      }
    }
  }
  // ゴールを探して進む
  while(maze[x][y] != 3){
    if(maze[x-1][y] != 0 && checked[x-1][y] == false){
      que.push([x-1,y]);
    }else if(checked[x-1][y] == true){
      dist[x][y] = dist[x-1][y]+1;
    }
    if(maze[x+1][y] != 0 && checked[x+1][y] == false){
      que.push([x+1,y]);
    }else if(checked[x+1][y] == true){
      dist[x][y] = dist[x+1][y]+1;
    }
    if(maze[x][y-1] != 0 && checked[x][y-1] == false){
      que.push([x,y-1]);
    }else if(checked[x][y-1] == true){
      dist[x][y] = dist[x][y-1]+1;
    }
    if(maze[x][y+1] != 0 && checked[x][y+1] == false){
      que.push([x,y+1]);
    }else if(checked[x][y+1] == true){
      dist[x][y] = dist[x][y+1]+1;
    }
    checked[x][y] = true;
    cnt++;
    x = que[cnt][0], y = que[cnt][1];
  }
  // ゴールから最短路をたどる
  while(maze[x][y] != 2){
    if(maze[x-1][y] != 0 && dist[x-1][y] < dist[x][y]){
      x--;
    }
    else if(maze[x+1][y] != 0 && dist[x+1][y] < dist[x][y]){
      x++;
    }
    else if(maze[x][y-1] != 0 && dist[x][y-1] < dist[x][y]){
      y--;
    }
    else if(maze[x][y+1] != 0 && dist[x][y+1] < dist[x][y]){
      y++;
    }
    if(maze[x][y] != 2){
      maze[x][y] = 4;
    }
  }
  drawMaze();
  console.log("Solved!");
}

// solveボタンの実装
function onSolveClick(){
  test();
  solveMaze();
}
