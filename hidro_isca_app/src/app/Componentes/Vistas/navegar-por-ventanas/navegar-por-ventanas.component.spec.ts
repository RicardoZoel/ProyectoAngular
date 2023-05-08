import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegarPorVentanasComponent } from './navegar-por-ventanas.component';

describe('NavegarPorVentanasComponent', () => {
  let component: NavegarPorVentanasComponent;
  let fixture: ComponentFixture<NavegarPorVentanasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavegarPorVentanasComponent]
    });
    fixture = TestBed.createComponent(NavegarPorVentanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
