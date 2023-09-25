import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPropriedadePage } from './detail-propriedade.page';

describe('DetailPropriedadePage', () => {
  let component: DetailPropriedadePage;
  let fixture: ComponentFixture<DetailPropriedadePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailPropriedadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
