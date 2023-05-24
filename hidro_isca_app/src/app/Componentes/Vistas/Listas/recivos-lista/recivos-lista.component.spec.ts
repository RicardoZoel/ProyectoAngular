import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecivosListaComponent } from './recivos-lista.component';

describe('RecivosListaComponent', () => {
  let component: RecivosListaComponent;
  let fixture: ComponentFixture<RecivosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecivosListaComponent]
    });
    fixture = TestBed.createComponent(RecivosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
