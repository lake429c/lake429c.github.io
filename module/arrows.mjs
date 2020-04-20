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
      this.maze.map[x][y] = 'reached';
      this.drawer.drawSquare(x, y);
      this.maze.charaX--;
      this.maze.reachGoal();
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
    }else if(this.maze.map[x+1][y] == 'goal'){
      this.maze.map[x][y] = 'reached';
      this.drawer.drawSquare(x, y);
      this.maze.charaX++;
      this.maze.reachGoal();
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
    }else if(this.maze.map[x][y-1] == 'goal'){
      this.maze.map[x][y] = 'reached';
      this.drawer.drawSquare(x, y);
      this.maze.charaY--;
      this.maze.reachGoal();
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
    }else if(this.maze.map[x][y+1] == 'goal'){
      this.maze.map[x][y] = 'reached';
      this.drawer.drawSquare(x, y);
      this.maze.charaY++;
      this.maze.reachGoal();
    }
  }
}
