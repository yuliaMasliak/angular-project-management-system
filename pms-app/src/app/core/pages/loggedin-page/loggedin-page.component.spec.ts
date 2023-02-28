import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinPageComponent } from './loggedin-page.component';

describe('LoggedinPageComponent', () => {
  let component: LoggedinPageComponent;
  let fixture: ComponentFixture<LoggedinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedinPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
