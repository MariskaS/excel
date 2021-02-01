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
      const coords = $parent.getCoords();
      const currentColIndex = $parent.data.column;
      const type = $resizer.data.resize;
      const colToResize = this.$root.findAll(`[data-column="${currentColIndex}"]`);
      const sideProp = type === 'column' ? 'bottom' : 'right';
      let calcSize;

      $resizer.css({
        opacity: 1,
        [sideProp]: '-2000px',
      })

      document.onmousemove = (e) => {
        if (type === 'column') {
          const delta = e.pageX - coords.right;
          calcSize = `${coords.width + delta}px`;
          $resizer.css({right: -delta + 'px'})
        } else {
          const delta = e.pageY - coords.bottom;
          calcSize = `${coords.height + delta}px`;
          $resizer.css({bottom: -delta + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (type === 'column') {
          colToResize.forEach((col) => $(col).css({width: calcSize}));
        } else {
          $parent.css({height: calcSize});
        }

        $resizer.css({
          bottom: 0,
          opacity: 0,
          right: 0,
        })
      };
    }
  }
}

Table.className = 'excel__table';
