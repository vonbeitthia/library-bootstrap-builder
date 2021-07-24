import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[bSscrollAuto]',
})
export class BsScrollAutoDirective implements AfterViewInit {
  // directiva scroll automatico
  //@Input() target: string;
  @Input() tiempo: number = 1000;
  constructor(
    private elemento: ElementRef
    ) {}

  ngAfterViewInit(): void {
    //const elemento = document.getElementById(this.target);
    //console.log('elemento sel ', this.elemento);
    if (this.elemento) {
      setTimeout(() => {
        this.elemento.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, this.tiempo);
    }
  }
}
