export class Stats {
  constructor(data) {
    this.data = data;
    this.template = '';
    this.stats = '';
  }

  initTemplate(data) {
    let template = {};
    data.forEach(obj => {
      template[obj.category] = this.getWordsObject(obj.cards);
    });
    localStorage.setItem('englishStatsTemplate', JSON.stringify(template));
    return template;
  }

  getWordsObject(arr) {
    let result = {};
    arr.forEach(el => {
      result[el.word] = {
        translate: el.translation,
        right: 0,
        wrong: 0,
        click: 0
      }
    });
    return result;
  }

  getStats() {
    let result = JSON.parse(localStorage.getItem('englishStats'));
    return result;
  }

  updateStats(category, word, eventType) {
    if (!category || !word || !eventType) return false;
    let stats = this.stats;
    let prev = +stats[category][word][eventType];
    stats[category][word][eventType] = prev + 1;
    let update = JSON.stringify(stats);
    localStorage.setItem('englishStats', update);
    return true;
  }

  clearStats() {
    localStorage.setItem('englishStats', JSON.stringify(this.template));
  }

  createInstance() {
    this.template = this.initTemplate(this.data);
    if (localStorage.englishStats === undefined) {
      this.clearStats();
      this.stats = this.template;
    } else {
      this.stats = this.getStats();
    }
  }
}
