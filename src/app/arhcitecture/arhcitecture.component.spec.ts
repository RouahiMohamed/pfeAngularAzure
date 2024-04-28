import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArhcitectureComponent } from './arhcitecture.component';

describe('ArhcitectureComponent', () => {
  let component: ArhcitectureComponent;
  let fixture: ComponentFixture<ArhcitectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArhcitectureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArhcitectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
