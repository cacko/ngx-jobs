import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobskillsComponent } from './jobskills.component';

describe('JobskillsComponent', () => {
  let component: JobskillsComponent;
  let fixture: ComponentFixture<JobskillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobskillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
