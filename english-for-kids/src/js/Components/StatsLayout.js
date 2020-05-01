import { Stats } from "./Stats";
import createDomNode from "../createDomNode";
import data from "../../../cards-data";

export class StatsLayout {
  constructor() {
    this.stats = '';
    this.statsInstance = '';
    this.table = '';
    this.title = '';
    this.clearButton = '';
    this.layout = '';
  }

  initStats() {
    let stats = new Stats(data);
    stats.createInstance();
    this.statsInstance = stats;
    this.stats = stats.getStats();
  }

  generateLayout() {
    let layout = createDomNode(layout, 'div', 'stats_layout');
    return layout;
  }

  generateclearButton() {
    let wrapper = createDomNode(wrapper, 'div', 'clear__wrapper');
    let button = createDomNode(button, 'button', 'clear__button');
    button.innerHTML = 'reset';
    this.clearButton = button;
    wrapper.append(button);
    return wrapper;
  }

  generateTableWrapper() {
    let wrapper = createDomNode(wrapper, 'div', 'table__wrapper');
    wrapper.append(this.generateTable());
    return wrapper;
  }

  generateTable() {
    let table = createDomNode(table, 'table', 'stats-table');
    let caption = createDomNode(caption, 'caption', 'table__caption');
    caption.innerHTML = `Statistics table`;
    table.append(caption);
    table.append(this.generateTitle());
    table.append(...this.generateRows());
    return table;
  }

  generateTitle() {
    let tr = createDomNode(tr, 'tr', 'table__title');
    tr.innerHTML = `<th class="table-category arrow_up" data-sort="table-category">category</th>
                    <th class="table-word arrow_up" data-sort="table-word">word</th>
                    <th class="table-translation arrow_up" data-sort="table-translation">translation</th>
                    <th class="table-right arrow_up" data-sort="table-right">right</th>
                    <th class="table-wrong arrow_up" data-sort="table-wrong">wrong</th>
                    <th class="table-click arrow_up" data-sort="table-click">click</th>`;
    this.title = tr;
    return tr;
  }

  generateRows() {
    let rows = [];
    let stats = this.stats;
    for (const category in stats) {
      let categoryName = category;
      let current = stats[category];
      for (const elem in current) {
        let tr = createDomNode(tr, 'tr', 'table__row');
        tr = this.makeRow(tr, categoryName);
        tr = this.makeRow(tr, elem);
        tr = this.makeTds(tr, current[elem]);
        rows.push(tr);
      }
    }
    return rows;
  }

  makeRow(tr, category) {
    let td = document.createElement('td');
    td.innerHTML = category;
    tr.append(td);
    return tr;
  }

  makeTds(tr, elem) {
    let trValue = tr.innerHTML;
    tr.innerHTML = `${trValue}
                    <td>${elem.translate}</td>
                    <td>${elem.right}</td>
                    <td>${elem.wrong}</td>
                    <td>${elem.click}</td>`;
    return tr;
  }

  buildStatsTable() {
    this.initStats();
    let layout = this.generateLayout();
    this.clearButton = this.generateclearButton();
    layout.append(this.clearButton);
    this.table = this.generateTable();
    layout.append(this.table);
    return layout;
  }

  createInstance() {
    this.layout = this.buildStatsTable();
    this.clearButton.addEventListener('click', (e) => {
      this.resetStats();
    });
    this.title.addEventListener('click', (e) => {
      this.handleSort(e);
    });
    return this.layout;
  }

  sortColumn(index) {
    let table = document.querySelector('.stats-table');
    let direction = JSON.parse(localStorage.getItem('englishSortDirection'));
    let sortedRows = Array.from(table.rows)
      .slice(1)
      .sort((rowA, rowB) => this.compareTwoRows(rowA, rowB, index, direction));

    table.append(...sortedRows);
    localStorage.setItem('englishSortDirection', JSON.stringify(!direction));
  }

  compareTwoRows(rowA, rowB, index, direction) {
    if (direction === true) {
      return rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? 1 : -1;
    } else {
      return rowA.cells[index].innerHTML < rowB.cells[index].innerHTML ? 1 : -1;
    }
  }

  getColumnIndex(word) {
    return document.querySelector(`.${word}`).cellIndex;
  }

  handleSort(e) {
    this.toggleArrows(e.target);
    let word = e.target.dataset.sort;
    let index = this.getColumnIndex(word);
    this.sortColumn(index);
  }

  toggleArrows(target) {
    target.classList.toggle('arrow_up');
    target.classList.toggle('arrow_down');
  }

  resetStats() {
    let indexes = [];
    indexes.push(this.getColumnIndex('table-right'));
    indexes.push(this.getColumnIndex('table-wrong'));
    indexes.push(this.getColumnIndex('table-click'));
    this.clearColumn(indexes);
    this.statsInstance.clearStats();
  }

  clearColumn(arrOfIndexes) {
    let table = document.querySelector('.stats-table');
    for (const i of arrOfIndexes) {
      Array.from(table.rows).slice(1).forEach(row => {
        row.cells[i].innerHTML = 0;
      })
    }
  }
}
