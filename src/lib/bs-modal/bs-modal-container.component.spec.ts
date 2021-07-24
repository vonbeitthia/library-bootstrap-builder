import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsModalContainerComponent } from './bs-modal-container.component';

describe('BsModalContainerComponent', () => {
  let component: BsModalContainerComponent;
  let fixture: ComponentFixture<BsModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsModalContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
