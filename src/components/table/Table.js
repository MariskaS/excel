import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type], resizable');
      const parentCoords = $parent.getCoords();
      const currentColIndex = $parent.data.col;
      const elementsToResize = this.$root.findAll(`[data-col="${currentColIndex}"]`)
      const [, ...elementsToResizeTail] = elementsToResize;
      elementsToResize.forEach((col, index) => {
        if (index !== 0) {
          col.style.borderRightColor = '#3c74ff'
        }
      });

      document.onmousemove = (e) => {
        const delta = e.pageX - parentCoords.right;
        const calcWidth = `${parentCoords.width + delta}px`;
        elementsToResize.forEach((col) => col.style.width = calcWidth);
      }

      document.onmouseup = () => {
        document.onmousemove = null;
        Array.from(elementsToResizeTail).map((cell) => cell.style.borderRightColor = '#e2e3e3')
      };
    }
  }
}

Table.className = 'excel__table';
