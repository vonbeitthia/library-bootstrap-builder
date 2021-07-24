import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { IDropDown } from '../models/dropdown.menu.interface';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'bs-lateral-nav',
  templateUrl: './lateral-nav.component.html',
  styleUrls: ['./lateral-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LateralNavComponent implements AfterViewInit {
  salirMenu= false;
  salirDrop = false;
  dropmenuHome = false;
  @Output() onClick = new EventEmitter<string>();
  @Input() menu : IDropDown[] = 
  [
    {
      nombre: 'Categorias',
      codigo: '11'
    }
    ];


  sinSubmenu! : IDropDown[];
  conSubmenu! : IDropDown[];
  constructor(
    private cdr: ChangeDetectorRef,
    private render: Renderer2
    ) { }

  ngAfterViewInit()  {
    this.render.addClass(document.body, 'no-scroll');
    this.conSubmenu = this.menu.filter(
      valor => valor.contenido
      )
    this.sinSubmenu = this.menu.filter(
      valor => !valor.contenido
      )
    this.cdr.detectChanges();
    //console.log('Con submenu ', this.conSubmenu)
  }


  cssTransitionClass() : string {
       if (!this.salirMenu)
       {
         return 'bounceInRight animated'
       }
       if (this.salirMenu)
       {        
         return 'bounceOutRight animated'
       }
       return ''
   }

   onNavigate(enlace: string){
       this.render.removeClass(document.body, 'no-scroll');
       this.salirMenu=!this.salirMenu;
       setTimeout(()=> {
         this.onClick.emit(enlace)
       },400)        
   }


   mostrarDropHome() {
     if (this.dropmenuHome){
       this.salirDrop = true;   
       setTimeout(()=>{
           this.salirDrop = this.dropmenuHome=false;
           this.cdr.detectChanges();
         },200)
     } else
     {
       this.dropmenuHome = !this.dropmenuHome;
      }
      this.cdr.detectChanges();
      return false
   }

   mostrarDrop(item: Partial<IDropDown>, eventoMouse?: Event) {
     //console.log('recibiendo ', item)
      if (eventoMouse){
       eventoMouse.stopPropagation();
     }
     if (item.openState){
       item.closeState = true;
       setTimeout(()=>{
           item.openState = item.closeState = false;
           this.cdr.detectChanges();
         },200)
     } else {
       item.openState = !item.openState;
     }
     this.cdr.detectChanges();
     return false
   }
}
