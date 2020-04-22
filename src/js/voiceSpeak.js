// Speech synthesis
const synth = window.speechSynthesis;
let voices = [];
const ENG_GB = "en-GB";
const ENG_US = "en-US";

window.onbeforeunload = function () {
  synth.cancel();
};

function populateVoiceList() {
  voices = synth.getVoices();
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

export default function speak(wordToSay, pitch = 1, rate = 1) {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    synth.cancel();
    setTimeout(speak, 100);
  } else {
    const utterThis = new SpeechSynthesisUtterance(wordToSay);
    utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
    };
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
    };


    for (let i = 0; i < voices.length; i++) {
      if (voices[i].lang === ENG_GB || voices[i].name === ENG_US) {
        utterThis.voice = voices[i];
      }
    }

    utterThis.onpause = function (event) {
      const char = event.utterance.text.charAt(event.charIndex);
      console.log(
        'Speech paused at character ' +
        event.charIndex +
        ' of "' +
        event.utterance.text +
        '", which is "' +
        char +
        '".'
      );
    };

    utterThis.pitch = pitch;
    utterThis.rate = rate;
    synth.speak(utterThis);
  }
}
