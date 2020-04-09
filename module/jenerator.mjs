/*
  迷路のマスの状態
  0:壁（黒）
  1:通路（白）
  2:スタート（赤）
  3:ゴール（緑）
  4:最短路（青）
*/

export class Jenerator {

  constructor(maze){
    this.maze = maze;
    // 周りを掘ることが可能な通路マス
    this.digable = [];
    // 行き止まりのマス
    this.deadends = [];
    // 終了フラグ
    this.endFlag = true;
  }

  // min以上max未満の整数乱数を得る関数
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // (x,y)のdirection方向のマスが掘れる
  // 0:左 1:右 2:上 3:下
  isDigable(x, y, direction){
    switch (direction) {
      case 0:
        if(y-1 != 0
          && this.maze[x][y-1] == 0
          && this.maze[x][y-2] == 0
          && this.maze[x-1][y-1] == 0
          && this.maze[x+1][y-1] == 0
        ) return true;
        break;
      case 1:
        if(y+1 != this.maze.length-1
          && this.maze[x][y+1] == 0
          && this.maze[x][y+2] == 0
          && this.maze[x-1][y+1] == 0
          && this.maze[x+1][y+1] == 0
        ) return true;
        break;
      case 2:
        if(x-1 != 0
          && this.maze[x-1][y] == 0
          && this.maze[x-2][y] == 0
          && this.maze[x-1][y-1] == 0
          && this.maze[x-1][y+1] == 0
        ) return true;
        break;
      case 3:
        if(x+1 != this.maze.length-1
          && this.maze[x+1][y] == 0
          && this.maze[x+2][y] == 0
            && this.maze[x+1][y-1] == 0
          && this.maze[x+1][y+1] == 0
        ) return true;
        break;
    }
    return false;
  }

  // (x,y)周りにまだ掘れるマスがある
  isDigableAround(x, y){
    for(let i=0;i<4;i++){
      if(this.isDigable(x, y, i)) return true;
    }
    return false;
  }

  // 通路マスでかつまだ掘れるものを保存する配列の更新
  updateDigables(){
    let tmp = [];
    for(let i=0;i<this.digable.length;i++){
      if(this.isDigableAround(this.digable[i][0],this.digable[i][1])){
        tmp.push([this.digable[i][0],this.digable[i][1]]);
      }
    }
    this.digable = tmp;
  }

  // 周りが掘れなくなるまで通路を伸ばす
  goForward(x, y){
    // 進む方向を決める
    let direction;
    do{
      direction = this.getRandomInt(0, 4);
    } while(!this.isDigable(x, y, direction));
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
    this.maze[x][y] = 1;

    if(this.isDigableAround(x,y)){
      this.digable.push([x,y]);
      this.goForward(x,y);
    }else{
      this.deadends.push([x,y]);
    }
  }

  // 増やせなくなるまで脇道を増やす
  addSidePath(){
    this.updateDigables();
    // 周りを掘れるマスがなくなるまで通路を増やす
    if(this.digable.length != 0){
      // 掘り始める通路マスを決める
      let index = this.getRandomInt(0,this.digable.length);
      this.goForward(this.digable[index][0], this.digable[index][1]);
    }else{
      //スタートの設定
      let indexS = this.getRandomInt(0,this.deadends.length/2);
      this.maze[this.deadends[indexS][0]][this.deadends[indexS][1]] = 2;
      // ゴールの設定
      let indexG = this.getRandomInt(this.deadends.length/2,this.deadends.length);
      this.maze[this.deadends[indexG][0]][this.deadends[indexG][1]] = 3;

      console.log("Jenerated");
      this.endFlag = false;
    }
  }

  // 穴掘り法で迷路を生成する関数
  jenerateMaze() {
    console.log("Jenerating...");
    // 最初に一マス穴開ける
    let x = this.getRandomInt(1,this.maze.length-1);
    let y = this.getRandomInt(1,this.maze.length-1);
    this.maze[x][y] = 1;
    this.digable.push([x,y]);
    // 穴を掘る
    while(this.endFlag){
      this.addSidePath();
    }
  }

}
