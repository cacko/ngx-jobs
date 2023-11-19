import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleIconComponent } from './simple-icon.component';

describe('SimpleIconComponent', () => {
  let component: SimpleIconComponent;
  let fixture: ComponentFixture<SimpleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
