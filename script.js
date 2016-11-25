/*
* @method compare an array numbers
* @param {array} ar An Array of random Numbers
* @return {array} ar An Array of Numbers from the largest to the smallest
*/

function compare(ar) {
    function compareNumeric(a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
    }
    ar.sort(compareNumeric);
    return ar;
}

/*
* @method random number creature
* @return {Number} number The one random number from 2 to 14 or 102 to 114 or 202 to 214 or 302 to 314
**/
function random() {
    var number,
        i = 0;
    for (;; i++) {
        number = Math.round(Math.random()*1000);
        if (number >= 2 && number <= 14 || number >= 102 && number <= 114 || number >= 202 && number <= 214 || number >= 302 && number <= 314) {
            break;
        }
    }
    return number;
}

/*
* @method random array creature
* @param {Number} value The quantity of poker players
* @ return {Array} arr The array of random numbers(Each player gets 2 cards and 5 cards on the table)
*/

function array(value) {
    var number = value * 2 + 5;
    var arr = [];
    for (var i = 0; i < number; i++) {
        arr = arr + "," + random();
        arr = arr.split(",");
        if (i == 0) {
            arr.shift();
        }
        for (var n = 0; n < i; n++) {
            if (arr[n] == arr[i]) {
                arr.splice(i, 1);
                i--;
            }
        }
    }
    return arr;
}

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

/*
 * @method calculate, is it array numbers a street combination
 * @param {Array} arr Array of random numbers
 * @return {Number) if combination is street, return the largest of numbers * 1e+8, else return 0
 */

function street(arr) {
    var a = [], b = [], c = [], ar = [],
        length;
    for (var ii = 0; ii < arr.length; ii++) {
        ar[i] = arr[i];
    }
    length = ar.length;
    /*adding A as 1 if A, 2, 3, 4, 5 */
    for (var z = 0; z < length; z++) {
        if (ar[z] == 14) {
            ar.push(1);
        }
        else if (ar[z] == 114) {
            ar.push(101);
        }
        else if (ar[z] == 214) {
            ar.push(201);
        }
        else if (ar[z] == 314) {
            ar.push(301);
        }
    }
    length = ar.length;
    for (var i = 0; i < length; i++) {
        for (var n = 0; n < length; n++) {
            if ((Math.abs(ar[i] % 100 - ar[n] % 100) == 1) && i != n) {
                a = a + ar[i] + ", " + ar[n] + ", ";
            }
        }
    }
    if (a.length >= 5) {
        a = a.split(", ");
        a.pop(); /* cutting last "," */
        for (var m = 0; m < a.length; m++) {
            for (var k = 1; k < a.length; k++) {
                if (a[m] == a[k] && m != k) {
                    a.splice(k, 1);
                }
            }
        }

        for (var l = 0; l < a.length; l++) {
            for (var o = 0; o < a.length; o++) {
                if ((Math.abs(a[l] % 100 - a[o] % 100) == 2) && a != o) {
                    b = b + a[l] + ", " + a[o] + ", ";
                }
            }
        }
        if (b.length >= 5) {
            b = b.split(", ");
            b.pop();
            for (var w = 0; w < b.length; w++) {
                for (var q = 1; q < b.length; q++) {
                    if (b[w] == b[q] && w != q) {
                        b.splice(q, 1);
                    }
                }
            }
            for (var v = 0; v < b.length; v++) {
                b[v] = b[v] % 100;
            }
            c = compare(b);
            if (c.length >= 5) {
                for (var x = c.length - 1; x > c.length/2; x--) {
                    if (c[x - 1] - c[x] > 1) {
                        c.splice(x, 1);
                    }
                }
                for (var x = Math.round(c.length/2); x >= 0; x--) {
                    if (c[x - 1] - c[x] > 1) {
                        c.splice(x - 1, 1);
                    }
                }

                for (var x = 0; x <= Math.round(c.length/2); x++) {
                    if (c[x] - c[x + 1] > 1) {
                        c.splice(x, 1);
                    }
                }
                for (var x = Math.round(c.length/2); x < c.length; x++) {
                    if (c[x] - c[x + 1] > 1) {
                        c.splice(x + 1, 1);
                    }
                }
            }
            for (var r = 0; r < c.length; r++) {
                for (var t = 0; t < c.length; t++) {
                    if (c[r] == c[t] && r != t) {
                        c.splice(t, 1);
                    }
                }
            }
        }
    }
    if (c.length >= 5) {
        return c[0] * 1e+8;
    }
    else return 0;
}

