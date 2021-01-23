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
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${num}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

const toColumn = (code, index) => {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${code}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `
}

const toCell = (_, index) => {
  return `
    <div class="cell" contenteditable data-resize="cell" data-col="${index}"></div>
    `
}

const toChar = (index) => String.fromCharCode(CODES.A + index);

export function createTable(rowsCount = 15) {
  const codesCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(codesCount)
    .fill('')
    .map((_, index) => toColumn(toChar(index), index))
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
