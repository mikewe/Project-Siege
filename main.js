function Deck() {
    this.dealtCards = new Array(52);
    this.cardsLeft = 52;

    for (i = 0; i < 52; ++i) {
        this.dealtCards[i] = false;
    }

     this.getCard = function () {
        var dealt = false;

        do {
           var val = Math.floor((Math.random() * 100) % 52);

            if (this.cardsLeft === 0)
                return -1;

            if (!this.dealtCards[val]) {
                this.dealtCards[val] = true;
                dealt = true;
                this.cardsLeft -= 1;
            }
        } while (!dealt);

        return val;
    }
}

function Hand() {;
    this.hasUpdate = false;
    this.cards = [];
    this.cardNames = [];
    this.numberOfCards = 0;

    this.setName = function(playerName, handType) {
        var string = playerName + handType + this.numberOfCards;
        this.cardNames[this.numberOfCards] = string;
        console.log(this.cardNames[this.numberOfCards]);
        this.numberOfCards++;
    }
}

function Pile() {
    this.cards = [];

    this.discard = function() {

    }
}

function Player(playerName) {
    this.playerName = playerName;
    this.downCards = new Hand();
    this.upCards = new Hand();
    this.hand = new Hand();
    this.swap = function () {

    }
    this.drawCard = function(handType) {
        var card = deck.getCard();
        if (card !== -1) {

            if (handType === "down") {
                this.downCards.cards.push(card);
                this.downCards.hasUpdate = true;
                this.downCards.setName(this.playerName, handType);
            }

            else if (handType === "up") {
                this.upCards.cards.push(card);
                this.upCards.hasUpdate = true;
                this.upCards.setName(this.playerName, handType);
            }

            else if (handType === "hand") {
                this.hand.cards.push(card);
                this.hand.hasUpdate = true;
                this.hand.setName(this.playerName, handType);
            }
        }
    }

    this.sortHand = function() {

    }
    this.pickUpPile = function() {

    }
}



var deck = new Deck();

var player = new Player("PL");
var AI = new Player("AI");


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
        player.drawCard("down");
        AI.drawCard("down");
        player.drawCard("up");
        AI.drawCard("up");
        player.drawCard("hand");
        AI.drawCard("hand");
    }

    updateGraphics();
}


/**
 *  This function updates the game field divs that display cards with the values that
 *  are in the PL_Castle_Up and AI_Castle_up arrays.
 */
function updateGraphics() {
    for(i = 0; i < 3; i++) {
        document.getElementById(player.upCards.cardNames[i]).innerHTML = valToText(player.upCards.cards[i]);
        document.getElementById(AI.upCards.cardNames[i]).innerHTML = valToText(AI.upCards.cards[i]);
    }
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
