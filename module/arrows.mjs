import {Drawer} from './drawer.mjs'

export class Arrows {

  constructor(maze){
    this.maze = maze;
    this.drawer = new Drawer(maze, 'maze_canvas');
  }

  arrowUp(){
    let x = this.maze.charaX, y = this.maze.charaY;
    // 行きたい方向が通路やもう通った場所か
    if(this.maze.map[x-1][y] == 'path'){
      this.maze.map[x][y] = 'reached';
      this.drawer.drawSquare(x, y);
      this.maze.map[x-1][y] = 'chara';
      this.drawer.drawSquare(x-1, y);
      this.maze.charaX--;
    }else if(this.maze.map[x-1][y] == 'reached'){
      this.maze.map[x][y] = 'path';
      this.drawer.drawSquare(x, y);
      this.maze.map[x-1][y] = 'chara';
      this.drawer.drawSquare(x-1, y);
      this.maze.charaX--;
    }else if(this.maze.map[x-1][y] == 'goal'){
      
    }
  }

  arrowDown(){
    let x = this.maze.charaX, y = this.maze.charaY;
    // 行きたい方向が通路やもう通った場所か
    if(this.maze.map[x+1][y] == 'path'){
      this.maze.map[x][y] = 'reached';
      this.drawer.drawSquare(x, y);
      this.maze.map[x+1][y] = 'chara';
      this.drawer.drawSquare(x+1, y);
      this.maze.charaX++;
    }else if(this.maze.map[x+1][y] == 'reached'){
      this.maze.map[x][y] = 'path';
      this.drawer.drawSquare(x, y);
      this.maze.map[x+1][y] = 'chara';
      this.drawer.drawSquare(x+1, y);
      this.maze.charaX++;
    }
  }

  arrowLeft(){
    let x = this.maze.charaX, y = this.maze.charaY;
    // 行きたい方向が通路やもう通った場所か
    if(this.maze.map[x][y-1] == 'path'){
      this.maze.map[x][y] = 'reached';
      this.drawer.drawSquare(x, y);
      this.maze.map[x][y-1] = 'chara';
      this.drawer.drawSquare(x, y-1);
      this.maze.charaY--;
    }else if(this.maze.map[x][y-1] == 'reached'){
      this.maze.map[x][y] = 'path';
      this.drawer.drawSquare(x, y);
      this.maze.map[x][y-1] = 'chara';
      this.drawer.drawSquare(x, y-1);
      this.maze.charaY--;
    }
  }

  arrowRight(){
    let x = this.maze.charaX, y = this.maze.charaY;
    // 行きたい方向が通路やもう通った場所か
    if(this.maze.map[x][y+1] == 'path'){
      this.maze.map[x][y] = 'reached';
      this.drawer.drawSquare(x, y);
      this.maze.map[x][y+1] = 'chara';
      this.drawer.drawSquare(x, y+1);
      this.maze.charaY++;
    }else if(this.maze.map[x][y+1] == 'reached'){
      this.maze.map[x][y] = 'path';
      this.drawer.drawSquare(x, y);
      this.maze.map[x][y+1] = 'chara';
      this.drawer.drawSquare(x, y+1);
      this.maze.charaY++;
    }
  }
}
