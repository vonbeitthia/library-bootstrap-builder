import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { ICollScroll } from '../models/scroll-effects.interface';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {  distinctUntilChanged } from 'rxjs/operators';
import { bsUtilites } from '../shared/bs-utilites';

@Injectable({
  providedIn: 'root',
})
// se usa en combinacion con la directiva BsScroll
// la directiva agrea un hostlistener scroll
// pasa la variación al servcio
export class BsScrollService {
  static instancia = 0;
  private controlScroll = new BehaviorSubject<ICollScroll>({});
  private controlScroll$: Observable<ICollScroll> =
  this.controlScroll.asObservable();
  private subs: Subscription[] = [];
  private render: Renderer2;
  private changeDetection = new BehaviorSubject<boolean>(false);
  public changeDetection$ = this.changeDetection
    .asObservable()
    .pipe(distinctUntilChanged());
  

  constructor(private rf: RendererFactory2) {
    BsScrollService.instancia++;
    this.render = this.rf.createRenderer(null, null);
    //this.createScrollObservable();
  }

  createScrollObservable() {
    this.subs.push(
      this.controlScroll$
        .pipe
        //sauditTime(200),
        ()
        .subscribe((listaScroll) => {
          Object.keys(listaScroll).forEach((nombreId) => {
            //console.log('modificando el ', listaScroll[nombreId].elemento)
            bsUtilites.agregarAnim(
              listaScroll[nombreId].elemento,
              ['escala-gris', 'difuminar'],
              this.render
            );
            const animaciones = ['difuminar-antes'];

            //const animaciones2 = ['difuminar', 'difuminar-despues']
            switch (listaScroll[nombreId].visible) {
              case false:
                //sale = false

                //bsUtilites.removerAnim(listaScroll[nombreId].elemento, animaciones, this.render);
                bsUtilites.agregarAnim(
                  listaScroll[nombreId].elemento,
                  animaciones,
                  this.render
                );
                break;
              case true:
                //entra == true
                bsUtilites.removerAnim(
                  listaScroll[nombreId].elemento,
                  animaciones,
                  this.render
                );
                bsUtilites.removerAnim(
                  listaScroll[nombreId].elemento,
                  ['escala-gris', 'difuminar'],
                  this.render
                );
                //bsUtilites.agregarAnim(listaScroll[nombreId].elemento, animaciones2, this.render);
                break;
            }
            this.activarDeteccion();
          });
        })
    );
  }

  public updateScroll(data: ICollScroll) {
    //console.log('recibio ', data)
    const anterior = this.controlScroll.value;
    Object.keys(data).forEach((campo) => {
      //console.log('nombre camp ', campo)
      //console.log('valor campo ', data[campo].visible)
      /*if (anterior[campo]) {
        if (data[campo].visible != anterior[campo].visible) {
          //console.log('registro cambio');
          this.controlScroll.next(data);

        }
      } else {
        this.controlScroll.next(data);
      }*/
      return this.controlScroll.next(data);
    });
  }

  public desactivarDeteccion() {
    this.changeDetection.next(false);
  }
  public activarDeteccion() {
    this.changeDetection.next(true);
  }

  static getInstancias(): number {
    return BsScrollService.instancia;
  }

 }