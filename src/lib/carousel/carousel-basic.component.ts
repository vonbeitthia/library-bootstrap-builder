import { AfterViewInit, Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  Input,
  OnDestroy, OnInit, QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {  Subscription, interval } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { bsUtilites } from '../shared/bs-utilites';
import { IScrollEffects } from '../models/scroll-effects.interface';
import { IContenidoBanner } from '../models/contenido-banner.interface';
@Component({
  selector: 'bs-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselBasicComponent 
implements AfterViewInit, OnInit, OnDestroy {
  @ViewChildren('bsslide', { read: ElementRef }) sliders: QueryList<ElementRef>;
  listaElems: ElementRef[];
  ultimo = 0;
  sentido = false; // true anterior / false siguiente
  hizoScroll = false;
  @Input() tiempo = 3000;
  timer$ = interval(this.tiempo);
  subs: Subscription[] = [];
  itemActual = 1;
@Input() objImagen: IContenidoBanner[] = [
    {
      imagen: 'https://picsum.photos/1300',
      transicion: { tipo: 'fadeIn', velocidad: 1 },
      titulo: {
        texto: 'titulo1 ',
        color: 'text-primary',
      },
      subtitulo: {
        texto: 'subtitulo 1',
        color: 'text-danger',
      },
      posicion: {
        horizontal: 'flex-end',
        vertical: 'center',
        color: 'bg-dark text-warning opacity-75',
      },
      botones: [
      {
        texto: 'ver ofertas',
        color: 'btn-light',
        enlace: '#'
      }
      ],
    },
    {
      imagen: 'https://picsum.photos/1100',
      transicion: { tipo: 'fadeIn', velocidad: 1 },
      titulo: {
        texto: 'titulo2 ',
        color: 'text-warning',
      },
      subtitulo: {
        texto: 'subtitulo 2',
        color: 'text-info',
      },
      posicion: {
        horizontal: 'flex-start',
        vertical: 'flex-start',
        color: 'bg-light text-warning opacity-75 shadow',
      },
      botones: [
      {
        texto: 'ver ofertas',
        color: 'btn-dark',
        enlace: '#'
      }
      ],
    },
  ];
   @Input() top = '';
   @Input() tamImagen = '250px';
   listaImagenes: string[] = [];
   animaciones: any[] = [];
   titulos: any[] = [];
   subtitulos: any[] = [];
   @Input() zoomCursor = false;

  constructor(
    private cd: ChangeDetectorRef,
    private render: Renderer2,
    private vps: ViewportScroller,
    public el: ElementRef,
  ) {}
  ngOnInit(){

  }

  ngAfterViewInit(){
    
        //console.log(this.sliders)
      this.sliders.changes.subscribe(
        data => {
          //console.log('cambio ', data)
          this.listaElems = data.map(
          (elemento, ind) => {
      this.render.setProperty(
        elemento.nativeElement,
        'id',
        `slider_${ind + 1}`
      );
      //console.log('elem ', elemento)
      return elemento;
        })
        this.ultimo = this.listaElems.length;      
        })
    /*this.listaElems = this.sliders.map((elemento, ind) => {
      this.render.setProperty(
        elemento.nativeElement,
        'id',
        `slider_${ind + 1}`
      );
      console.log('elem ', elemento)
      return elemento;
    });*/
    // imagenes
    this.listaImagenes = this.objImagen.map((itemImg) => itemImg.imagen);
    this.animaciones = this.objImagen.map((itemAnim) => itemAnim.transicion);
    
    //console.log('ultimo ', this.ultimo)
    this.titulos = this.objImagen.map((tit) => tit.titulo);
    this.subtitulos = this.objImagen.map((tit) => tit.subtitulo);
   
    //console.log('list elem ', this.listaElems);
    if (this.tiempo > 0) {
      this.iniciarTimer();
    }
  }

  ngOnDestroy() {
    this.detenerTimer();
  }

  detenerTimer() {
    this.subs.forEach((subitem) => {
      //console.log('tipo unsubscribe ', subitem);
      subitem.unsubscribe();
    });
  }

  iniciarTimer() {
    if (this.tiempo > 0) {
      this.subs.push(
        this.timer$.subscribe((tiempo) => {
          if (this.sentido) {
            //siguiente
            this.navegarS(`slider_${this.itemActual}`);
          } else {
            //anterior
            this.navegarA(`slider_${this.itemActual}`);
          }
        })
      );
    }
  }

  navegarA(valor: string) {
    // obtenemos el orden numerico
    const palabra = valor.split('_');
    //console.log('palabra separada ', palabra)
    const indice = +palabra[1];
    //console.log('elem ', palabra[0]);
    // act el sentido
    //console.log('div actual  slider', indice);
    if (this.sentido === true) {
      this.iniciarTimer();
    }
    this.sentido = false; // izquierda
    this.calcularProx(indice);
  }

  navegarS(valor: string) {
    // obtenemos el orden numerico
    const palabra = valor.split('_');
    const indice = +palabra[1];
    //console.log('elem ', palabra[0]);
    // act el sentido
    //console.log('div actual  slider', indice);

    if (this.sentido === false) {
      this.iniciarTimer();
    }
    this.sentido = true; // derecha
    this.calcularProx(indice);
  }

  calcularProx(indice: number) {
    // si es el primero y va hacia atras
    if (this.sentido === false) {
      // hacia la izquierda
      const anterior = indice - 1;
      //console.log('izq procesando indice ', anterior)
      switch (anterior) {
        case 0:
          //recorre a la ultima
          this.scrollA(this.ultimo);
          break;
        default:
          this.scrollA(anterior);
          break;
      }
    } else {
      //derecha
      const siguiente = indice + 1;
      //console.log('der procesando indice ', siguiente)
      switch (siguiente) {
        case this.ultimo + 1:
          //recorre a la primera
          this.scrollA(1);
          break;
        default:
          this.scrollA(siguiente);
          break;
      }
    }
  }

  scrollA(indice: number) {
    //console.log('scroll a ', indice);
    this.cd.detectChanges();

    /*const elem : ElementRef<HTMLElement> = this.listaElems.map((elems, ind) => {
        return elems;
    })[indice-1];*/
    //console.log('todos los elementos ', elem)
    //const div1 = elem.nativeElement.getAttribute('id');
    //console.log('comprobando id ', div1);
    const divEl = document.getElementById(`slider_${indice}`);
    //const divMain = document.getElementById('mainContainer');
    //console.log('main ', divMain)
    //const div = 'slider_' + indice;
    //console.log('elemento sel ', div);
    if (divEl) {
      //this.detenerTimer();
      //this.vps.scrollToAnchor(div)
      ////funciona !!!!!!!!!!!
      this.itemActual = indice;
      //console.log('item actual ', this.itemActual)
      divEl.scrollIntoView(false);
      /*divEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center"
          });*/
      //divEl.scrollTo(0,0)
      //this.router.navigate(['.'], { fragment: div ,  skipLocationChange: true });
      bsUtilites.removerAnim(
        this.el,
        ['silenciar', 'fadeIn', 'animated-1'],
        this.render
      );
      this.cd.detectChanges();
    }
  }

  getParentElement(evento: MouseEvent) {
    //console.log('target ', evento.target);
    evento.preventDefault();
    evento.stopPropagation();
    if (evento.target instanceof HTMLSpanElement) {
      //aseguramos q no sea script
      const elem = evento.composedPath() as HTMLElement[];
      //console.log(`elemento ${typeof(elem)}`);
      //console.log('elem path ', elem);
      //console.log('elem seleccionado ', elem[3]);
      // el indice 3 contiene la ruta del padre
      //console.log('target ', evento.target)
      //console.log('efecto burbuja ', evento2)
      //const actId  = elem.getAttribute('id');
      const actId = elem[3].getAttribute('id') ?? '';
      //console.log('id padre ', actId)
      //obtenemos el anchor tag izq o der
      const elemTagIzq = evento.target.getAttribute('data-sentido');
      //console.log('valor data ', elemTagIzq);
      bsUtilites.agregarAnim(
        this.el,
        ['fadeIn', 'animated-1', 'silenciar'],
        this.render
      );
      this.cd.detectChanges();
      if (elemTagIzq === 'izquierda') {
        //console.log('sentido izq')
        //const elemPadre : HTMLCollection = document.getElementsByClassName('s-slider-container');
        this.detenerTimer();
        this.navegarA(actId);
      } else if (elemTagIzq === 'derecha') {
        this.detenerTimer();
        //console.log('sentido der')
        this.navegarS(actId);
      }
      //console.log('tag izq ',elemTagIzq)
    }
    return false;
  }

  scrollH(sentido: 'siguiente' | 'anterior') {
    this.detenerTimer();
    this.iniciarTimer();
    switch (sentido) {
      case 'siguiente':
        this.navegarS(`slider_${this.itemActual}`);
        break;
      default:
        this.navegarA(`slider_${this.itemActual}`);
        break;
    }
  }

  onVisible(entrar: IScrollEffects) {
    //console.log('recibido ', entrar)
    if (entrar.visible === true){
      bsUtilites.agregarAnim(entrar.elemento, ['fadeIn','animated-1'], this.render)
    }
    else if (entrar.visible === false) {
      bsUtilites.removerAnim(entrar.elemento, ['fadeIn','animated-1'], this.render)  
    }
    if (this.tiempo > 0) {
      switch (entrar.visible) {
        case true:
          //console.log('visible')
          this.iniciarTimer();
          break;
        default:
          //console.log('no visible')
          this.detenerTimer();
          break;
      }
    this.cd.detectChanges(); 
    }
  }

  posicionH(posicion: string = 'centro'): string {
    //console.log('calculando posicion ', posicion)
    switch (posicion) {
      case 'izquierda':
        return 'text-start';
        break;
      case 'derecha':
        return 'text-end';
        break;
      default:
        return 'text-center';
    }
  }


}
