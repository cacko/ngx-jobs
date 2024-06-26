import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsiteComponent } from './jobsite.component';

describe('JobsiteComponent', () => {
  let component: JobsiteComponent;
  let fixture: ComponentFixture<JobsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
