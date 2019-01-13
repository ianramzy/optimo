try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}

var fontSize = 100;
var testChar = "Q";

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
    if (testChar.toUpperCase() == transcript.toUpperCase()) {
        document.getElementById("result").innerHTML = "correct";
    } else {
        document.getElementById("result").innerHTML = "false";
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

function nextWord() {
    testChar = ('cdeflptoz').split('')[(Math.floor(Math.random() * 9))];
    document.getElementById("char").innerHTML = "say this: " + testChar;
    console.log("next word is: " + testChar);
    fontSize = fontSize - 10;
    document.getElementById("charDiv").style.fontSize = fontSize + "px";
    console.log(fontSize);
    recognition.stop();
    recognition.start();
}

nextWord();