import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishFilterComponent } from './publish-filter.component';
import { SharedAppModule } from '@shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [PublishFilterComponent],
  exports: [
    PublishFilterComponent
  ],
  imports: [
    CommonModule,
    SharedAppModule,
    DropdownModule,
    CalendarModule,
    ChipsModule,
    MultiSelectModule,
    TooltipModule
  ]
})
export class PublishFilterModule { }
