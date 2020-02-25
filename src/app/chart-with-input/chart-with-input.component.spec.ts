import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWithInputComponent } from './chart-with-input.component';

describe('ChartWithInputComponent', () => {
  let component: ChartWithInputComponent;
  let fixture: ComponentFixture<ChartWithInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartWithInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartWithInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
