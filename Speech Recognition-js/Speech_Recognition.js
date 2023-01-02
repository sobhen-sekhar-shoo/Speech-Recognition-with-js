const Btn = document.querySelector('#StartBtn');
const Content = document.querySelector('.content');

function Speak(sentence, voice){
    const Speaker = new SpeechSynthesisUtterance(sentence);
    const voices = window.speechSynthesis.getVoices();
    //Speaker.text = sentence;
    Speaker.rate = 1;
    Speaker.pitch = 1;
    Speaker.voice = voice == undefined ?  voices[2] : voices[voice];
    window.speechSynthesis.speak(Speaker);
}

function wish(){
    let hour = new Date().getHours();

    if(hour >= 0 && hour < 12){
        Speak("Good Morning Sobhen");
    }else if(hour >= 12 && hour <= 17){
        Speak("Good Afternoon Sobhen");
    }else {
        Speak("Good Evening Sobhen");
    }
}

$(document).ready(()=>{
    Speak("Activating System");
    Speak("Going Online");
    wish();
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const Recognitior = new SpeechRecognition();

Recognitior.onresult = (event) =>{
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    Content.textContent = transcript;
    SpeakThis(transcript.toLwerCase())
}

Btn.addEventListener('click', ()=>{
    Recognitior.start();
})

function SpeakThis(msg){
    const Speech = new SpeechSynthesisUtterance();
    Speech.text = "I did not understand what you said please try again"

    if(msg.includes("hey") || msg.includes("hello")){
        const FinalText = "Hello Boss";
        Speech.text = FinalText;
    }else{
        window.open(`https://www.google.com/search?=${msg.replace(" ", "+")}`, "_blank");
        const FinalText = `I found some information for ${msg} on google`;
        Speech.text = FinalText;
    }

    // Speech.volume = 1;
    // Speech.pitch = 1;
    // Speech.rate = 1;

    // window.speechSynthesis.speak(Speech);
    Speak(Speech)
}