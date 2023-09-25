import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailCompartimentoPage } from './detail-compartimento.page';

describe('DetailCompartimentoPage', () => {
  let component: DetailCompartimentoPage;
  let fixture: ComponentFixture<DetailCompartimentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailCompartimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
