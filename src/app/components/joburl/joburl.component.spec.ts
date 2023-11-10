import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoburlComponent } from './joburl.component';

describe('JoburlComponent', () => {
  let component: JoburlComponent;
  let fixture: ComponentFixture<JoburlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoburlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoburlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
