
var drawModule = (function () { 

  var bodySnake = function(x, y) {
    ctx.beginPath();
    ctx.arc(x*snakeSize, y*snakeSize, snakeSize/2, 0, 2 * Math.PI, true);
    ctx.fillStyle = "#f69eac";
    ctx.fill();
 
    // draw the stroke
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#f16a83";
    ctx.stroke();    
        // ctx.fillStyle = '#f69eac';
        // ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // ctx.strokeStyle = '#f16a83';
        // ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var pizza = function(x, y) {
    // draw the colored region
    ctx.beginPath();
    ctx.arc(x*snakeSize, y*snakeSize, snakeSize/2, 0, 2 * Math.PI, true);
    ctx.fillStyle = "#fdf387";
    ctx.fill();
 
    // draw the stroke
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ddd162";
    ctx.stroke();
        // ctx.fillStyle = 'white';
        // ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // ctx.fillStyle = 'orange';
        // ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }

  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'black';
    ctx.font = "24px Arial";
    ctx.fillText(score_text, 10, h-10, 100);
  }

  var drawSnake = function() {
      var length = 4;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }  
  }
    
  var paint = function(){
      ctx.fillStyle = '#b5d780';
      ctx.fillRect(0, 0, w, h);
      // ctx.strokeStyle = 'black';
      // ctx.strokeRect(0, 0, w, h);

      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (direction == 'right') { 
        snakeX++; }
      else if (direction == 'left') { 
        snakeX--; }
      else if (direction == 'up') { 
        snakeY--; 
      } else if(direction == 'down') { 
        snakeY++; }

      if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
          //restart game
          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;          
        }
        
        if(snakeX == food.x && snakeY == food.y) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          score ++;
          
          createFood(); //Create new food
        } else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX; 
          tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
        } 
        
        pizza(food.x, food.y); 
        scoreText();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 80);
  }


    return {
      init : init
    };

    
}());
