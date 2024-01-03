function init() {
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 594;
    pen = canvas.getContext('2d');
    cs = 32;
    game_over = false;
    score = 3;

    backgroundMusic = new Audio();
    backgroundMusic.src = "assets/music1.mp3";
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5; // Adjust the volume as needed

    // Start playing background music
    backgroundMusic.play();

    //Creating a Image Object for food
    food_img = new Image();
    food_img.src = "assets/apple1.jpg";
    trophy = new Image();
    trophy.src = "assets/trophy.png";
    food = getRandomFood();
    snake = {
        init_len: 3,
        color: "blue",
        cells: [],
        direction: "right",
        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2.5, cs - 2.5);
            }
        },
        updateSnake: function () {
            // console.log("updating snake according to the direction property")
            // check if the snake has eaten food, increase the length of the food and generate new food object
            // setInterval(update, 1000);
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(headX==food.x && headY==food.y){
                console.log("Food eaten by snake");
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            var nextX,nextY;
            if(this.direction == "right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY + 1;
            }
            else{
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({ x: nextX, y: nextY });
            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x > last_x || this.cells[0].y>last_y){
                game_over = true;
            }
        }
    };
    snake.createSnake();
    //Add a Event listener on the document object
    
    function keyPressed(e){
        //Conditional statement here
        if(e.key == "ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down";
        }
        else{
            snake.direction = "up";
        }
        console.log(snake.direction);
    }
    document.addEventListener('keydown',keyPressed);
}
function draw() {
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
  
    // erase the old frame
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,28,28,cs,cs);
    pen.fillStyle = "blue";
    pen.font = "25px Roboto";
    pen.fillText(score,50,50);
}
function update() {
    snake.updateSnake();
}
function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}
function gameloop() {
    if(game_over==true){
        // stopbackgroundMusic
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop, 200);