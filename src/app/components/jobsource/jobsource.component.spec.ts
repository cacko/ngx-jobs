import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsourceComponent } from './jobsource.component';

describe('JobsourceComponent', () => {
  let component: JobsourceComponent;
  let fixture: ComponentFixture<JobsourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
