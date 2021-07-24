import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IScrollEffects } from '../models/scroll-effects.interface';

@Directive({
  selector: '[BsVisible]',
})
export class BsVisibleDirective implements AfterViewInit {
  // detecta elemento
  @Output() public isVisible = new EventEmitter<IScrollEffects>();
  @Input() offset = 0;
  private _intersectionObserver!: IntersectionObserver;
  constructor(private _element: ElementRef) {}

  ngAfterViewInit() {
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.checkForIntersection(entries);
      },
      {
        root: document,
        rootMargin: '0px',
        threshold: [this.offset],
      }
    );
    this._intersectionObserver.observe(this._element.nativeElement);
  }

  private checkForIntersection = (
    entries: Array<IntersectionObserverEntry>
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      /*if (this.checkIfIntersecting(entry)) {
        this.isVisible.emit();
        this._intersectionObserver.unobserve(
          <Element>this._element.nativeElement
        );
        this._intersectionObserver.disconnect();
      }*/
      let status: IScrollEffects = {
        elemento: this._element,
        visible: false,
      };

      if (this.checkIfIntersecting(entry)) {
        status = {
          elemento: this._element,
          visible: true,
        };
      }
      this.isVisible.emit(status);
    });
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return (
      (<any>entry).isIntersecting &&
      entry.target === this._element.nativeElement
    );
  }
}
