import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedTableRowsPerPageOptionsComponent } from '@shared/components/table/table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SharedTableRowsPerPageOptionsComponent
  ],
  exports: [
    SharedTableRowsPerPageOptionsComponent
  ]
})
export class SharedTableModule {
}
