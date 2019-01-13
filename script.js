try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}


var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var noteContent = '';
var fontSize = 100;
var testChar = "Q";

function randomChar() {
    testChar = ('cdeflptoz').split('')[(Math.floor(Math.random() * 9))];
    document.getElementById("char").innerHTML = "say this: " + testChar;
}

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses.
recognition.continuous = false;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function (event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;

    document.getElementById("youSaid").innerHTML = "you said: " + transcript;
    console.log("test char: " + testChar.toUpperCase() + "you said: " + transcript.toUpperCase());
    if (testChar.toUpperCase() == transcript.toUpperCase()) {
        document.getElementById("result").innerHTML = "correct";
        nextWord()
    } else {
        document.getElementById("result").innerHTML = "false";
        nextWord()
    }

    noteContent += transcript;
    noteTextarea.val(noteContent);
};

recognition.onstart = function () {
    document.getElementById("recording").innerHTML = "recording status: ON";
}

recognition.onspeechend = function () {
    document.getElementById("recording").innerHTML = "recording status: OFF";
}

recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
        instructions.text('No speech was detected. Try again.');
    }
    ;
}


function nextWord(){
    randomChar()
    console.log("next word is: " + testChar);
    fontSize = fontSize - 10;
    document.getElementById("charDiv").style.fontSize =  fontSize + "px";
    console.log(fontSize);
}


$('#start-record-btn').on('click', function (e) {
    console.log("button is working");
    fontSize = fontSize - 10;
    document.getElementById("charDiv").style.fontSize =  fontSize + "px";
    console.log(fontSize);
});


$('#pause-record-btn').on('click', function (e) {
    recognition.stop();
    instructions.text('Voice recognition paused.');
});

$('#new-char-btn').on('click', function (e) {
    recognition.stop();
    randomChar();
    recognition.start();

    console.log("button pressed");
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function () {
    noteContent = $(this).val();
})