/*
 * @method calculate, is it array numbers a flesh combination
 * @param {Array} arr Array of random numbers
 * @return {Number)
  *
 * if combination is flesh,
 * return the number: result[0] * 1e+10 + result[1] * 1e+8 + result[2] * 1e+6 + result[3] * 1e+4 + result[4] * 1e+2,
 * where result is array of flesh members,
 * result[0] > result[1] > result[2] > result[3] > result[4],
 *
 * else if street flesh, return the largest of numbers * 1e+16
 *
 * else return 0
 */

function flesh(arr) {
    var zero, one, two, three,
        a = [], b = [], c = [], d = [], result =[], s =[], ar =[],
        length = arr.length;
    zero = one = two = three = 0;
    for (var ii = 0; ii < length; ii++) {
        ar[i] = arr[i];
    }
    for (var i = 0; i < length; i++) {
        if (ar[i] <= 14 && ar[i] >= 2) {
            zero++;
            a = a + ar[i] + ", ";
        }
        else if (ar[i] <= 114 && ar[i] >= 102) {
            one++;
            b = b + ar[i] + ", ";
        }
        else if (ar[i] <= 214 && ar[i] >= 202) {
            two++;
            c = c + ar[i] + ", ";
        }
        else if (ar[i] <= 314 && ar[i] >= 302) {
            three++;
            d = d + ar[i] + ", ";
        }
    }
    if (zero >= 5) {
        a = a.split(", ");
        a.pop(); /* cutting last "," */
        result = a;
    }
    else if (one >= 5) {
        b = b.split(", ");
        b.pop();
        result = b;
    }
    else if (two >= 5) {
        c = c.split(", ");
        c.pop();
        result = c;
    }
    else if (three >= 5) {
        d = d.split(", ");
        d.pop();
        result = d;
    }
    s = street(result); /* street flesh*/
    if (s != 0) {
        return (s*1e+8);
    }
    else if (result != 0) {
        for (var u = 0; u < result.length; u++) {
            result[u] = parseInt(result[u]);
            result[u] = result[u] % 100;
        }
        result = compare(result);   /* flesh */
        return (result[0] * 1e+10 + result[1] * 1e+8 + result[2] * 1e+6 + result[3] * 1e+4 + result[4] * 1e+2);
    }
    else {
        return 0;
    }

}

/*
 * @method calculate, is it array numbers a couple, triple, square combination
 * @param {Array} arr Array of random numbers
 * @return {Number) result
 * if combination is couple, return couple number * 1e+2,
 *
  * else if combination is 2 couples, return the largest number * 1e+4
  * plus the smallest(or the next after the largest, if 3 couple) * 1e+2,
  *
  * else if combination is triple, return triple number * 1e+6,
  *
  * else if combination is full house, return triple number * 1e+12
  * plus couple(or the largest couple) * 1e+10,
  *
  * else if combination is square, return square number * 1e+14,
  *
  * else return 0.
 */

