import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropDown } from '../models/dropdown.menu.interface';
//import { ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'bsnavbar-item',
  templateUrl: './navbar-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar-item.component.scss']
})
export class BsNavbarItemComponent implements OnInit {
  @Input() menu: IDropDown[];
  @Input() itemActual = '';
  mostrarDropdown = false;
  @Output() ruta = new EventEmitter<string>();
  constructor(
    public cd: ChangeDetectorRef, 
    private elRef: ElementRef) {
    //console.log('instancia del cmponente ', this.menu)
  }

  onClickNav(enlace: string, codigo?: string) {
    if (codigo){
      this.itemActual = codigo;  
    }
    
    this.desactivarItem();
    this.ruta.emit(enlace);
    return false;
  }

  openDrop(item: Partial<IDropDown>, codigo?: string) {
    if (codigo){
      this.itemActual = codigo;       
    }
    if (item.openState) {
      item.closeState = true;
      setTimeout(() => {
        item.openState = item.closeState = false;
        this.cd.detectChanges();
      }, 200);
    } else {
      this.desactivarItem();
      item.openState = !item.openState;
    }
    this.cd.detectChanges();
    return false;
  }

  ocultarDrop(item: Partial<IDropDown>) {
     console.log('status drop ', item)
  }

  desactivarMenus() {
    const copia = this.menu.map((subm) => {
      return { ...subm, openState: false, closeState: false };
    });
    this.menu = [...copia];
  }

  public desactivarItem() {
    this.menu.forEach((men) => {
      //console.log('submen ', men.contenido)
      if (men?.contenido && men?.openState) {
        //console.log('menu abierto ', men.nombre)
        this.openDrop(men);
      }
    });
  }

  ngOnInit(): void {
  }

}
