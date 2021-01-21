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
      const $parent = $resizer.closest( '[data-type], resizable');
      const parentCoords = $parent.getCoords();
      console.log('$(event.target)', parentCoords)

      document.onmousemove = (e) => {
        const delta = e.pageX - parentCoords.right;
        const calcWidth = parentCoords.width + delta;
        $parent.$el.style.width = `${calcWidth}px`
      }

      document.onmouseup = () => document.onmousemove = null;
    }
  }
}

Table.className = 'excel__table';