function couple(arr) {
    var count1, count2, count3,
        a, b, c, sub, result,
        ar = [];
    a = b = c = sub = result = 0;
    count1 = count2 = count3 = 0;


    for (var n = 0; n < arr.length; n++) {
        ar[n] = arr[n] % 100;
    }
    ar = compare(ar);
    for (var i = 1; i < ar.length; i++) {
        if (ar[i] != ar[i - 1]) {
            ar.splice(0, 1);
        }
        if (a == ar[i] || a == 0) {
            if (ar[i] == ar[i - 1]) {   /* first couple */
                a = ar[i];
                count1++;
            }
        }
        else if (b == ar[i] || b == 0) { /* second couple */
            if (ar[i] == ar[i - 1]) {
                b = ar[i];
                count2++;
            }
        }
        else if (c == ar[i] || c == 0) {  /* third couple */
            if (ar[i] == ar[i - 1]) {
                c = ar[i];
                count3++;
            }
        }
    }

    /* possible combinations of count1, count2, count3:
     100 - couple
     110 - 2 couples
     111 - 3 couples (needs to be made to 110)
     200 - triple
     210 - full house
     211 - full house + couple (needs to be made to 210)
     220 - 2 triples or full house + one similar (needs to be made to 210)
     300 - square
     310 - square + couple (needs to be made to 300)
     320 - square + triple (needs to be made to 300)*/


    if ((count1 == 1 && count2 == 1 && count3 == 1) || (count1 == 2 && count2 == 1 && count3 == 1)) {
        count3 = 0;
    }
    /* change position "b" to "a"(will be made the first) and "a" to "b"(will be made the second) because of "b" has bigger value than "a" and needs to be reversed for further giving priority use  */
    else if (count2 == 2 && count1 == 1 && count3 == 1) {
        sub = b;
        b = a;
        a = sub;
        count3 = 0;
    }
    /* change position: "c" to "a"(will be made the first), "a"  to "b" (will be made the second), "b" (will be made the last) */
    else if (count3 == 2 && count1 == 1 && count2 == 1) {
        sub = c;
        b = a;
        a = sub;
        count1 = 2;
        count3 = 0;
    }
    else if (count1 == 2 && count2 == 2 && count3 == 0) {
        count2 = 1;
    }
    else if (count1 == 1 && count2 == 2 && count3 == 0) {
        sub = a;
        a = b;
        b = sub;
        count1 = 2;
        count2 = 1;

    }
    else if (count1 == 3 && (count2 == 2 || count2 == 1)) {
        count2 = 0;
    }
    else if (count2 == 3 && (count1 == 2 || count1 == 1)) {
        sub = b;
        b = a;
        a = sub;
        count1 = 3;
        count2 = 0;
    }

    if (count1 == 3) {
        count1 = 1e+14;
    }
    else if (count1 == 2 && count2 == 1) {
        count1 = 1e+12;
        count2 = 1e+10;
    }
    else if (count1 == 2 && count2 == 0) {
        count1 = 1e+6;
    }
    else if (count1 == 1 && count2 == 1) {
        count1 = 1e+4;
        count2 = 1e+2;
    }
    else if (count1 == 1 && count2 == 0) {
        count1 = 1e+2;
    }
    result = a * count1 + b * count2 + c * count3;

    return result;
}

/*
* @method array priority
* @param {Array} ar An Array of random numbers
* @return {Number} result
* determined, Array has flesh or street or square or full house or triple or 2 couples or couple combination
*
* return combination's priority:
* street flash - 1e+16
* square - 1e+14
* full house - 1e+12
* flesh - 1e+10
* street - 1e+8
* triple - 1e+6
* 2 couples - 1e+4
* couple - 1e+2
* hight card - 1e+0 (the second card  - 1e-2)
*
*/

function priority(ar) {
    var coup,
        high1, high2,
        result,
        text;
    high1 = ar[0] % 100;
    high2 = ar[1] % 100;
    ar.flesh = flesh(ar);
    ar.street = street(ar);
    ar.couple = couple(ar);
    if (ar.flesh >= 1e+16) {
        console.log("street flash");
        result = ar.flesh;
    }
    else if (ar.couple >= 1e+14 && ar.couple < 1e+16) {
        text = "square";
        result = ar.couple;
    }
    else if (ar.couple >= 1e+12 && ar.couple < 1e+14) {
        text = "full house";
        result = ar.couple;
    }
    else if (ar.flesh >= 1e+10) {
        text = "flesh";
        result = ar.flesh;
    }
    else if (ar.street >= 1e+8 && ar.street < 1e+10) {
        text = "street";
        result = ar.street;
    }
    else if (ar.couple >= 1e+6 && ar.couple < 1e+8) {
        text = "triple";
        result = ar.couple;
    }
    else if (ar.couple >= 1e+4 && ar.couple < 1e+6) {
        text = "two couples";
        result = ar.couple;
    }
    else if (ar.couple >= 1e+2 && ar.couple < 1e+4) {
        text = "couple";
        result = ar.couple;
    }

    else {
        text = "high card";
        if (high1 > high2) {
            result = high1 + high2/100;
        }
        else {
            result = high2 + high1/100;
        }
    }
    var show = $('.result').children();
    var player = '';
    if (show.length == 2) {
        player = "Первый игрок получает комбинацию: ";
    }
    if (show.length == 3) {
        player = "Второй игрок получает комбинацию: ";
    }
    $('.result').append("<div>" + player + " " + text + "; Приоритет комбинации: " + result + "</div>");

    return result;
}


