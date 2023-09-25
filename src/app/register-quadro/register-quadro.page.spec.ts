import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterQuadroPage } from './register-quadro.page';

describe('RegisterQuadroPage', () => {
  let component: RegisterQuadroPage;
  let fixture: ComponentFixture<RegisterQuadroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterQuadroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
