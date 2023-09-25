import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompartimentoPage } from './compartimento.page';

describe('CompartimentoPage', () => {
  let component: CompartimentoPage;
  let fixture: ComponentFixture<CompartimentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompartimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
