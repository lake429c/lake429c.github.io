export class Tester {

  constructor() {
  }

  /*
  0:壁 1~:未探索通路 ~-1:探索済み通路
  */

  // 壁以外は全部'path'にする
  binary(maze){
    for(let i=0;i<maze.size;i++){
      for(let j=0;j<maze.size;j++){
        if(maze.map[i][j] != 'wall') maze.map[i][j] = 'path';
      }
    }
    return maze;
  }

  dfs(testMaze, x, y){
    let loopFlag = false;
    let cnt = 0;
    // 自身を探索済みに
    testMaze.map[x][y] = 'searched';
    // 深さ優先探索で進む
    // 周りに探索済みの通路があればカウントを増やす
    if(y-1 > 0 && testMaze.map[x][y-1] == 'path'){
      loopFlag = this.dfs(testMaze, x, y-1);
    }else if(testMaze.map[x][y-1] == 'searched'){
      cnt++;
    }
    if(y+1 < testMaze.size-1 && testMaze.map[x][y+1] == 'path'){
      loopFlag = this.dfs(testMaze, x, y+1);
    }else if(testMaze.map[x][y+1] == 'searched'){
      cnt++;
    }
    if(x-1 > 0 && testMaze.map[x-1][y] == 'path'){
      loopFlag = this.dfs(testMaze, x-1, y);
    }else if(testMaze.map[x-1][y] == 'searched'){
      cnt++;
    }
    if(x+1 < testMaze.size-1 && testMaze.map[x+1][y] == 'path'){
      loopFlag = this.dfs(testMaze, x+1, y);
    }else if(testMaze.map[x+1][y] == 'searched'){
      cnt++;
    }
    // 後ろ以外に探索済みの通路に当たったらループになっている
    if(cnt > 1) return true;
    return loopFlag;
  }

  // ループしている通路がないかの確認
  hasLoop(maze){
    // ディープコピー
    let testMaze = JSON.parse(JSON.stringify(maze));
    testMaze = this.binary(testMaze);
    if(testMaze.map[testMaze.charaX][testMaze.charaY] != 'path') return true;
    return this.dfs(testMaze, testMaze.charaX, testMaze.charaY);
  }

  // 外壁を除いて，壁に囲まれ孤立した通路がないことの確認
  // ループチェックをした後，探索していない通路が残っていたら閉じた領域ができている
  hasClosedArea(maze){
    // ディープコピー
    let testMaze = JSON.parse(JSON.stringify(maze));
    testMaze = this.binary(testMaze);
    if(testMaze.map[testMaze.charaX][testMaze.charaY] != 'path') return true;
    this.dfs(testMaze, testMaze.charaX, testMaze.charaY);
    for(let i=0;i<testMaze.size;i++){
      for(let j=0;j<testMaze.size;j++){
        if(testMaze.map[i][j] == 'path') return true;
      }
    }
    return false;
  }

  tmp(maze, x, y){
    let widthFlag = false;
    // 自身を探索済みに
    testMaze.map[x][y] = 'searched';
    //
    if(testMaze.map[x][y-1] != 'wall'
      && testMaze.map[x-1][y-1] != 'wall'
      && testMaze.map[x-1][y] != 'wall'){
        return true;
    }
    if(testMaze.map[x][y+1] != 'wall'
      && testMaze.map[x-1][y+1] != 'wall'
      && testMaze.map[x-1][y] != 'wall'){
        return true;
    }
    if(testMaze.map[x][y-1] != 'wall'
      && testMaze.map[x+1][y-1] != 'wall'
      && testMaze.map[x+1][y] != 'wall'){
        return true;
    }
    if(testMaze.map[x][y+1] != 'wall'
      && testMaze.map[x+1][y+1] != 'wall'
      && testMaze.map[x+1][y] != 'wall'){
        return true;
    }
    if(y-1 != 0 && testMaze.map[x][y-1] == 'path'){
      widthFlag = this.tmp(testMaze, x, y-1);
    }
    if(y+1 != testMaze.size-1 && testMaze.map[x][y+1] == 'path'){
      widthFlag = this.tmp(testMaze, x, y+1);
    }
    if(x-1 != 0 && testMaze.map[x-1][y] == 'path'){
      widthFlag = this.tmp(testMaze, x-1, y);
    }
    if(x+1 != testMaze.size-1 && testMaze.map[x+1][y] == 'path'){
      widthFlag = this.tmp(testMaze, x+1, y);
    }
    return widthFlag;
  }

  // 通路の幅が1マスであることの確認
  // 自身と左上・右上・左下・右下を対角とするそれぞれの四角の中ですべてが通路マスのものがあれば通路幅が1マスでない
  hasWidePath(maze){
    // ディープコピー
    let testMaze = JSON.parse(JSON.stringify(maze));
    testMaze = this.binary(testMaze);
    if(testMaze.map[testMaze.charaX][testMaze.charaY] != 'path') return true;
    return this.tmp(testMaze, testMaze.charaX, testMaze.charaY);
  }

}
