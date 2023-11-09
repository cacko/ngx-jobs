import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcvComponent } from './jobcv.component';

describe('JobcvComponent', () => {
  let component: JobcvComponent;
  let fixture: ComponentFixture<JobcvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobcvComponent]
    });
    fixture = TestBed.createComponent(JobcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
