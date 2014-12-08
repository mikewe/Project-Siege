function Deck() {
    this.dealtCards = [];
    this.cardsLeft = 52;

    for (i = 0; i < 52; ++i) {
        this.dealtCards.push(false);
    }

     this.getCard = function () {
        var dealt = false;
        var val;

        do {
            val = Math.floor((Math.random() * 100) % 52);

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
    this.cardID = [];
    this.ID = 0;

    this.setID = function(playerName, handType) {
        var string = playerName + handType + this.ID;
        this.cardID.push(string);
        this.ID++;
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
                this.downCards.setID(this.playerName, handType);
            }

            else if (handType === "up") {
                this.upCards.cards.push(card);
                this.upCards.hasUpdate = true;
                this.upCards.setID(this.playerName, handType);
            }

            else if (handType === "hand") {
                this.hand.cards.push(card);
                this.hand.hasUpdate = true;
                this.hand.setID(this.playerName, handType);


                if(this.playerName === "PL") {
                    g_drawNewCard(this.hand.cards.length - 1);
                }
            }
        }
    }

    this.sortHand = function() {

    }
    this.pickUpPile = function() {

    }
    this.playCard = function(ID) {
        var cardID = this.playerName + "hand" + ID;
        var index =  this.hand.cardID.indexOf(cardID);

        var card = this.hand.cards.splice(index, 1);
        this.hand.cardID.splice(index, 1);
        this.hand.ID--;
        pile.cards.push(card);

        g_destroyCard(cardID);

        updateGraphics();
    }
}

var deck = new Deck();
var pile = new Pile();

var player = new Player("PL");
var AI = new Player("AI");

var preparation = false;


startGame();

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

function playTurn(ID) {
    if (preparation){}
    else {
        player.playCard(ID);
    }
}

function updateGraphics() {
    if(player.upCards.hasUpdate || AI.upCards.hasUpdate) {

        for(i = 0; i < 3; i++) {
            document.getElementById(player.upCards.cardID[i]).innerHTML = valToText(player.upCards.cards[i]);
            document.getElementById(AI.upCards.cardID[i]).innerHTML = valToText(AI.upCards.cards[i]);
        }

        player.upCards.hasUpdate = false;
        AI.upCards.hasUpdate = false;
    }

    if(pile.cards.length > 0) {
        document.getElementById("Pile").innerHTML = valToText(pile.cards[pile.cards.length - 1]);
    }
}

function g_drawNewCard(currentIndex) {
    var currentID = player.hand.ID - 1;
    var div = document.createElement("div");
    div.id = player.hand.cardID[currentID];
    div.className = "card";
    div.innerHTML = valToText(player.hand.cards[currentIndex]);
    div.onclick = function() {playTurn(currentID);};
    document.getElementById("PL_Hand").appendChild(div);
}

function g_destroyCard(cardID) {
    var div = document.getElementById(cardID);
    div.parentNode.removeChild(div);
}

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
