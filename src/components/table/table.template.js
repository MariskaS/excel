const CODES = {
  A: 65,
  Z: 90,
}

const createRows = (index, content) => {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

const toColumn = (code) => {
  return `<div class="column">${code}</div>`
}

const toCell = () => {
  return `<div class="cell" contenteditable></div>`
}

const toChar = (index) => String.fromCharCode(CODES.A + index);

export function createTable(rowsCount = 15) {
  const codesCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(codesCount)
      .fill('')
      .map((_, index) => toColumn(toChar(index)))
      .join('');

  rows.push(createRows(null, columns));

  let i = 0;
  for (; i < rowsCount; i++) {
    const cells = new Array(codesCount)
        .fill('')
        .map(toCell)
        .join('');

    rows.push(createRows(i+1, cells));
  }

  return rows.join('');
}
