/**
 * Created by Rahul on 9/22/2016.
 */

var redBlocks = 0;
var greenBlocks = 0;
var isMillRed = false;
var isMillGreen = false;
var isActiveRed = false;
var isActiveGreen = false;
var blockWidth = 16;
var strokeWidth = 2;
var lastX = 0;
var lastY = 0;
var lastCenterX = 0;
var lastCenterY = 0;
var numberOfTurns = 0;
var rows = 7;
var columns = 7;
var positionArray = new Array(7);
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");


function initializeGame() {
    initializeArray();
    //  alert("Player 1 turns first followed by Player 2");
}

function initializeArray() {
    for (var i = 0; i < 7; i++) {
        positionArray[i] = new Array(7);
    }

    for (var j = 0; j < 7; j++) {
        for (var k = 0; k < 7; k++) {
            //Make all diagonal elements + boundary + center to zero
            if ((j == 3) || (k == 3) || (j == k) || (j + k == 6)) {
                positionArray[j][k] = 0;
            }
            else {
                positionArray[j][k] = -1;
            }
        }
    }
    //Finally making center also -1
    positionArray[3][3] = -1;

}

function makeMove(X, Y) {

    var yCenter;
    var xCenter;

    switch (X) {
        case 0: {
            switch (Y) {
                case 0: {
                    yCenter = 25;
                    xCenter = 25;
                    break;
                }
                case 3: {
                    yCenter = 275;
                    xCenter = 25;
                    break;
                }
                case 6: {
                    yCenter = 525;
                    xCenter = 25;
                    break;
                }
            }
            break;
        }
        case 1: {
            switch (Y) {
                case 1: {
                    yCenter = 115;
                    xCenter = 115;
                    break;
                }
                case 3: {
                    yCenter = 275;
                    xCenter = 115;
                    break;
                }
                case 5: {
                    yCenter = 435;
                    xCenter = 115;
                    break;
                }
            }
            break;
        }
        case 2: {
            switch (Y) {
                case 2: {
                    yCenter = 195;
                    xCenter = 195;
                    break;
                }
                case 3: {
                    yCenter = 275;
                    xCenter = 195;
                    break;
                }
                case 4: {
                    yCenter = 355;
                    xCenter = 195;
                    break;
                }
            }
            break;
        }
        case 3: {
            switch (Y) {
                case 0: {
                    yCenter = 25;
                    xCenter = 275;
                    break;
                }
                case 1: {
                    yCenter = 115;
                    xCenter = 275;
                    break;
                }
                case 2: {
                    yCenter = 195;
                    xCenter = 275;
                    break;
                }
                case 4: {
                    yCenter = 355;
                    xCenter = 275;
                    break;
                }
                case 5: {
                    yCenter = 435;
                    xCenter = 275;
                    break;
                }
                case 6: {
                    yCenter = 525;
                    xCenter = 275;
                    break;
                }
            }
            break;
        }
        case 4: {
            switch (Y) {
                case 2: {
                    yCenter = 195;
                    xCenter = 355;
                    break;
                }
                case 3: {
                    yCenter = 275;
                    xCenter = 355;
                    break;
                }
                case 4: {
                    yCenter = 355;
                    xCenter = 355;
                    break;
                }
            }
            break;
        }
        case 5: {
            switch (Y) {
                case 1: {
                    yCenter = 115;
                    xCenter = 435;
                    break;
                }
                case 3: {
                    yCenter = 275;
                    xCenter = 435;
                    break;
                }
                case 5: {
                    yCenter = 435;
                    xCenter = 435;
                    break;
                }
            }
            break;
        }
        case 6: {
            switch (Y) {
                case 0: {
                    yCenter = 25;
                    xCenter = 525;
                    break;
                }
                case 3: {
                    yCenter = 275;
                    xCenter = 525;
                    break;
                }
                case 6: {
                    yCenter = 525;
                    xCenter = 525;
                    break;
                }
            }
            break;
        }
    }
    if (isMillGreen || isMillRed) {
        //In this case don't change player turn and remove other player block in next click
        var playerCode = (isMillGreen) ? 1 : 2;
        if (positionArray[X][Y] != playerCode && (positionArray[X][Y] != 0)) {
            //Remove that block and update array value to zero
            if (playerCode == 1) {
                redBlocks--;
            } else {
                greenBlocks--;
            }
            context.clearRect(xCenter - blockWidth - strokeWidth, yCenter - blockWidth - strokeWidth,
                2 * (blockWidth + strokeWidth), 2 * ( blockWidth + strokeWidth));
            positionArray[X][Y] = 0;
            document.getElementById("message").innerHTML = "Message";
            turnOffMill();
            update();
        }
    }

    else if (numberOfTurns >= 18 && (isActiveRed || isActiveGreen)) {

        if ((((X == lastX) && (Y == lastY)))) {
            turnOffActive(lastCenterX, lastCenterY);
        }

        if ((positionArray[X][Y] == 0)) {

            if (((X == lastX) || (Y == lastY))) {
                // console.log("Index : " + X + "  " + Y + "\n");
                // console.log("Last Index : " + lastX + "  " + lastY + "\n");
                //

                if (X == 0 || X == 6 || Y == 0 || Y == 6) {
                    if (((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 3 ) || ((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 1 )) {
                        //Remove previous block and make a new block at the the given position
                        positionArray[lastX][lastY] = 0;
                        clearBlock(lastCenterX, lastCenterY);
                        drawBlock(xCenter, yCenter, X, Y);
                    }
                } else if (X == 1 || X == 5 || Y == 1 || Y == 5) {
                    if (((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 2 ) || ((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 1 )) {
                        //Remove previous block and make a new block at the the given position
                        positionArray[lastX][lastY] = 0;
                        clearBlock(lastCenterX, lastCenterY);
                        drawBlock(xCenter, yCenter, X, Y);
                    }
                } else if (X == 2 || X == 4 || Y == 2 || Y == 4) {
                    if (((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 1 )) {
                        //Remove previous block and make a new block at the the given position
                        positionArray[lastX][lastY] = 0;
                        clearBlock(lastCenterX, lastCenterY);
                        drawBlock(xCenter, yCenter, X, Y);
                    }
                }

            } else {
                //Make active off
                turnOffActive(lastCenterX, lastCenterY);
            }
        }
    }

    else if (positionArray[X][Y] == 0 && numberOfTurns < 18) {

        // console.log("Index : " + X + "  " + Y + "\n");
        // console.log("Center : " + xCenter + "  " + yCenter + "\n");
        //Place is empty, hence make a move here
        if (numberOfTurns % 2 != 0) {
            //Player two made a move, hence made a block red.
            redBlocks++;
            positionArray[X][Y] = 2;
            context.beginPath();
            context.arc(xCenter, yCenter, blockWidth, 0, 2 * Math.PI, false);
            context.fillStyle = '#F44336';
            context.fill();
            context.lineWidth = strokeWidth;
            context.strokeStyle = '#003300';
            context.stroke();
            document.getElementById("turn").innerHTML = "Turn : P1";
            if (checkMill(X, Y, 2)) {
                isMillRed = true;
                document.getElementById("turn").innerHTML = "Turn : P2";
                document.getElementById("message").innerHTML = "Click on any green block to remove it.";
            } else {
                document.getElementById("message").innerHTML = "Message";
            }

        }
        else {
            //Player one just made a move, hence made a block green
            greenBlocks++;
            positionArray[X][Y] = 1;
            context.beginPath();
            context.arc(xCenter, yCenter, blockWidth, 0, 2 * Math.PI, false);
            context.fillStyle = '#2E7D32';
            context.fill();
            context.lineWidth = strokeWidth;
            context.strokeStyle = '#003300';
            context.stroke();
            document.getElementById("turn").innerHTML = "Turn : P2";
            if (checkMill(X, Y, 1)) {
                isMillGreen = true;
                document.getElementById("turn").innerHTML = "Turn : P1";
                document.getElementById("message").innerHTML = "Click on any red block to remove it.";
            } else {
                document.getElementById("message").innerHTML = "Message";
            }


        }
        numberOfTurns++;
    }

    else if (numberOfTurns >= 18 && positionArray[X][Y] != 0) {
        //Do nothing when clicked on empty element and show the all possible moves that
        // a player have after clicking on a  particular position of his own color.

        if (numberOfTurns % 2 != 0 && positionArray[X][Y] == 2) {
            //Player two made a move, hence made a block fade red.
            isActiveRed = true;
            updateLastParam(xCenter, yCenter, X, Y);
            context.beginPath();
            context.arc(xCenter, yCenter, blockWidth, 0, 2 * Math.PI, false);
            context.fillStyle = '#FFCDD2';
            context.fill();
            context.lineWidth = strokeWidth;
            context.strokeStyle = '#003300';
            context.stroke();
        }
        else if (numberOfTurns % 2 == 0 && positionArray[X][Y] == 1) {
            //Player one just made a move, hence made a block green
            isActiveGreen = true;
            updateLastParam(xCenter, yCenter, X, Y);
            context.beginPath();
            context.arc(xCenter, yCenter, blockWidth, 0, 2 * Math.PI, false);
            context.fillStyle = '#AED581';
            context.fill();
            context.lineWidth = strokeWidth;
            context.strokeStyle = '#003300';
            context.stroke();
        }

    }

    for (var r = 0; r < 7; r++) {
        console.log(positionArray[0][r] + "\t" + positionArray[1][r] + "\t" + positionArray[2][r] + "\t" +
            positionArray[3][r] + "\t" + positionArray[4][r] + "\t" + positionArray[5][r] + "\t" + positionArray[6][r]);
    }
    console.log("\n");
    console.log("Green Left : " + greenBlocks + ", Red Left : " + redBlocks + "\n");

    checkGameOver();
}

canvas.addEventListener("click", mouseClick);

function mouseClick(event) {
    //Get the X and Y co-ordinate at the point of touch in canvas
    var X = event.clientX - (canvas.getBoundingClientRect()).left;
    var Y = event.clientY - (canvas.getBoundingClientRect()).top;

    //Check if touch event occurs in canvas or not
    if ((X >= 0 && X <= 550) && (Y >= 0 && Y <= 550)) {
        if ((X >= 0 && X <= 75) && (Y >= 0 && Y <= 75)) {
            makeMove(0, 0);
        } else if ((X >= 235 && X <= 315) && (Y >= 0 && Y <= 75)) {
            makeMove(3, 0);
        } else if ((X >= 475 && X <= 550) && (Y >= 0 && Y <= 75)) {
            makeMove(6, 0);
        }
        else if ((X >= 75 && X <= 155) && (Y >= 75 && Y <= 155)) {
            makeMove(1, 1);
        } else if ((X >= 235 && X <= 315) && (Y >= 75 && Y <= 155)) {
            makeMove(3, 1);
        } else if ((X >= 395 && X <= 475) && (Y >= 75 && Y <= 155)) {
            makeMove(5, 1);
        }
        else if ((X >= 155 && X <= 235) && (Y >= 155 && Y <= 235)) {
            makeMove(2, 2);
        } else if ((X >= 235 && X <= 315) && (Y >= 155 && Y <= 235)) {
            makeMove(3, 2);
        } else if ((X >= 315 && X <= 395) && (Y >= 155 && Y <= 235)) {
            makeMove(4, 2);
        }
        else if ((X >= 0 && X <= 75) && (Y >= 235 && Y <= 315)) {
            makeMove(0, 3);
        } else if ((X >= 75 && X <= 155) && (Y >= 235 && Y <= 315)) {
            makeMove(1, 3);
        } else if ((X >= 155 && X <= 235) && (Y >= 235 && Y <= 315)) {
            makeMove(2, 3);
        } else if ((X >= 315 && X <= 395) && (Y >= 235 && Y <= 315)) {
            makeMove(4, 3);
        } else if ((X >= 395 && X <= 475) && (Y >= 235 && Y <= 315)) {
            makeMove(5, 3);
        } else if ((X >= 475 && X <= 550) && (Y >= 235 && Y <= 315)) {
            makeMove(6, 3);
        }
        else if ((X >= 155 && X <= 235) && (Y >= 315 && Y <= 395)) {
            makeMove(2, 4);
        } else if ((X >= 235 && X <= 315) && (Y >= 315 && Y <= 395)) {
            makeMove(3, 4);
        } else if ((X >= 315 && X <= 395) && (Y >= 315 && Y <= 395)) {
            makeMove(4, 4);
        }
        else if ((X >= 75 && X <= 155) && (Y >= 395 && Y <= 475)) {
            makeMove(1, 5);
        } else if ((X >= 235 && X <= 315) && (Y >= 395 && Y <= 475)) {
            makeMove(3, 5);
        } else if ((X >= 395 && X <= 475) && (Y >= 395 && Y <= 475)) {
            makeMove(5, 5);
        }

        else if ((X >= 0 && X <= 75) && (Y >= 475 && Y <= 550)) {
            makeMove(0, 6);
        } else if ((X >= 235 && X <= 315) && (Y >= 475 && Y <= 550)) {
            makeMove(3, 6);
        } else if ((X >= 475 && X <= 550) && (Y >= 475 && Y <= 550)) {
            makeMove(6, 6);
        }
    }
}

function updateLastParam(xCenter, yCenter, X, Y) {
    lastCenterX = xCenter;
    lastCenterY = yCenter;
    lastX = X;
    lastY = Y;
}

function turnOffActive(x, y) {
    context.beginPath();
    context.arc(x, y, blockWidth, 0, 2 * Math.PI, false);
    if (isActiveRed) {
        context.fillStyle = '#F44336';
    } else {
        context.fillStyle = '#2E7D32';
    }
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003300';
    context.stroke();
    isActiveRed = false;
    isActiveGreen = false;
}

function turnOffMill() {
    isMillGreen = false;
    isMillRed = false;
}

function clearBlock(xI, yI) {
    //Clear canvas at previous position
    context.clearRect(xI - blockWidth - strokeWidth, yI - blockWidth - strokeWidth,
        2 * (blockWidth + strokeWidth), 2 * ( blockWidth + strokeWidth));
    positionArray[lastX][lastY] = 0;

}

function drawBlock(x, y, X, Y) {
    context.beginPath();
    context.arc(x, y, blockWidth, 0, 2 * Math.PI, false);
    if (isActiveRed) {
        positionArray[X][Y] = 2;
        context.fillStyle = '#F44336';
        if (checkMill(X, Y, 2)) {
            isMillRed = true;
            document.getElementById("message").innerHTML = "Click on any green block to remove it.";
        }
    } else {
        positionArray[X][Y] = 1;
        context.fillStyle = '#2E7D32';
        if (checkMill(X, Y, 1)) {
            isMillGreen = true;
            document.getElementById("message").innerHTML = "Click on any red block to remove it.";
        }
    }
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003300';
    context.stroke();

    isActiveGreen = false;
    isActiveRed = false;
    numberOfTurns++;
    update();
}

function checkThreeleft() {
    //Check if less than or equal to three players left.

}

function checkMill(x, y, playerCode) {
    //Using the fact that two mills cannot occur simultaneously
    var flag = 0;
    var temp = 0;
    //Transverse through the given row and column and check for mill
    for (var i = 0; i < 5; i++) {
        flag = 0;
        for (var j = temp; j < temp + 3; j++) {
            if (positionArray[j][y] == playerCode) {
                continue;
            } else {
                flag = 1;
                break;
            }
        }
        if (flag == 0) {
            console.log("This is from : " + 1);
            return true;
        } else {
            temp++;
        }
    }

    flag = 0;
    temp = 0;
    //Now moving along the given column
    for (var k = 0; k < 5; k++) {
        flag = 0;
        for (var l = temp; l < temp + 3; l++) {
            if (positionArray[x][l] == playerCode) {
                continue;
            } else {
                flag = 1;
                break;
            }
        }
        if (flag == 0) {
            console.log("This is from : " + 2);
            return true;
        } else {
            temp++;
        }
    }

    var check = true;
    var oppositeCode = (playerCode == 1) ? 2 : 1;
    for (var a = 0; a < 7; a++) {
        if ((positionArray[a][y] == oppositeCode) || (positionArray[a][y] == 0)) {
            check = false;
            break;
        }
    }
    if (check == true) {
        console.log("This is from : " + 3);
        return true;
    }
    check = true;

    for (var b = 0; b < 7; b++) {
        //Check for any empty element of any element of anther type
        if ((positionArray[x][b] == oppositeCode) || (positionArray[x][b] == 0)) {
            check = false;
            break;
        }
    }
    if (check == true) {
        console.log("This is from : " + 4);
        return true;
    }

    return false;
}

function checkGameOver() {
    //If less than 3 players left of any team.
    if (numberOfTurns >= 18) {
        if (redBlocks < 3 || greenBlocks < 3) {
            alert("Player " + ((greenBlocks < 3) ? 2 : 1) + " wins !");
            location.reload(true);
        }
        else {
            //Check if no adjacent element available for any of the player.

        }


    }
}

function update() {
    //Update player turn
    if (numberOfTurns % 2 != 0) {
        document.getElementById("turn").innerHTML = "Turn : P2";
    } else {
        document.getElementById("turn").innerHTML = "Turn : P1";
    }
}
