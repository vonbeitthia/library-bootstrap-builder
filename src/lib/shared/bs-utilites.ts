import { ElementRef, Renderer2} from '@angular/core';

// funciones de angular con contenido statico

export class bsUtilites {
	static async isElementInViewport<T extends ElementRef> (el: T) : Promise<boolean> {
		const rect  = el.nativeElement.getBoundingClientRect();
		//console.log('posicion actual ',rect)
		//const elemOffset = Math.round(rect.bottom - rect.top / 2);
		/*return (
			rect.top > 0 && // ofset por navbar
			rect.bottom > 0  &&
			rect.right > 0 &&
			rect.left <
				(window.innerWidth ||
					document.documentElement.clientWidth) /* or $(window).width() */// &&
			/*rect.top <
				((window.innerHeight ||
					document.documentElement.clientHeight)) /* or $(window).height() */
		//);
		//console.log('valor rect.bottom ', rect.bottom )
		//console.log('valor rect.top ', rect.top )
		//console.log('inner ', window.innerHeight)
		// elem en pantalla
		//const visible = rect.top < 0 && rect.bottom < 0;
		const visible = rect.top > 0 || rect.top > 0;
		//console.log('visible ', visible)
return (visible)
	}

  static agregarAnim(elem: ElementRef, animacion: string[], instanciaRender: Renderer2) {
    animacion.map((lista) => instanciaRender.addClass(elem.nativeElement, lista));
  }

  static removerAnim(elem: ElementRef, animacion: string[], instanciaRender: Renderer2) {
    animacion.map((lista) => instanciaRender.removeClass(elem.nativeElement, lista));
  }
}
