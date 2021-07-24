import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalContainerComponent } from './bs-modal-container.component';
import { BsModalService } from './bs-modal-service.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BsModalContainerComponent
  ],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [],
  providers: [BsModalService]
})
export class BsModalModule { }