$("[type='checkbox']").on("click", function() {
    $("[type='checkbox']").not(this).attr("checked", false);
    $(this).attr("checked", true);
});

$('.question [type="button"]').on('click', function () {
    if ($("[type='checkbox']").is(":checked")) {
        var value = 2, arr, a, first0, first1;
        arr = array(value);
        $('.result').empty();
        $("div.memory").html(arr.join(", "));
        a = arr.splice(0, 2);
        $(".question").css("display", "none").css("z-index", "-1");
        $('.play [type="button"]').val("Продолжить");
        first0 = (a[0] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(a[0] / 100)) + "%";
        first1 = (a[1] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(a[1] / 100)) + "%";
        $(".one").css("background-position", first0);
        $(".two").css("background-position", first1);
    }
});

$('.play [type="button"]').on('click', function () {
    $(".result").css("display", "none");
    if ($(".question").css("display") == "none") {
        $(".question").css("display", "none").css("z-index", "-10");
        var arr, a, b, main0, main1, main2, main3, main4, second0, second1;
        var rate, sumComputer, sumPlayer, length, number,
            ar, br, ap, bp;
        arr = $("div.memory").html().split(", ");
        a = arr.splice(0, 2);
        b = arr.splice(0, 2);
        second0 = (b[0] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(b[0] / 100)) + "%";
        second1 = (b[1] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(b[1] / 100)) + "%";
        main0 = (arr[0] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(arr[0] / 100)) + "%";
        main1 = (arr[1] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(arr[1] / 100)) + "%";
        main2 = (arr[2] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(arr[2] / 100)) + "%";
        main3 = (arr[3] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(arr[3] / 100)) + "%";
        main4 = (arr[4] % 100 - 2) * 100 / 12 + "% " + 25 * (Math.round(arr[4] / 100)) + "%";
        if ($(this).val() == "Играть дальше") {
            $(".question").css("display", "block").css("z-index", "1");
            $(".background div").css("background-position", "0% 100%");
        }
        else {
            if ($(".five").css("background-position") == "0% 100%") {
                $(".five").css("background-position", main0);
                $(".six").css("background-position", main1);
                $(".seven").css("background-position", main2);
            }
            else if ($(".eight").css("background-position") == "0% 100%") {
                $(".eight").css("background-position", main3);
            }
            else if ($(".nine").css("background-position") == "0% 100%") {
                $(".nine").css("background-position", main4);
            }
            else {
                $(".three").css("background-position", second0);
                $(".four").css("background-position", second1);
                $(this).val("Играть дальше");
                $(".result").css("display", "block");

                /*calculate*/
                length = $("[type='checkbox']").length;
                for (var i = 0; i < length; i++) {
                    if ($("[type='checkbox']").eq(i).is(":checked")) {
                        number = i;
                    }
                }



                rate = $("[type='checkbox']").eq(number).next().html();
                rate = parseInt(rate);
                sumComputer = $(".computer p").text();
                sumComputer = parseInt(sumComputer) - rate;
                sumPlayer = $(".player p").text();
                sumPlayer = parseInt(sumPlayer) - rate;
                $(".computer p").text(sumComputer);
                $(".player p").text(sumPlayer);

                ar = (a + "," + arr).split(",");
                br = (b + "," + arr).split(",");
                ap = priority(ar);
                bp = priority(br);

                var text;
                if (ap > bp) {
                    sumPlayer = sumPlayer + rate * 2;
                    text = "Победил первый игрок";
                }
                else if (ap == bp) {
                    text = "Ничья";
                    sumPlayer = sumPlayer + rate;
                    sumComputer = sumComputer + rate;
                }
                else {
                    sumComputer = sumComputer + rate * 2;
                    text = "Победил второй игрок";
                }
                $('.result').append("<div>" + a + "<br>" + b + "<br>"+ arr + "<br>" + text + "<form><button>Ok</button></form>" + "</div>");
                $(".computer p").text(sumComputer);
                $(".player p").text(sumPlayer);
                $("[type='checkbox']").attr("checked", false);
            }
        }
    }

    $(".result button").on("click", function() {
        $(".result").css("display", "none");
    });
});



