import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumosListaComponent } from './consumos-lista.component';

describe('ConsumosListaComponent', () => {
  let component: ConsumosListaComponent;
  let fixture: ComponentFixture<ConsumosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumosListaComponent]
    });
    fixture = TestBed.createComponent(ConsumosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
