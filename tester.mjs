//// テスター ////

export class Tester {

  constructor(maze) {
    // ディープコピー
    this.maze = JSON.parse(JSON.stringify(maze));
  }

  /*
  0:壁 1~:未探索通路 ~-1:探索済み通路
  */

  // ループしている通路がないかの確認
  hasLoop(x, y){
    let loopFlag = false;
    let cnt = 0;
    // 自身を探索済みに
    this.maze[x][y] = -1;
    if(y-1 != 0 && this.maze[x][y-1] >= 1){
      loopFlag = this.hasLoop(x, y-1);
    }else if(this.maze[x][y-1] == -1){
      cnt++;
    }
    if(y+1 != this.maze.length-1 && this.maze[x][y+1] >= 1){
      loopFlag = this.hasLoop(x, y+1);
    }else if(this.maze[x][y+1] == -1){
      cnt++;
    }
    if(x-1 != 0 && this.maze[x-1][y] >= 1){
      loopFlag = this.hasLoop(x-1, y);
    }else if(this.maze[x-1][y] == -1){
      cnt++;
    }
    if(x+1 != this.maze.length-1 && this.maze[x+1][y] >= 1){
      loopFlag = this.hasLoop(x+1, y);
    }else if(this.maze[x+1][y] == -1){
      cnt++;
    }
    // 後ろ以外に探索済みの通路に当たったらループになっている
    if(cnt > 1) return true;
    return loopFlag;
  }

  // 外壁を除いて，壁に囲まれ孤立した通路がないことの確認
  // ループチェックをした後，探索していない通路が残っていたら閉じた領域ができている
  hasClosedArea(){
    for(let i=0;i<this.maze.length;i++){
      for(let j=0;j<this.maze.length;j++){
        if(this.maze[i][j] >= 1) return true;
      }
    }
    return false;
  }

  // 通路の幅が1マスであることの確認
  // 自身と左上・右上・左下・右下を対角とするそれぞれの四角の中ですべてが通路マスのものがあれ ば通路幅が1マスでない
  hasWidePath(x, y){
    let widthFlag = false;
    // 自身を探索済みに
    this.maze[x][y] = -2;
    if(this.maze[x][y-1] <= -1
      && this.maze[x-1][y-1] <= -1
      && this.maze[x-1][y] <= -1){
        return true;
    }
    if(this.maze[x][y+1] <= -1
      && this.maze[x-1][y+1] <= -1
      && this.maze[x-1][y] <= -1){
        return true;
    }
    if(this.maze[x][y-1] <= -1
      && this.maze[x+1][y-1] <= -1
      && this.maze[x+1][y] <= -1){
        return true;
    }
    if(this.maze[x][y+1] <= -1
      && this.maze[x+1][y+1] <= -1
      && this.maze[x+1][y] <= -1){
        return true;
    }
    if(y-1 != 0 && this.maze[x][y-1] == -1){
      widthFlag = this.hasWidePath(x, y-1);
    }
    if(y+1 != this.maze.length-1 && this.maze[x][y+1] == -1){
      widthFlag = this.hasWidePath(x, y+1);
    }
    if(x-1 != 0 && this.maze[x-1][y] == -1){
      widthFlag = this.hasWidePath(x-1, y);
    }
    if(x+1 != this.maze.length-1 && this.maze[x+1][y] == -1){
      widthFlag = this.hasWidePath(x+1, y);
    }
    return widthFlag;
  }

  test(){
    // 通路マスを見つける
    let checkStart;
    for(let i=0;i<this.maze.length;i++){
      for(let j=0;j<this.maze.length;j++){
        if(this.maze[i][j] == 1){
          checkStart = [i, j];
          break;
        }
      }
    }
    if(this.hasLoop(checkStart[0], checkStart[1])) console.log("Loop exist");
    else if(this.hasClosedArea()) console.log("Closed area exist");
    else if(this.hasWidePath(checkStart[0], checkStart[1])) console.log("Wide path  exist");
    else{
      console.log("No problem");
      return true;
    }
    return false;
  }

}
