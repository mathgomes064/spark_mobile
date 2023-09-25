import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailItemPage } from './detail-item.page';

describe('DetailItemPage', () => {
  let component: DetailItemPage;
  let fixture: ComponentFixture<DetailItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
