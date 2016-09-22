/**
 * Created by Rahul on 9/22/2016.
 */

var numberOfTurns = 0;
var totalPositions = 24;
var positionArray = new Array(7);
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");


function initializeGame() {
    initializeArray();
  //  alert("Player 1 turns first followed by Player 2");
    makeMove();
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

function update() {

}
function makeMove(X, Y) {
    var yCenter;
    var xCenter;
    //Here X, Y are the index of array at which touch event occurred
    if (positionArray[X][Y] == 0 && numberOfTurns <=18) {
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

        console.log("Index : " + X + "  " + Y + "\n");
        console.log("Center : " + xCenter + "  " + yCenter + "\n");
        //Place is empty, hence make a move here
        if (numberOfTurns % 2 != 0) {
            //Player two made a move, hence made a block blue.
            positionArray[X][Y] = 2;
            context.beginPath();
            context.arc(xCenter, yCenter, 16, 0, 2 * Math.PI, false);
            context.fillStyle = 'red';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();

            document.getElementById("turn").innerHTML = "P1 turn";
        }
        else {
            //Player one just made a move, hence made a block red
            positionArray[X][Y] = 1;
            context.beginPath();
            context.arc(xCenter, yCenter, 16, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();


            document.getElementById("turn").innerHTML = "P2 turn";

        }
        numberOfTurns++;
    }else if(numberOfTurns >18 && positionArray[X][Y] !=0){
        //Do nothing when clicked on empty element and show the all possible moves that a player have after clicking on a
        //particular position of his own color.
        

    }

    update();
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
