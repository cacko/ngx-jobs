import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobclComponent } from './jobcl.component';

describe('JobclComponent', () => {
  let component: JobclComponent;
  let fixture: ComponentFixture<JobclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobclComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
