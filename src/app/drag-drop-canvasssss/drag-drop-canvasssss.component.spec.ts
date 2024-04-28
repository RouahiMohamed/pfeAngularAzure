import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropCanvasssssComponent } from './drag-drop-canvasssss.component';

describe('DragDropCanvasssssComponent', () => {
  let component: DragDropCanvasssssComponent;
  let fixture: ComponentFixture<DragDropCanvasssssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDropCanvasssssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragDropCanvasssssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
