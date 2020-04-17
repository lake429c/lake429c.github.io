export class Solver{

  constructor(maze){
    this.maze = maze;
  }

  //
  deleteChara(){
    let x, y;
    // キャラの位置を見つける
    for(let i=1;i<this.maze.size-1;i++){
      for(let j=1;j<this.maze.size-1;j++){
        if(this.maze.map[i][j] == 5){
          this.maze.map[i][j] = 6;
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
    for(let i=0;i<this.maze.size;i++){
      let tmp = [];
      for(let j=0;j<this.maze.size;j++){
        tmp.push(false);
      }
      checked.push(tmp);
    }
    for(let i=0;i<this.maze.size;i++){
      let tmp = [];
      for(let j=0;j<this.maze.size;j++){
        tmp.push(this.maze.size*this.maze.size);
      }
      dist.push(tmp);
    }

    let x, y;
    let cnt = 0;

    // スタート地点を探す
    for(let i=1;i<this.maze.size-1;i++){
      for(let j=1;j<this.maze.size-1;j++){
        if(this.maze.map[i][j] == 2){
          x = i;
          y = j;
          que.push([x,y]);
          dist[x][y] = 0;
        }
      }
    }
    // ゴールを探して進む
    while(this.maze.map[x][y] != 3){
      if(this.maze.map[x-1][y] != 0 && checked[x-1][y] == false){
        que.push([x-1,y]);
      }else if(checked[x-1][y] == true){
        dist[x][y] = dist[x-1][y]+1;
      }
      if(this.maze.map[x+1][y] != 0 && checked[x+1][y] == false){
        que.push([x+1,y]);
      }else if(checked[x+1][y] == true){
        dist[x][y] = dist[x+1][y]+1;
      }
      if(this.maze.map[x][y-1] != 0 && checked[x][y-1] == false){
        que.push([x,y-1]);
      }else if(checked[x][y-1] == true){
        dist[x][y] = dist[x][y-1]+1;
      }
      if(this.maze.map[x][y+1] != 0 && checked[x][y+1] == false){
        que.push([x,y+1]);
      }else if(checked[x][y+1] == true){
        dist[x][y] = dist[x][y+1]+1;
      }
      checked[x][y] = true;
      cnt++;
      x = que[cnt][0], y = que[cnt][1];
    }
    // ゴールから最短路をたどる
    while(this.maze.map[x][y] != 2){
      if(this.maze.map[x-1][y] != 0 && dist[x-1][y] < dist[x][y]){
        x--;
      }
      else if(this.maze.map[x+1][y] != 0 && dist[x+1][y] < dist[x][y]){
        x++;
      }
      else if(this.maze.map[x][y-1] != 0 && dist[x][y-1] < dist[x][y]){
        y--;
      }
      else if(this.maze.map[x][y+1] != 0 && dist[x][y+1] < dist[x][y]){
        y++;
      }
      if(this.maze.map[x][y] != 2){
        if(this.maze.map[x][y] == 6){
          this.maze.map[x][y] = 7;
        }else{
          this.maze.map[x][y] = 4;
        }
      }
    }
    console.log("Solved!");
  }

}
