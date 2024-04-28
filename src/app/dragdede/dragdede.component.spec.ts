import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragdedeComponent } from './dragdede.component';

describe('DragdedeComponent', () => {
  let component: DragdedeComponent;
  let fixture: ComponentFixture<DragdedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragdedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragdedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
