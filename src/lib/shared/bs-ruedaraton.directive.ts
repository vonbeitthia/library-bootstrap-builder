import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[bsRuedaraton]'
})
export class BsRuedaratonDirective {
  @HostListener('document:scroll', ['$event']) 
  private convertScroll(evento: MouseEvent) : void
  {
      console.log('evento target ', evento.target)
      //console.log('Recibiendo evento ', evento)
    
    
  }
  constructor(
    private el: ElementRef) {
    console.log('directiva bsRuedaRaton')
   }

}
