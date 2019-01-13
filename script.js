try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}

var fontSize = window.outerHeight * 0.32;
var testChar = "Q";
var round = 0;
var fails = 0;
var level = 1;

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses.
recognition.continuous = false;

// This block is called every time the Speech APi captures a line.
recognition.onresult = function (event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    document.getElementById("youSaid").innerHTML = "you said: " + transcript;
    console.log("test char: " + testChar.toUpperCase() + ", you said: " + transcript.toUpperCase());
    transcript = replace(transcript);


    if (testChar.toUpperCase() == transcript.toUpperCase()) {
        document.getElementById("result").innerHTML = "correct";
    } else {
        document.getElementById("result").innerHTML = "false";
        fails = fails + 1;
    }
};

recognition.onstart = function () {
    document.getElementById("recording").innerHTML = "recording status: ON";
}

recognition.onspeechend = function () {
    document.getElementById("recording").innerHTML = "recording status: OFF";
}

recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
        console.log("no speech detected");
    }
    ;
}

recognition.onend = function () {
    nextWord();
}

function replace(text) {
    if (text.toUpperCase() === "OH") {
        return o;
    }
    if (text.toUpperCase() === "ZEDD") {
        return z;
    }
    if (text.toUpperCase() === "BEEF") {
        return p;
    }
    if (text.toUpperCase() === "SAID") {
        return z;
    }
    if (text.toUpperCase() === "BE") {
        return p;
    }
    if (text.toUpperCase() === "HE") {
        return e;
    } else {
        return text;
    }

}

function setFont(level) {
    if (level === 1) {
        fontSize = 100
    }
    if (level === 2) {
        fontSize = fontSize *0.47
    }
    if (level === 3) {
        fontSize = fontSize * 0.8
    }
    if (level === 4) {
        fontSize = fontSize * 0.83
    }
    if (level === 5) {
        fontSize = fontSize * 0.8
    }
    if (level === 6) {
        fontSize = fontSize * .75
    }
    if (level === 7) {
        fontSize = fontSize * 0.83
    }
    if (level === 8) {
        fontSize = fontSize * 0.8
    }
    if (level === 9) {
        fontSize = fontSize * 0.75
    }

}

function nextWord() {
    document.getElementById("round").innerHTML = "round: " + round;
    document.getElementById("level").innerHTML = "level: " + level;
    document.getElementById("fails").innerHTML = "fails: " + fails;
    console.log("fails: " + fails);
    console.log("round: " + round);
    console.log("level: " + level);
    console.log("############ NEXT WORD ############");
    round = round + 1;
    if (fails >= 2) {
        if (level === 1) {
            document.getElementById("score").innerHTML = "20/200";
        }
        if (level === 2) {
            document.getElementById("score").innerHTML = "20/100";
        }
        if (level === 3) {
            document.getElementById("score").innerHTML = "20/80";
        }
        if (level === 4) {
            document.getElementById("score").innerHTML = "20/63";
        }
        if (level === 5) {
            document.getElementById("score").innerHTML = "20/50";
        }
        if (level === 6) {
            document.getElementById("score").innerHTML = "20/40";
        }
        if (level === 7) {
            document.getElementById("score").innerHTML = "20/32";
        }
        if (level === 8) {
            document.getElementById("score").innerHTML = "20/25";
        }
        if (level === 9) {
            document.getElementById("score").innerHTML = "20/20";
        }
    }
    if (round === 5) {
        round = 0;
        fails = 0;
        level = level + 1;
        setFont(level);
    }

    if (level === 10) {
        document.getElementById("score").innerHTML = "20/20";
    }

    if (fails <= 1 && level !== 10) {
        testChar = ('CDEFPTOZ').split('')[(Math.floor(Math.random() * 8))];
        // testChar = ('E').split('')[(Math.floor(Math.random() * 0))];
        document.getElementById("char").innerHTML = testChar;
        console.log("next word is: " + testChar);
        document.getElementById("charDiv").style.fontSize = fontSize + "px";
        console.log(fontSize);
        recognition.stop();
        recognition.start();
    }
}

nextWord();