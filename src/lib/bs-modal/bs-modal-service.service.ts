import {
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  TemplateRef,
  Type,
} from '@angular/core';
import { BsModalContainerComponent } from './bs-modal-container.component';
import { BehaviorSubject } from 'rxjs';
import { ModalStoreInterface } from '../models/modal.store.interface';

export type Content<T> = TemplateRef<T> | Type<T>;

@Injectable({
  providedIn: 'root',
})
export class BsModalService {
  private renderer: Renderer2;
  //@ContentChild(DomContainerDirective, {static: false})
  //private modalContainer!: DomContainerDirective;
  listaModals = new BehaviorSubject<ModalStoreInterface[]>([]);
  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private rf: RendererFactory2
  ) {
    this.renderer = this.rf.createRenderer(null, null);
  }

  open(plantilla: TemplateRef<any>) {
    //console.log('leyendo plantilla ', plantilla);
    //copiamos el componente
    const factory = this.cfr.resolveComponentFactory(BsModalContainerComponent);
    // creamos los nodos de la plantilla
    const ngContent = this.resolveNgContent(plantilla);
    //console.log('nodos ', ngContent);
    // instanciamos el componente
    const componentRef = factory.create(this.injector, ngContent);
    // actualizamos la vista del componente
    componentRef.hostView.detectChanges();
    //componentRef.changeDetectorRef.detectChanges();
    // selecionamos el elemento nativo
    //console.log('view ref ', componentRef.hostView)
    const { nativeElement } = componentRef.location;
    this.listaModals.next([...this.listaModals.value, {
      containerModal: componentRef
    }]);
    // lo agregamos al documento
    //document.body.appendChild(nativeElement);
    this.renderer.addClass(document.body, 'no-scroll');
    this.renderer.appendChild(document.body, nativeElement);
  }

  resolveNgContent<T>(content: TemplateRef<any>) {
    // convierte el objeto en nodos 
    if (content instanceof TemplateRef) {
        // plantillas
    const localViewRef: EmbeddedViewRef<T> = content.createEmbeddedView(null);
    return [localViewRef.rootNodes];
    }
    // componentes
    const factory = this.cfr.resolveComponentFactory(content);
    const componentRef = factory.create(this.injector);
    return [[componentRef.location.nativeElement]];
  }

  close () {
    const ultimo = this.listaModals.value.length-1;
    const {nativeElement} = this.listaModals.value![ultimo].containerModal.location;
    this.renderer.removeClass(document.body, 'no-scroll');
    //this.renderer.addClass(nativeElement, 'fadeOut');
    //this.listaModals.value!.containerModal.instance.salir = false;
    const elemBodyModal = this.listaModals.value![ultimo].containerModal.instance.modalBody;
    this.renderer.removeClass(elemBodyModal.nativeElement, 'fadeIn');
    this.renderer.addClass(elemBodyModal.nativeElement, 'fadeOut');
    this.listaModals.value![ultimo].containerModal.changeDetectorRef.detectChanges();
    setTimeout(()=>{
               this.renderer.removeChild(document.body, nativeElement);
               const nuevo  = this.listaModals.value
               nuevo.pop();
               //console.log('nuevo store ' , nuevo)
               this.listaModals
               .next(nuevo);
    }, 500)
  }

  
}
