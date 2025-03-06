import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicThemeLibComponent } from './dynamic-theme-lib.component';

describe('DynamicThemeLibComponent', () => {
  let component: DynamicThemeLibComponent;
  let fixture: ComponentFixture<DynamicThemeLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicThemeLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicThemeLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
