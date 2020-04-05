'use strict';

// 迷路の一辺のサイズ
const size = 100;

/*
  迷路のマスの状態
  0:壁（黒）
  1:通路（白）
  2:スタート（赤）
  3:ゴール（緑）
*/
let maze = [];
// 壁で埋める
for(let i=0;i<size;i++){
  let tmp = [];
  for(let j=0;j<size;j++){
    /*
    if(i == 0 || i == size-1 || j == 0 || j == size-1){
      tmp.push(1)
    }else{
      tmp.push(0);
    }
    */
    tmp.push(0);
  }
  maze.push(tmp);
}

// 迷路を描画する関数
function drawMase(){
  const canvas = document.getElementById('maze_canvas');
  const ctx = canvas.getContext("2d");

  const rect_size = 10;
  canvas.width = (size+1)*rect_size;
  canvas.height = (size+1)*rect_size;

  // 格子の描画
  /*
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgb(200,200,200)";
  ctx.beginPath();
  for(let i=0;i<size+1;i++){
    ctx.moveTo(i*rect_size+1, 0);
    ctx.lineTo(i*rect_size+1, size*rect_size+2);
    ctx.moveTo(0, i*rect_size+1);
    ctx.lineTo(size*rect_size+2, i*rect_size+1);
  }
  ctx.stroke();
  */

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
        default:
          ctx.fillStyle = "rgb(0,0,255)";
          break;
      }
      // マスの描画
      ctx.fillRect(j*rect_size, i*rect_size, rect_size, rect_size);
    }
  }

}

drawMase();

// 乱数を得る関数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// ランダムな奇数を得る関数
function getRandomOdd(min, max){
  return getRandomInt(0, (max-1)/2) * 2 + 1;
}

// どの方向にも進めない
function isNotDigable(x, y){
  let flg = true;
  /*
  if(maze[x][y-1] == 0 && maze[x][y-2] == 0) flg = false;
  if(maze[x][y+1] == 0 && maze[x][y+2] == 0) flg = false;
  if(maze[x-1][y] == 0 && maze[x-2][y] == 0) flg = false;
  if(maze[x+1][y] == 0 && maze[x+2][y] == 0) flg = false;
  */
  if(maze[x][y-1] == 0 && y-1 != 0 && maze[x][y-2] == 0 && maze[x-1][y-1] == 0 && maze[x+1][y-1] == 0) flg = false;
  if(maze[x][y+1] == 0 && y+1 != size-1 && maze[x][y+2] == 0 && maze[x-1][y+1] == 0 && maze[x+1][y+1] == 0) flg = false;
  if(maze[x-1][y] == 0 && x-1 != 0 && maze[x-2][y] == 0 && maze[x-1][y-1] == 0 && maze[x-1][y+1] == 0) flg = false;
  if(maze[x+1][y] == 0 && x+1 != size-1 && maze[x+2][y] == 0 && maze[x+1][y-1] == 0 && maze[x+1][y+1] == 0) flg = false;
  return flg;
}

// 一歩進む
function goForward(x, y){
  let direct;
  let flg = true;
  // 行く方向を確認して決める
  while(flg){
    direct = getRandomInt(0, 4);
    /*
    switch (direct) {
      case 0:
        if(maze[x][y-1] == 0 && maze[x][y-2] == 0) flg = false;
        break;
      case 1:
        if(maze[x][y+1] == 0 && maze[x][y+2] == 0) flg = false;
        break;
      case 2:
        if(maze[x-1][y] == 0 && maze[x-2][y] == 0) flg = false;
        break;
      case 3:
        if(maze[x+1][y] == 0 && maze[x+2][y] == 0) flg = false;
        break;
      default:
        break;
    }
    */
    switch (direct) {
      case 0:
        if(maze[x][y-1] == 0 && y-1 != 0 && maze[x][y-2] == 0 && maze[x-1][y-1] == 0 && maze[x+1][y-1] == 0) flg = false;
        break;
      case 1:
        if(maze[x][y+1] == 0 && y+1 != size-1 && maze[x][y+2] == 0 && maze[x-1][y+1] == 0 && maze[x+1][y+1] == 0) flg = false;
        break;
      case 2:
        if(maze[x-1][y] == 0 && x-1 != 0 && maze[x-2][y] == 0 && maze[x-1][y-1] == 0 && maze[x-1][y+1] == 0) flg = false;
        break;
      case 3:
        if(maze[x+1][y] == 0 && x+1 != size-1 && maze[x+2][y] == 0 && maze[x+1][y-1] == 0 && maze[x+1][y+1] == 0) flg = false;
        break;
      default:
        break;
    }
  }
  // 決めた方向に進む
  switch (direct) {
    //上
    case 0:
      maze[x][y-1] = 1;
      //maze[x][y-2] = 1;
      //y -= 2;
      y--;
      break;
    //下
    case 1:
      maze[x][y+1] = 1;
      //maze[x][y+2] = 1;
      //y += 2;
      y++;
      break;
    //左
    case 2:
      maze[x-1][y] = 1;
      //maze[x-2][y] = 1;
      //x -= 2;
      x--;
      break;
    //右
    case 3:
      maze[x+1][y] = 1;
      //maze[x+2][y] = 1;
      //x += 2;
      x++;
      break;
    default:
      break;
  }
  drawMase();
  if(!isNotDigable(x,y)) setTimeout(goForward, 0, x, y);
  else setTimeout(jenerateMaze, 0);
}

