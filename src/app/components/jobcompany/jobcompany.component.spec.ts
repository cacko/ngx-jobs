import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcompanyComponent } from './jobcompany.component';

describe('JobcompanyComponent', () => {
  let component: JobcompanyComponent;
  let fixture: ComponentFixture<JobcompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobcompanyComponent]
    });
    fixture = TestBed.createComponent(JobcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
