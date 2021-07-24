import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './bs-navbar.component';
import { BsNavbarItemComponent } from './bs-navbar-item.component';
import { SharedModule } from '../shared/shared.module';
import { LateralNavComponent } from './lateral-nav.component';

@NgModule({
  declarations: [
    BsNavbarComponent,
    BsNavbarItemComponent,
    LateralNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  //entryComponents: [BsNavbarItemComponent],
  exports: [
    BsNavbarComponent,
    LateralNavComponent,
  ]
})
export class NavbarModule { }
