import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { IDropDown } from '../models/dropdown.menu.interface';
@Directive({
  selector: '[bsDomElement]'
})
export class DomContainerDirective {
  @Input() 
  public items : IDropDown[];
  constructor(
    public vcr: ViewContainerRef,
    public el: ElementRef) { 
  }

}
