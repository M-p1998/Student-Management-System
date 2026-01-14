import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Variable } from './variable';

describe('Variable', () => {
  let component: Variable;
  let fixture: ComponentFixture<Variable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Variable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Variable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
