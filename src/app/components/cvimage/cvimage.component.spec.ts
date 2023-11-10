import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvimageComponent } from './cvimage.component';

describe('CvimageComponent', () => {
  let component: CvimageComponent;
  let fixture: ComponentFixture<CvimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
