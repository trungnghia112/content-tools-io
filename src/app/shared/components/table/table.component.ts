import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-rowsPerPageOptions',
  template: `
    Showing {{ state.first + 1 }} -
    {{
    ((state.page + 1) * state.rows >= state.totalRecords) ? state.totalRecords : ((state.page + 1) * state.rows)
    }}
    of {{ state.totalRecords }}
  `
})
export class SharedTableRowsPerPageOptionsComponent {
  @Input() state: {
    first: number,
    page: number,
    rows: number,
    totalRecords: number,
  };
}
