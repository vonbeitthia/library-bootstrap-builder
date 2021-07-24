import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselBasicComponent } from './carousel-basic.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CarouselBasicComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CarouselBasicComponent
  ]
})
export class CarouselModule { }
