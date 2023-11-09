import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobeventComponent } from './jobevent.component';

describe('JobeventComponent', () => {
  let component: JobeventComponent;
  let fixture: ComponentFixture<JobeventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobeventComponent]
    });
    fixture = TestBed.createComponent(JobeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
