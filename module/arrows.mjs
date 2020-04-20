import {Drawer} from './drawer.mjs'

export class Arrows {

  constructor(maze){
    this.maze = maze;
    this.drawer = new Drawer(maze, 'maze_canvas');
  }

  arrowUp(){
    let x = this.maze.charaX, y = this.maze.charaY;
    // 行きたい方向が通路やもう通った場所か
    if(this.maze.map[x-1][y] == 1){
      this.maze.map[x][y] = 6;
      this.drawer.drawSquare(x, y);
      this.maze.map[x-1][y] = 5;
      this.drawer.drawSquare(x-1, y);
      this.maze.charaX--;
    }else if(this.maze.map[x-1][y] == 6){
      this.maze.map[x][y] = 1;
      this.drawer.drawSquare(x, y);
      this.maze.map[x-1][y] = 5;
      this.drawer.drawSquare(x-1, y);
      this.maze.charaX--;
    }
  }

  arrowDown(){
    let x = this.maze.charaX, y = this.maze.charaY;
    // 行きたい方向が通路やもう通った場所か
    if(this.maze.map[x+1][y] == 1){
      this.maze.map[x][y] = 6;
      this.drawer.drawSquare(x, y);
      this.maze.map[x+1][y] = 5;
      this.drawer.drawSquare(x+1, y);
      this.maze.charaX++;
    }else if(this.maze.map[x+1][y] == 6){
      this.maze.map[x][y] = 1;
      this.drawer.drawSquare(x, y);
      this.maze.map[x+1][y] = 5;
      this.drawer.drawSquare(x+1, y);
      this.maze.charaX++;
    }
  }

  arrowLeft(){
    let x = this.maze.charaX, y = this.maze.charaY;
    // 行きたい方向が通路やもう通った場所か
    if(this.maze.map[x][y-1] == 1){
      this.maze.map[x][y] = 6;
      this.drawer.drawSquare(x, y);
      this.maze.map[x][y-1] = 5;
      this.drawer.drawSquare(x, y-1);
      this.maze.charaY--;
    }else if(this.maze.map[x][y-1] == 6){
      this.maze.map[x][y] = 1;
      this.drawer.drawSquare(x, y);
      this.maze.map[x][y-1] = 5;
      this.drawer.drawSquare(x, y-1);
      this.maze.charaY--;
    }
  }

  arrowRight(){
    let x = this.maze.charaX, y = this.maze.charaY;
    // 行きたい方向が通路やもう通った場所か
    if(this.maze.map[x][y+1] == 1){
      this.maze.map[x][y] = 6;
      this.drawer.drawSquare(x, y);
      this.maze.map[x][y+1] = 5;
      this.drawer.drawSquare(x, y+1);
      this.maze.charaY++;
    }else if(this.maze.map[x][y+1] == 6){
      this.maze.map[x][y] = 1;
      this.drawer.drawSquare(x, y);
      this.maze.map[x][y+1] = 5;
      this.drawer.drawSquare(x, y+1);
      this.this.maze.charaY++;
    }
  }
}
