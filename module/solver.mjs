export class Solver{

  constructor(maze){
    this.maze = maze;
  }


  // 幅優先探索で迷路を解く
  solveMaze(){
    // キャラの位置を，'reached'に変える
    this.maze.map[this.maze.charaX][this.maze.charaY] = 'reached';
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
        if(this.maze.map[i][j] == 'start'){
          x = i;
          y = j;
          que.push([x,y]);
          dist[x][y] = 0;
        }
      }
    }
    // ゴールを探して進む
    while(this.maze.map[x][y] != 'goal'){
      if(this.maze.map[x-1][y] != 'wall' && checked[x-1][y] == false){
        que.push([x-1,y]);
      }else if(checked[x-1][y] == true){
        dist[x][y] = dist[x-1][y]+1;
      }
      if(this.maze.map[x+1][y] != 'wall' && checked[x+1][y] == false){
        que.push([x+1,y]);
      }else if(checked[x+1][y] == true){
        dist[x][y] = dist[x+1][y]+1;
      }
      if(this.maze.map[x][y-1] != 'wall' && checked[x][y-1] == false){
        que.push([x,y-1]);
      }else if(checked[x][y-1] == true){
        dist[x][y] = dist[x][y-1]+1;
      }
      if(this.maze.map[x][y+1] != 'wall' && checked[x][y+1] == false){
        que.push([x,y+1]);
      }else if(checked[x][y+1] == true){
        dist[x][y] = dist[x][y+1]+1;
      }
      checked[x][y] = true;
      cnt++;
      x = que[cnt][0], y = que[cnt][1];
    }
    // ゴールから最短路をたどる
    let max = 0;
    while(this.maze.map[x][y] != 'start'){
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
      if(this.maze.map[x][y] != 'start'){
        if(this.maze.map[x][y] == 'reached'){
          this.maze.map[x][y] = 'correct';
          if(dist[x][y] > max){
            max = dist[x][y];
            this.maze.score = parseInt(max*100/(dist[que[cnt-1][0]][que[cnt-1][1]]+1));
          }
        }else{
          this.maze.map[x][y] = 'answer';
        }
      }
    }
    console.log("Solved!");
  }

}
