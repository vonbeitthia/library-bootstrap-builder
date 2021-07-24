import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomContainerDirective } from './dom-container.directive';
import { BsScrollService } from './bs-scroll.service';
import { BsScrollDirective } from './bs-scroll.directive';
import { BsRuedaratonDirective } from './bs-ruedaraton.directive';
import { BsVisibleDirective } from './bs-visible.directive'
import { BsScrollAutoDirective } from './scroll-auto.directive'


@NgModule({
  declarations: [
    DomContainerDirective,
    BsScrollDirective,
    BsRuedaratonDirective,
    BsVisibleDirective, 
    BsScrollAutoDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DomContainerDirective,
    BsScrollDirective,
    BsRuedaratonDirective,
    BsVisibleDirective,
    BsScrollAutoDirective
  ],
  providers: [BsScrollService]
})
export class SharedModule { }
