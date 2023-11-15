import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingIconComponent } from './flying-icon.component';

describe('FlyingIconComponent', () => {
  let component: FlyingIconComponent;
  let fixture: ComponentFixture<FlyingIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyingIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
