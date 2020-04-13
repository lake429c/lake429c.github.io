export class Drawer {

  constructor(maze, canvas_name) {
    this.maze = maze;
    // 一マスの一辺のサイズ
    this.rect_size = 8;
    // キャンバスの設定
    this.canvas = document.getElementById(canvas_name);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = (this.maze.length+2)*this.rect_size;
    this.canvas.height = (this.maze.length+2)*this.rect_size;
  }

  /*
    迷路のマスの状態
    0:壁（黒）
    1:通路（白）
    2:スタート（赤）
    3:ゴール（緑）
    4:最短路（青）
  */
  drawSquare(x, y){
    // マスの色の決定
    switch (this.maze[x][y]) {
      case 0:
        this.ctx.fillStyle = "rgb(0,0,0)";
        break;
      case 1:
        this.ctx.fillStyle = "rgb(255,255,255)";
        break;
      case 2:
        this.ctx.fillStyle = "rgb(255,0,0)";
        break;
      case 3:
        this.ctx.fillStyle = "rgb(0,255,0)";
        break;
      case 4:
        this.ctx.fillStyle = "rgb(0,100,255)";
        break;
    }
    // マスの描画
    this.ctx.fillRect(y*this.rect_size, x*this.rect_size, this.rect_size-1, this.rect_size-1);
  }

  // 迷路を描画する関数
  drawMaze(){
    for(let i=0;i<this.maze.length;i++){
      for(let j=0;j<this.maze.length;j++){
        this.drawSquare(i, j);
      }
    }
  }

}
