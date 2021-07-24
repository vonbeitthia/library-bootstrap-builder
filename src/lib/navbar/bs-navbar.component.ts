import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { IDropDown } from '../models/dropdown.menu.interface';
import { DomContainerDirective } from '../shared/dom-container.directive';
import { Router } from '@angular/router';
import { BsNavbarItemComponent } from './bs-navbar-item.component';
//import { ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //encapsulation: ViewEncapsulation.None
})
export class BsNavbarComponent implements  AfterViewInit {
  togglerMenu = false;
  salirMenu = false;
  salirDrop = false;
  itemActual = '';
  indiceActual = -1;

  @Input() menu : IDropDown[] = 
  [
    {
      nombre: 'Categorias',
      codigo: '11'
    }
    ];

  @Output() onClick = new EventEmitter<string>();
  
  //@ContentChild(DomContainerDirective, {static: false}) 
  //@ContentChild('items', { read: ViewContainerRef, static: true })
  //private itemMenu: ViewContainerRef;
  
  private listaListeners : [] = [];
  // navbar brand
  @ContentChild('brand', {static: false}) 
  private brand!: ElementRef;
  @ContentChild('toggler', {static: false}) 
  private botonToggler!: ElementRef;
  @ContentChild('items', {read: ViewContainerRef, static: false}) 
  private itemsMenu!: ViewContainerRef;
  private childComp: any;
  constructor(
     private router: Router,
     private cfr: ComponentFactoryResolver,
     private cdr : ChangeDetectorRef,
     private render : Renderer2
    ) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    // agregamos listener a ciertos elementos
    // al boton de brand
    if (this.brand) {
      //throw new Error('bs-navbar -  debe agregar una variable #navegador')
       this.addClickListener(this.brand.nativeElement, 
         () => this.onNavigate('home'));
    }
    if (this.botonToggler){
      this.addClickListener(this.botonToggler.nativeElement,
        () => this.onNavigate('toggler'));
    }
    //this.itemsMenu.clear();

    this.crearItemSimple();  
    //this.cdr.detectChanges();
  } 

  addClickListener (elem: ElementRef, callback) {
      this.render.listen(elem, 'click', (event: Event) => {
      //console.log('hizo click en ', elem, ' elemento ', event.target);
      /*if (event.target instanceof HTMLAnchorElement ||
          event.target instanceof HTMLImageElement) {
          event.preventDefault();
      }*/ 
      //console.log('entro ', callback)
      event.stopPropagation();
      return callback()
    })

    return false //detiene propagacion
  }

  crearItemSimple() {
    const componentFactory = this.cfr
          .resolveComponentFactory(BsNavbarItemComponent);
    const viewContainerRef = this.itemsMenu;
    viewContainerRef.clear(); 
    this.childComp = viewContainerRef
            .createComponent<BsNavbarItemComponent>(componentFactory);
    this.childComp.instance.menu = this.menu;
    this.childComp.changeDetectorRef.detectChanges();
    this.childComp.instance.ruta.subscribe(
      data => {
        //console.log('emitio valor ', data)
        this.onNavigate(data)
      })
   } 

   onNavigate(enlace: string) {
     //console.log('selecciono', enlace);
     if (enlace === 'home') {
       // reseteamos el estado de los demas menus seleccionados
       this.childComp.instance.itemActual='';
       this.childComp.instance.desactivarItem();
       this.childComp.instance.cd.detectChanges();
     }
     this.onClick.emit(enlace);
   }

}
