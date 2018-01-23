
document.querySelector(".question input[type='button']").onclick = function () {

/*combination's priority:
 street flash - 1e+16
 square - 1e+14
 full house - 1e+12
 flesh - 1e+10
 street - 1e+8
 triple - 1e+6
 2 couples - 1e+4
 couple - 1e+2 (the second card  - 1e-2)
 */
    var Result = function Result(cardsArray) {
        var straight,
            flush,
            pairs,
            CardsClone;

        CardsClone = function () { //clone array of card for future manipulation
            var key = 0,
                cardsLength = cardsArray.length,
                cloneCards = [];
            for (; key < cardsLength; key += 1) {
                cloneCards[key] = cardsArray[key];
            }
            return cloneCards;
        };

        straight = function () {
            var i = 0,
                cards = new CardsClone(),
                cardsLength,
                count = -1;
            cards = remainder(cards);
            cards = unique(cards);
            cardsLength = cards.length;
            for (; i < cardsLength - 4; i += 1) {
                if (4 == (cards[i] - cards[i + 4])) {
                    count = i;
                    break;
                }
            }
            if (-1 != count) {
                return cards[count] * 1e+8;
            }
            return 0;
        };

        flush = function () {
            var cards = new CardsClone(),
                suites = {
                    'first': [], //the first suit
                    'second': [], //the second suit
                    'third': [], //the third suit
                    'fourth': [] //the fourth suit

                },
                i = 0,
                cardsLength,
                straightFlush,
                result;
            cardsLength = cards.length;
            for (; i < cardsLength; i += 1) {
                if (cards[i] <= 14 && cards[i] >= 2) {
                    suites.first.push(cards[i]);
                }
                else if (cards[i] <= 114 && cards[i] >= 102) {
                    suites.second.push(cards[i]);
                }
                else if (cards[i] <= 214 && cards[i] >= 202) {
                    suites.third.push(cards[i]);
                }
                else if (cards[i] <= 314 && cards[i] >= 302) {
                    suites.fourth.push(cards[i]);
                }
            }
            if (suites.first.length >= 5) {
                result = suites.first;
            }
            else if (suites.second.length >= 5) {
                result = suites.second;
            }
            else if (suites.third.length >= 5) {
                result = suites.third;
            }
            else if (suites.fourth.length >= 5) {
                result = suites.fourth;
            }
            else {
                return 0;
            }
            result.sort(compareNumeric);
            straightFlush = straight(result);
            if (straightFlush != 0) {
                return straightFlush * 1e+8;
            }
            result = remainder(result);
            return result[0] * 1e+10 + result[1] * 1e+8 + result[2] * 1e+6 + result[3] * 1e+4 + result[4] * 1e+2;
        };

        pairs = function () {
            /* possible length combinations of pair1, pair2, pair3:
             100 - pair
             110 - 2 pairs
             111 - 3 pairs (needs to be made to 110)
             200 - triple
             210 - full house
             211 - full house + pair (needs to be made to 210)
             220 - 2 triples or full house + one similar (needs to be made to 210)
             300 - square
             310 - square + pair (needs to be made to 300)
             320 - square + triple (needs to be made to 300)*/
            var cards = new CardsClone(),
                i = 1,
                pairsArray = {
                    'pair1': [],
                    'pair2': [],
                    'pair3': []
                },
                subPair;
            cards = remainder(cards);
            cards.sort(compareNumeric);
            for (; i < cards.length; i += 1) {
                if (cards[i] == cards[i - 1]) {
                    if (pairsArray.pair1[0] == cards[i] || 0 == pairsArray.pair1.length) {
                        pairsArray.pair1.push(cards[i]);
                    }
                    else if (pairsArray.pair2[0] == cards[i] || 0 == pairsArray.pair2.length) {
                        pairsArray.pair2.push(cards[i]);
                    }
                    else if (pairsArray.pair3[0] == cards[i] || 0 == pairsArray.pair3.length) {
                        pairsArray.pair3.push(cards[i]);
                    }
                }
            }
            if (pairsArray.pair1.length < pairsArray.pair2.length) {
                subPair = pairsArray.pair1;
                pairsArray.pair1 = pairsArray.pair2;
                pairsArray.pair2 = subPair;
            }
            if (pairsArray.pair1.length < pairsArray.pair3.length) {
                pairsArray.pair2 = pairsArray.pair1;
                pairsArray.pair1 = pairsArray.pair3;
            }

            if (3 == pairsArray.pair1.length) { //square
                return pairsArray.pair1[0] * 1e+14;
            }
            else if (2 == pairsArray.pair1.length && pairsArray.pair2.length >= 1) { //full house
                return pairsArray.pair1[0] * 1e+12 + pairsArray.pair2[0] * 1e+10;
            }
            else if (2 == pairsArray.pair1.length) { //triple
                return pairsArray.pair1[0] * 1e+6;
            }
            else if (1 == pairsArray.pair1.length && 1 == pairsArray.pair2.length) { //two pairs
                return pairsArray.pair1[0] * 1e+4 + pairsArray.pair2[0] * 1e+2;
            }
            else if (1 == pairsArray.pair1.length) { //pair
                return pairsArray.pair1[0] * 1e+2;
            }
            else {
                return 0;
            }
        };

        this.text;

        this.priority = function () {
            var cards = new CardsClone();
            cards = remainder(cards);
            cards.sort(compareNumeric);
            if (flush() > 1e+16) {
                this.text = "Straight flush";
                return flush();
            }
            else if (pairs() > 1e+14) {
                this.text = "Square";
                return pairs();
            }
            else if (pairs() > 1e+12) {
                this.text = "Full house";
                return pairs();
            }
            else if (flush() > 1e+10) {
                this.text = "Flush";
                return flush();
            }
            else if (straight() > 1e+8) {
                this.text = "Straight";
                return straight();

            }
            else if (pairs() > 1e+6) {
                this.text = "Triple";
                return pairs();

            }
            else if (pairs() > 1e+4) {
                this.text = "Two Pairs";
                return pairs();

            }
            else if (pairs() > 1e+2) {
                this.text = "Pair";
                return pairs();
            }
            else {
                this.text = "High Card";
                return cards[0] + cards[1] * 1e-2;
            }
        };
    };


    var Card = function Card() { //single card creation
        var card,
            cardsArray = [],
            i = 0;

        while (i += 1) {
            card = Math.round(Math.random() * 1000);
            if (card >= 2 && card <= 14 || card >= 102 && card <= 114 || card >= 202 && card <= 214 || card >= 302 && card <= 314) {
                break;
            }
        }
        this.card = card;
    };


    var Cards = function (cardsQuantity) {//creation an array of cards
        var card,
            cardsArray = [],
            i = 1,
            j,
            cardsArrayLength,
            count;

        for (; i <= cardsQuantity; i += 1) {
            card = new Card();
            card = card.card;
            count = 0;
            j = 0;
            for (; j < cardsArray.length; j += 1) {
                if (card == cardsArray[j]) {
                    count = 1;
                    i -= 1;
                    break;
                }
            }
            if (0 == count) {
                cardsArray.push(card);
            }
        }

        this.cardsArray = cardsArray;
    };

    function compareNumeric(a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
    }

    function remainder(array) { //returns remainder from 100
        var i = 0,
            arrayLength = array.length,
            newArray = [];
        for (; i < arrayLength; i += 1) {
            newArray.push(array[i] % 100);
        }
        return newArray;
    }

    function unique(array) {
        var i = 1,
            arrayLength = array.length;
        array.sort(compareNumeric);
        for (; i < arrayLength; i += 1) {
            if (array[i] == array[i - 1]) {
                array.splice(i, 1);
            }
        }
        return array;
    }

    var players = 2,
        cardsLength = players * 2 + 5;
    var cards = new Cards(cardsLength);
    cards = cards.cardsArray;
    var firstPlayerCards = [],
        secondPlayerCards = [],
        i = 0;
    for (; i < cardsLength - 2; i++) {
        firstPlayerCards.push(cards[i]);
        secondPlayerCards.push(cards[i + 2]);
    }
    var r1 = new Result(firstPlayerCards);
    var r2 = new Result(secondPlayerCards);

    this.parentNode.parentNode.parentNode.style.display = 'none';
    document.querySelector('.play').style.display = 'block';
    var screenCards = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    for(var k = 0; k < screenCards.length; k += 1) {
        var attr = "." + screenCards[k];
        document.querySelector(attr).style.backgroundPosition = ((cards[k] % 100 - 2) * 100 / 12) + "% " + 25 * (Math.round(cards[k] / 100)) + "%";
    }
    document.querySelector('.result').innerHTML = "<div>" + "Player: " + r1.priority() + " - " + r1.text + "<br\>Computer: "+ r2.priority() + " - " + r2.text + "<form><input type='button' value='OK' onclick='button()' \\></form>" + "</div>";
}.bind(document.querySelector(".question input[type='button']"));


document.querySelector(".play").onclick = function () {
    document.querySelector('.result').style.display = 'block';
};

function button() {
    document.querySelector('.result').innerHTML = '';
    document.querySelector('.result').style.display = 'none';
    document.querySelector(".question").style.display = 'block';
    var screenCards = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    for (var k = 0; k < screenCards.length; k += 1) {
        var attr = "." + screenCards[k];
        document.querySelector(attr).style.backgroundPosition = 0 + "% " + 0 + "%";
    }
}
