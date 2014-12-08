var dealtCards = new Array(52);


for (i = 0; i < 52; ++i) {
    dealtCards[i] = false;
}

var AI_Castle_Down = new Array(3);
var PL_Castle_Down = new Array(3);
var AI_Castle_Up = new Array(3);
var PL_Castle_Up = new Array(3);
var PL_Hand = [];
var AI_Hand = [];
var Pile = [];

startGame();

/**
 * This function initiates the game state which includes:
 * -Populate down cards
 * -Populate up cards
 * -Populate AI Hand
 * -Populate Player Hand
 */
function startGame() {
    for(i = 0; i < 3; ++i) {
        AI_Castle_Down[i] = drawCard();
        PL_Castle_Down[i] = drawCard();
        AI_Castle_Up[i] = drawCard();
        PL_Castle_Up[i] = drawCard();
        AI_Hand.push(drawCard());

    }

    updateGraphics();
}

/**
 * This function deals a random card and updates the boolean array dealtCards[]
 * to ensure that only unique cards are dealt.
 *
 * @returns {number}
 */
function drawCard() {
    var dealt = false;

    do {
        var val = Math.floor((Math.random() * 100) % 52);

        console.log(val);

        if (!dealtCards[val]) {
            dealtCards[val] = true;
            dealt = true;


        }
    } while (!dealt);

    return val;
}

//function

/**
 *  This function updates the game field divs that display cards with the values that
 *  are in the PL_Castle_Up and AI_Castle_up arrays.
 */
function updateGraphics() {
    document.getElementById("PL_Card1").innerHTML = valToText(PL_Castle_Up[0]);
    document.getElementById("PL_Card2").innerHTML = valToText(PL_Castle_Up[1]);
    document.getElementById("PL_Card3").innerHTML = valToText(PL_Castle_Up[2]);
    document.getElementById("AI_Card1").innerHTML = valToText(AI_Castle_Up[0]);
    document.getElementById("AI_Card2").innerHTML = valToText(AI_Castle_Up[1]);
    document.getElementById("AI_Card3").innerHTML = valToText(AI_Castle_Up[2]);
    document.getElementById("")
}

/**
 * This function accepts a value representing a card and returns the text equivalent
 * of that value for simplified graphics display.
 *
 * @param val
 * @returns {string}
 */
function valToText(val) {
    var card = val % 13;
    var suite = val / 13;

    suite = Math.floor(suite);

    switch (suite) {
        case 0:
            suite = "Club";
            break;

        case 1:
            suite = "Diamond";
            break;

        case 2:
            suite = "Heart";
            break;

        case 3:
            suite = "Spade";
            break;
    }

    switch (card) {
        case 0:
            card = "2";
            break;

        case 1:
            card = "3";
            break;

        case 2:
            card = "4";
            break;

        case 3:
            card = "5";
            break;

        case 4:
            card = "6";
            break;

        case 5:
            card = "7";
            break;

        case 6:
            card = "8";
            break;

        case 7:
            card = "9";
            break;

        case 8:
            card = "10";
            break;

        case 9:
            card = "J";
            break;

        case 10:
            card = "Q";
            break;

        case 11:
            card = "K";
            break;

        case 12:
            card = "A";
            break;
    }

    return (card + " " + suite);
}
