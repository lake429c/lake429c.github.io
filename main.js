'use strict';

// min以上max未満の乱数を得る関数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//// コモン ////

// 迷路の一辺のサイズ
const size = 40;

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

// 迷路を描画する関数
function drawMase(){
  const canvas = document.getElementById('maze_canvas');
  const ctx = canvas.getContext("2d");

  // 一マスの一辺のサイズ
  const rect_size = 10;
  // キャンバスの大きさの決定
  canvas.width = (size+1)*rect_size;
  canvas.height = (size+1)*rect_size;

  for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
      // マスの色の決定
      switch (maze[i][j]) {
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
      ctx.fillRect(j*rect_size, i*rect_size, rect_size-1, rect_size-1);
    }
  }
}

drawMase();

//// ジェネレータ ////

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
      maze[x][y-1] = 1;
      y--;
      break;
    case 1:
      maze[x][y+1] = 1;
      y++;
      break;
    case 2:
      maze[x-1][y] = 1;
      x--;
      break;
    case 3:
      maze[x+1][y] = 1;
      x++;
      break;
  }
  drawMase();
  //if(isDigableAround(x,y)) setTimeout(goForward, 0, x, y);
  //else setTimeout(jenerateMaze, 0);
  if(isDigableAround(x,y)) goForward(x, y);
  else jenerateMaze();
}

// 掘り終わった判定
// どの通路マスも周りが掘れないなら終了
function isDone(){
  let cnt = 0;
  for(let i=1;i<size-1;i++){
    for(let j=1;j<size-1;j++){
      if(maze[i][j] != 0 && isDigableAround(i,j)) {
        return false;
      }
    }
  }
  return true;
}

// 行き止まり判定
function isDeadEnd(x, y){
  let cnt = 0;
  if(maze[x-1][y] == 0) cnt++;
  if(maze[x+1][y] == 0) cnt++;
  if(maze[x][y-1] == 0) cnt++;
  if(maze[x][y+1] == 0) cnt++;
  if(cnt == 3) return true;
  return false;
}

// 穴掘り法
function jenerateMaze(){

  let x = getRandomInt(1, size-1), y = getRandomInt(1, size-1);

  if(!isDone()){
    // 掘り始める通路マスを決める
    while(!(maze[x][y] == 1 && isDigableAround(x,y))){
      x = getRandomInt(1,size-1);
      y = getRandomInt(1,size-1);
    }
    goForward(x, y);
  }else{
    //スタートの設定
    while(!(maze[x][y] == 1 && isDeadEnd(x, y))){
      x = getRandomInt(1,size);
      y = getRandomInt(1,size);
    }
    maze[x][y] = 2;
    // ゴールの設定
    while(!(maze[x][y] == 1 && isDeadEnd(x, y))){
      x = getRandomInt(1,size);
      y = getRandomInt(1,size);
    }
    maze[x][y] = 3;

    drawMase();
    console.log("Jenerated");
    // ボタンにクリックイベントを紐づけ
    let solveEle = document.getElementById('solveBt');
    solveEle.onclick = onSolveClick;
  }
}

// 最初に一マス穴開ける
maze[getRandomInt(1,size-1)][getRandomInt(1,size-1)] = 1;
jenerateMaze();

//// ソルバー ////

// 幅優先探索のキュー
let que = [];
// 探索済みフラグ
let checked = [];
for(let i=0;i<size;i++){
  let tmp = [];
  for(let j=0;j<size;j++){
    tmp.push(false);
  }
  checked.push(tmp);
}
// スタートからの距離
let dist = [];
for(let i=0;i<size;i++){
  let tmp = [];
  for(let j=0;j<size;j++){
    tmp.push(size*size);
  }
  dist.push(tmp);
}

// 幅優先探索で迷路を解く
function solveMaze(){

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
    if(maze[x][y] != 2) maze[x][y] = 4;
  }
  drawMase();
  console.log("Solved!");
}

// solveボタンの実装
function onSolveClick(){
  solveMaze();
}
