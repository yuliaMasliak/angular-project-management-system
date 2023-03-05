import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreatePageComponent } from './board-create-page.component';

describe('BoardCreatePageComponent', () => {
  let component: BoardCreatePageComponent;
  let fixture: ComponentFixture<BoardCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
