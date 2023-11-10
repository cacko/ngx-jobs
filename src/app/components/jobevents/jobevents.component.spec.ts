import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobeventsComponent } from './jobevents.component';

describe('JobeventsComponent', () => {
  let component: JobeventsComponent;
  let fixture: ComponentFixture<JobeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobeventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
