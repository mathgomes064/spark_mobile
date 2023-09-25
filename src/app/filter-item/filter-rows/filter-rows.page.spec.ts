import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterRowsPage } from './filter-rows.page';

describe('FilterRowsPage', () => {
  let component: FilterRowsPage;
  let fixture: ComponentFixture<FilterRowsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FilterRowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
