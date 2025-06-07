$("button").css("cursor", "pointer");
let audioPlayed = false;
let userColor = [];
var level = 1;
var comColor = [];
let acceptingInput = false;
function stLevel(callback) {
    $(".topic,.mobileTopic").hide();
    $(".levels").show()
    var arambikalama = new Audio("audio/start.mp3");
    arambikalama.play();
    arambikalama.addEventListener("ended", function () {
        callback();
    });
    audioPlayed = true;
}
$(document).keypress(function (event) {
    if (event.key === "s" && !audioPlayed) {
        stLevel(stGame);
    }
});
$(".start").on("click touchstart", function (e) {
    stLevel(stGame);
    e.preventDefault();
});
function clickColor(track) {
    $("." + track).addClass("ani");
    var sound = new Audio("audio/" + track + ".mp3");
    sound.play();
    setTimeout(function () {
        $("." + track).removeClass("ani");
    }, 200);
}
$("button").click(function () {
    if (!acceptingInput) return;
    let classtrack = $(this).attr("class");
    userColor.push(classtrack);
    console.log(userColor);
    clickColor(classtrack);
    forCheck(userColor.length - 1);
});
function stGame() {
    acceptingInput = false;
    var ranNum = Math.floor(Math.random() * 4) + 1;
    var col = "";
    if (ranNum === 1) col = "red"
    else if (ranNum === 2) col = "green";
    else if (ranNum === 3) col = "blue";
    else if (ranNum === 4) col = "yellow";
    comColor.push(col);
    $("." + col).addClass("ani");
    var sound = new Audio("audio/" + col + ".mp3");
    sound.play();
    setTimeout(function () {
        $("." + col).removeClass("ani");
        acceptingInput = true;
        userColor = [];
    }, 200);
}
function forCheck(index) {
    if (comColor[index] === userColor[index]) {
        if (userColor.length === comColor.length) {
            level++;
            $(".levels").html("LEVEL " + level);
            acceptingInput = false;
            setTimeout(() => {
                stGame();
            }, 1000);
        }
    } else {
        $(".start").hide();
         $(".red,.green,.blue,.yellow").hide()
        $(".levels").hide()
        $(".endMessage").show()
        var sco=level-1;
        $(".score").html("YOUR SCORE IS "+sco).show()
        $("body").addClass("wBack");
        var wrong = new Audio("audio/wrong.mp3");
        wrong.play();
        setTimeout(function () {
            $("body").removeClass("wBack");
        }, 200);
        acceptingInput = false;
    }
}
