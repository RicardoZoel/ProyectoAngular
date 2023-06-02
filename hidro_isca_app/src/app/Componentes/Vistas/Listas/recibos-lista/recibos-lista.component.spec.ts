import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecibosListaComponent } from './Recibos-lista.component';


describe('RecibosListaComponent', () => {
  let component: RecibosListaComponent;
  let fixture: ComponentFixture<RecibosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecibosListaComponent]
    });
    fixture = TestBed.createComponent(RecibosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