// 掘り終わった判定関数
function isDone(){
  let cnt = 0;
  /*
  for(let i=0;i<(size-1)/2;i++){
    for(let j=0;j<(size-1)/2;j++){
      if(maze[i*2+1][j*2+1] == 0) return false;
    }
  }
  */
  for(let i=1;i<size-1;i++){
    for(let j=1;j<size-1;j++){
      if(maze[i][j] != 0 && !isNotDigable(i,j)) {
        return false;
      }
    }
  }
  return true;
}

// 最初に一マス穴開ける
//maze[getRandomOdd(0,size)][getRandomOdd(0,size)] = 1;
maze[getRandomInt(1,size-1)][getRandomInt(1,size-1)] = 1;

let que = [];
let checked = [];
for(let i=0;i<size;i++){
  let tmp = [];
  for(let j=0;j<size;j++){
    tmp.push(false);
  }
  checked.push(tmp);
}
let dist = [];
for(let i=0;i<size;i++){
  let tmp = [];
  for(let j=0;j<size;j++){
    tmp.push(size*size);
  }
  dist.push(tmp);
}
let start = [];
let goal = [];

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

  let flg = true;
  let x, y;
  while(flg && !isDone()){
    // 掘り始める通路マスを決める
    //x = getRandomOdd(0,size);
    //y = getRandomOdd(0,size);
    x = getRandomInt(1,size-1);
    y = getRandomInt(1,size-1);
    if(!isNotDigable(x,y) && maze[x][y] == 1) flg = false;
  }
  console.log(x);
  console.log(y);

  if(!isDone()){
    goForward(x, y);
  }else{
    //もう掘るとこなくなったら，外周を壁にする
    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        if(i == 0 || i == size-1 || j == 0 || j == size-1){
          maze[i][j] = 0;
        }
      }
    }
    //スタートとゴールの設定
    let flg = true;
    while(flg){
      let x = getRandomInt(1,size);
      let y = getRandomInt(1,size);
      if(maze[x][y] == 1 && isDeadEnd(x, y)){
        maze[x][y] = 2;
        start.push(x);
        start.push(y);
        que.push([x,y]);
        dist[x][y] = 0;
        flg = false;
      }
    }
    flg = true;
    while(flg){
      let x = getRandomInt(1,size);
      let y = getRandomInt(1,size);
      if(maze[x][y] == 1 && isDeadEnd(x, y)){
        maze[x][y] = 3;
        goal.push(x);
        goal.push(y);
        flg = false;
      }
    }
    drawMase();
    console.log("Done");
  }
}

jenerateMaze();

function solveMaze(){
  let cnt = 0;
  while(que[cnt][0] != goal[0] || que[cnt][1] != goal[1]){
    let x = que[cnt][0], y = que[cnt][1];
    let min = dist[x][y];
    if(maze[x-1][y] != 0 && checked[x-1][y] == false){
      que.push([x-1,y]);
    }else if(maze[x-1][y] != 0 && checked[x-1][y] == true){
      if(dist[x-1][y] < min) min = dist[x-1][y];
    }
    if(maze[x+1][y] != 0 && checked[x+1][y] == false){
      que.push([x+1,y]);
    }else if(maze[x+1][y] != 0 && checked[x+1][y] == true){
      if(dist[x+1][y] < min) min = dist[x+1][y];
    }
    if(maze[x][y-1] != 0 && checked[x][y-1] == false){
      que.push([x,y-1]);
    }else if(maze[x][y-1] != 0 && checked[x][y-1] == true){
      if(dist[x][y-1] < min) min = dist[x][y-1];
    }
    if(maze[x][y+1] != 0 && checked[x][y+1] == false){
      que.push([x,y+1]);
    }else if(maze[x][y+1] != 0 && checked[x][y+1] == true){
      if(dist[x][y+1] < min) min = dist[x][y+1];
    }
    dist[x][y] = min+1;
    checked[x][y] = true;
    console.log(que[cnt] + "," + dist[x][y]);
    cnt++;
  }
  drawMase();
  // ゴールから最短路をたどる
  let flg = true;
  let x = goal[0], y = goal[1];
  while(flg){
    let min = size*size;
    let tmp_x, tmp_y;
    if(maze[x-1][y] != 0 && dist[x-1][y] < min){
      min = dist[x-1][y];
      tmp_x = x-1;
      tmp_y = y;
    }
    if(maze[x+1][y] != 0 && dist[x+1][y] < min){
      min = dist[x+1][y];
      tmp_x = x+1;
      tmp_y = y;
    }
    if(maze[x][y-1] != 0 && dist[x][y-1] < min){
      min = dist[x][y-1];
      tmp_x = x;
      tmp_y = y-1;
    }
    if(maze[x][y+1] != 0 && dist[x][y+1] < min){
      min = dist[x][y+1];
      tmp_x = x;
      tmp_y = y+1;
    }
    x = tmp_x;
    y = tmp_y;
    if(x == start[0] && y == start[1]){
      flg = false;
    }else{
      maze[x][y] = 4;
    }
  }
}

// solveボタンの実装
function onSolveClick(){
  let solveEle = document.getElementById('solve');
  solveMaze();
  drawMase();
  console.log("Solved!");
}
