import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from './carousel/carousel.module';
import { SharedModule } from './shared/shared.module';
import { NavbarModule } from './navbar/navbar.module';
import { BsModalModule } from './bs-modal/bs-modal.module';
@NgModule({
  imports: [
  CommonModule, 
  CarouselModule, 
  SharedModule, 
  NavbarModule, 
  BsModalModule],
  exports: [
    NavbarModule,
    BsModalModule,
    CarouselModule,
    SharedModule
  ]
})
export class BootstrapBuilderModule {}
