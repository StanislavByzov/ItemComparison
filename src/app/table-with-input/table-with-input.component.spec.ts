import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableWithInputComponent } from './table-with-input.component';

describe('TableWithInputComponent', () => {
  let component: TableWithInputComponent;
  let fixture: ComponentFixture<TableWithInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableWithInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
