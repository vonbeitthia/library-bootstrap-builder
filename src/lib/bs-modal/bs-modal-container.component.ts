import {Component, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'bs-bs-modal-container',
  templateUrl: './bs-modal-container.component.html',
  styleUrls: ['./bs-modal-container.component.scss']
})
export class BsModalContainerComponent implements AfterViewInit{
  @ViewChild('contenidoModal', {static: true}) modalBody : ElementRef

  constructor(
    //private cdr : ChangeDetectorRef
    ) { }

  ngAfterViewInit(): void {
  }


}
