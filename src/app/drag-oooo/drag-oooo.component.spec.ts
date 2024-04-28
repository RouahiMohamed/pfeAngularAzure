import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragOOOOComponent } from './drag-oooo.component';

describe('DragOOOOComponent', () => {
  let component: DragOOOOComponent;
  let fixture: ComponentFixture<DragOOOOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragOOOOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragOOOOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
