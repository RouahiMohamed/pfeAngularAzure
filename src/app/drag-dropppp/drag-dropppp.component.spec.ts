import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDroppppComponent } from './drag-dropppp.component';

describe('DragDroppppComponent', () => {
  let component: DragDroppppComponent;
  let fixture: ComponentFixture<DragDroppppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDroppppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragDroppppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
