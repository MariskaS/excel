import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  toHTML() {
    return createTable();
  }
}

Table.className = 'excel__table';
