import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadoresListaComponent } from './contadores-lista.component';

describe('ContadoresListaComponent', () => {
  let component: ContadoresListaComponent;
  let fixture: ComponentFixture<ContadoresListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContadoresListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadoresListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
