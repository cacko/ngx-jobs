import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpositionComponent } from './jobposition.component';

describe('JobpositionComponent', () => {
  let component: JobpositionComponent;
  let fixture: ComponentFixture<JobpositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobpositionComponent]
    });
    fixture = TestBed.createComponent(JobpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
