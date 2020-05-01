export class SpeechVoice {
  constructor(word, pitch = 1, rate = 1) {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.ENG_GB = "en-GB";
    this.ENG_US = "en-US";
    this.word = word;
    this.pitch = pitch;
    this.rate = rate;
    this.utterThis = '';
  }

  populateVoiceList() {
    this.voices = window.speechSynthesis.getVoices();
  }

  prepareSpeech(word) {
    this.synth.cancel();
    this.utterThis = new SpeechSynthesisUtterance(word);
    const voices = this.voices;

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].lang === this.ENG_GB || voices[i].name === this.ENG_US) {

        this.utterThis.voice = voices[i];
      }
    }
  }

  speak() {
    this.utterThis.pitch = this.pitch;
    this.utterThis.rate = this.rate;
    this.synth.speak(this.utterThis);
    this.utterThis.onend = function () {
      return true;
    };
  }

  speakPause() {
    this.synth.pause();
    this.synth.cancel();
  }

  sayWord(word) {
    this.populateVoiceList();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = this.populateVoiceList;
    }
    this.prepareSpeech(word);
    let finish = this.speak();
    return finish;
  }
}
