import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailQuadroPage } from './detail-quadro.page';

describe('DetailQuadroPage', () => {
  let component: DetailQuadroPage;
  let fixture: ComponentFixture<DetailQuadroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailQuadroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
