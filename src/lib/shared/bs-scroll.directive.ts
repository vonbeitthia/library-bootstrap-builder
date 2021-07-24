import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BsScrollService } from './bs-scroll.service';
import { ICollScroll } from '../models/scroll-effects.interface';
import { bsUtilites } from './bs-utilites';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[BsScroll]',
})
export class BsScrollDirective {
  private cd$: Observable<boolean>;
  private subs: Subscription[] = [];
  @Input() elem!: ElementRef<any>[];
  @Input() horizontal = false;
  @Output() onScrollH = new EventEmitter<string>();
  @HostListener('document:scroll')
  /*private onScroll(e: MouseEvent) {
    if (this.elem && !this.horizontal) {
      let coll: ICollScroll = {};
      //console.log('element recibido: ', this.elem)
      //Object.keys(this.elem).forEach(valor => console.log('propie ', valor))
      //this.elem.forEach(valor=> console.log('prop ', valor))
      this.elem.forEach((el) => {
        const nombreEl: string = el.nativeElement.id;
        if (bsUtilites.isElementInViewport(el)) {
          //coll = {...coll, [`${nombreEl}`]: {elemento: el, visible: true}};
          coll = { [`${nombreEl}`]: { elemento: el, visible: true } };
        } else {
          //coll = {...coll, [`${nombreEl}`]: {elemento: el, visible: false}};
          coll = { [`${nombreEl}`]: { elemento: el, visible: false } };
        }
        this.scrollService.updateScroll(coll);
      });
      //console.log('recibiendo el ', this.elem)
      //const visible = bsUtilites.isElementInViewport(this.elem);
      //console.log('visible ', listaVisibles)
    }
    return false
  }*/

  @HostListener('mousewheel', ['$event'])
  onRuedaRaton(evento: WheelEvent) {
    //lee desplazamiento horizontal
    //console.log('variacion ', evento.deltaY)
    if (evento && this.elem && this.horizontal) {
      //console.log('procesando ', this.elem)
      const rutaElem = evento.composedPath() as HTMLElement[];
      const encontrado = rutaElem.indexOf(this.elem[0].nativeElement);
      if (encontrado > -1) {
        //console.log('scroll en elemento ');
        //this.elem[0].nativeElement.scrollLeft += 40;
        const variacion = evento.deltaY;

        if (variacion > 40) this.onScrollH.emit('siguiente');
        else this.onScrollH.emit('anterior');
      }
      return false;
      // false para evitar propagacion -- true para burbuja = default
    }
    return true;
  }

  constructor(
    private scrollService: BsScrollService,
    private cd: ChangeDetectorRef
  ) {
    this.cd$ = this.scrollService.changeDetection$;
    this.subs.push(
      this.cd$.subscribe((data) => {
        if (data === true) {
          this.cd.detectChanges();
          this.scrollService.desactivarDeteccion();
        }
      })
    );
  }
}
