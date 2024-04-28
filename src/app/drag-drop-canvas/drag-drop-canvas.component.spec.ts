import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropCanvasComponent } from './drag-drop-canvas.component';

describe('DragDropCanvasComponent', () => {
  let component: DragDropCanvasComponent;
  let fixture: ComponentFixture<DragDropCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDropCanvasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragDropCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
