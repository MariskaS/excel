const CODES = {
  A: 65,
  Z: 90,
}

const createRow = (index, content) => {
  const num = index ? index : '';
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';

  return `
    <div class="row">
      <div class="row-info">
        ${num}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

const toColumn = (code) => {
  return `
    <div class="column" data-type="resizable">
      ${code}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `
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

  rows.push(createRow(null, columns));

  let i = 0;
  for (; i < rowsCount; i++) {
    const cells = new Array(codesCount)
      .fill('')
      .map(toCell)
      .join('');

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
