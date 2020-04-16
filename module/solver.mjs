export class Solver{

  constructor(maze){
    this.maze = maze;
  }

  //
  deleteChara(){
    let x, y;
    // キャラの位置を見つける
    for(let i=1;i<this.maze.length-1;i++){
      for(let j=1;j<this.maze.length-1;j++){
        if(this.maze[i][j] == 5){
          this.maze[i][j] = 6;
          break;
        }
      }
    }
  }

  // 幅優先探索で迷路を解く
  solveMaze(){
    this.deleteChara();
    // 幅優先探索のキュー
    let que = [];
    // 探索済みフラグ
    let checked = [];
    // スタートからの距離
    let dist = [];
    // 初期化
    for(let i=0;i<this.maze.length;i++){
      let tmp = [];
      for(let j=0;j<this.maze.length;j++){
        tmp.push(false);
      }
      checked.push(tmp);
    }
    for(let i=0;i<this.maze.length;i++){
      let tmp = [];
      for(let j=0;j<this.maze.length;j++){
        tmp.push(this.maze.length*this.maze.length);
      }
      dist.push(tmp);
    }

    let x, y;
    let cnt = 0;

    // スタート地点を探す
    for(let i=1;i<this.maze.length-1;i++){
      for(let j=1;j<this.maze.length-1;j++){
        if(this.maze[i][j] == 2){
          x = i;
          y = j;
          que.push([x,y]);
          dist[x][y] = 0;
        }
      }
    }
    // ゴールを探して進む
    while(this.maze[x][y] != 3){
      if(this.maze[x-1][y] != 0 && checked[x-1][y] == false){
        que.push([x-1,y]);
      }else if(checked[x-1][y] == true){
        dist[x][y] = dist[x-1][y]+1;
      }
      if(this.maze[x+1][y] != 0 && checked[x+1][y] == false){
        que.push([x+1,y]);
      }else if(checked[x+1][y] == true){
        dist[x][y] = dist[x+1][y]+1;
      }
      if(this.maze[x][y-1] != 0 && checked[x][y-1] == false){
        que.push([x,y-1]);
      }else if(checked[x][y-1] == true){
        dist[x][y] = dist[x][y-1]+1;
      }
      if(this.maze[x][y+1] != 0 && checked[x][y+1] == false){
        que.push([x,y+1]);
      }else if(checked[x][y+1] == true){
        dist[x][y] = dist[x][y+1]+1;
      }
      checked[x][y] = true;
      cnt++;
      x = que[cnt][0], y = que[cnt][1];
    }
    // ゴールから最短路をたどる
    while(this.maze[x][y] != 2){
      if(this.maze[x-1][y] != 0 && dist[x-1][y] < dist[x][y]){
        x--;
      }
      else if(this.maze[x+1][y] != 0 && dist[x+1][y] < dist[x][y]){
        x++;
      }
      else if(this.maze[x][y-1] != 0 && dist[x][y-1] < dist[x][y]){
        y--;
      }
      else if(this.maze[x][y+1] != 0 && dist[x][y+1] < dist[x][y]){
        y++;
      }
      if(this.maze[x][y] != 2){
        if(this.maze[x][y] == 6){
          this.maze[x][y] = 7;
        }else{
          this.maze[x][y] = 4;
        }
      }
    }
    console.log("Solved!");
  }

}
