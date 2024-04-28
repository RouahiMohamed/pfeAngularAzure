import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropeyaaaComponent } from './drag-dropeyaaa.component';

describe('DragDropeyaaaComponent', () => {
  let component: DragDropeyaaaComponent;
  let fixture: ComponentFixture<DragDropeyaaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDropeyaaaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragDropeyaaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
