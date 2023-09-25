import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterGroupsPage } from './filter-groups.page';

describe('FilterGroupsPage', () => {
  let component: FilterGroupsPage;
  let fixture: ComponentFixture<FilterGroupsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FilterGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
