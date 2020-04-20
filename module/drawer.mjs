export class Drawer {

  constructor(maze, canvas_name) {
    this.maze = maze;
    // 一マスの一辺のサイズ
    this.rect_size = 10;
    // キャンバスの設定
    this.canvas = document.getElementById(canvas_name);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = (this.maze.size+2)*this.rect_size;
    this.canvas.height = (this.maze.size+2)*this.rect_size;
  }

  /*
    迷路のマスの状態
    'wall':壁（黒）
    'path':通路（白）
    'start':スタート（赤）
    'goal':ゴール（緑）
    'answer':最短路（青）
    'chara':キャラのいる位置（紫）
    'reached':キャラの通った道（ピンク）
    'correct':最短路と通った道の重なり（青ピンク）
  */
  drawSquare(x, y){
    // マスの色の決定
    switch (this.maze.map[x][y]) {
      case 'wall':
        this.ctx.fillStyle = "rgb(0,0,0)";
        break;
      case 'path':
        this.ctx.fillStyle = "rgb(255,255,255)";
        break;
      case 'start':
        this.ctx.fillStyle = "rgb(255,0,0)";
        break;
      case 'goal':
        this.ctx.fillStyle = "rgb(0,255,0)";
        break;
      case 'answer':
        this.ctx.fillStyle = "rgb(0,100,255)";
        break;
      case 'chara':
        this.ctx.fillStyle = "rgb(200,0,200)";
        break;
      case 'reached':
        this.ctx.fillStyle = "rgb(255,150,150)";
        break;
      case 'correct':
        this.ctx.fillStyle = "rgb(127,125,202)";
        break;
    }
    // マスの描画
    let border = 0;
    this.ctx.fillRect(y*this.rect_size, x*this.rect_size, this.rect_size-border, this.rect_size-border);
  }

  // 迷路を描画する関数
  drawMaze(){
    for(let i=0;i<this.maze.size;i++){
      for(let j=0;j<this.maze.size;j++){
        this.drawSquare(i, j);
      }
    }
  }


}
