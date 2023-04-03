const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field = [], playerPosition = {yAxis: 0, xAxis: 0}, gameOver = false, winner = false) {
        this.field = field;
        this.playerPosition = playerPosition;
        this.gameOver = gameOver;
        this.winner = winner;
    }

    introduction() {

        //Explain rules to players
        console.log(
            `Welcome to find your hat!
            Player = ${pathCharacter}
            Hat = ${hat}
            Field = ${fieldCharacter}
            Hole = ${hole}
            Try to find you hat without falling in a hole!
            Use u, d, r or l to navigate!\n`
        );

    }

    generateMap() {

        // Create 10 x 10 field
        this.field = Array(10).fill([], 0);
        for (let i = 0; i < this.field.length; i++) {
            this.field[i] = Array(10).fill(fieldCharacter, 0);
        };

        // Position character
        this.field[this.playerPosition.yAxis][this.playerPosition.xAxis] = pathCharacter;
        

        // Variable to determine location of objects
        let gridXAxis;
        let gridYAxis; 

        // Position hat 
        // Variable to break out of loop
        let setDownHat = false; 
        while (setDownHat !== true) {
            gridXAxis = Math.floor(Math.random() * 10);
            gridYAxis = Math.floor(Math.random() * 10);
            if (this.field[gridYAxis][gridXAxis] !== pathCharacter) {
                this.field[gridYAxis][gridXAxis] = hat;
                setDownHat = true;
            } 
        };

        //Position holes
        let numberOfHoles = 17; // If user inputted map size, would be approx 1/6 tiles
        for (let i = 0; i < 17; i++) {

            //Variable to break outof while loop
            let setDownHole = false;

            while (setDownHole !== true) {
                gridXAxis = Math.floor(Math.random() * 10);
                gridYAxis = Math.floor(Math.random() * 10);
                    if (this.field[gridYAxis][gridXAxis] === fieldCharacter) {
                    this.field[gridYAxis][gridXAxis] = hole;
                    setDownHole = true;
                }; 
            };
        };

    }

    print() {

        //Print Map
        console.log(this.field.map(row =>  row.join('')).join("\r\n"));
    }

    playerMovement() {

        // Get player input and move their character depending on array coordinates
        //Replaces the player's previous position with a field

        const direction = prompt('\nWhich way? ');

        if (direction.toLowerCase() === "d") {
            this.field[this.playerPosition.yAxis][this.playerPosition.xAxis] = fieldCharacter;
            this.playerPosition.yAxis += 1;
        } else if (direction.toLowerCase() === "u") {
            this.field[this.playerPosition.yAxis][this.playerPosition.xAxis] = fieldCharacter;
            this.playerPosition.yAxis -= 1;
        } else if (direction.toLowerCase() === "r") {
            this.field[this.playerPosition.yAxis][this.playerPosition.xAxis] = fieldCharacter;
            this.playerPosition.xAxis += 1;
        } else if (direction.toLowerCase() === "l") {
            this.field[this.playerPosition.yAxis][this.playerPosition.xAxis] = fieldCharacter;
            this.playerPosition.xAxis -= 1;
        } else {
            console.log('Invalid Input!');
        }
    }

    gameStatus() {

        // Check for out of bounds and to see if player has reached hat or fallen in hole

        if (this.playerPosition.yAxis < 0 || this.playerPosition.yAxis > this.field.length - 1 ) {
            console.log("Out of bounds... ");
            this.gameOver = true;
        } else if (this.playerPosition.xAxis < 0 || this.playerPosition.xAxis > this.field.length - 1) {
            console.log("Out of bounds... ");
            this.gameOver = true;
        } else if (this.field[this.playerPosition.yAxis][this.playerPosition.xAxis] === hole) {
            console.log("You fell down a hole... ");
            this.gameOver = true;
        } else if (this.field[this.playerPosition.yAxis][this.playerPosition.xAxis] === hat) {
            console.log("You found your hat... ");
            this.gameOver = true;
            this.winner = true;
        }
    }

    mapStatus() {
        // Updates the map to show where the player is
        this.field[this.playerPosition.yAxis][this.playerPosition.xAxis] = pathCharacter;
    }

    gameLoop() {

        //Manages the flow of the game

        this.introduction();
        this.generateMap();

        while(this.gameOver !== true) {
            this.print();
            this.playerMovement();
            this.gameStatus();
            if (this.gameOver !== true) {
                this.mapStatus();
            };
        } 

        if(this.winner) {
            console.log("Winner, you retrieved your lucky hat!")
        } else {
            console.log("You end up spending £500 to replace your lost hat at a designer boutique... Game Over!!!")
        }
    }

};

const myField = new Field(
    );

myField.gameLoop();

