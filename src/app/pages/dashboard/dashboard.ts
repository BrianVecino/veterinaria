import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnosService } from '../../servicios/turnos';

import { Modal } from 'bootstrap';
import { Form } from '../../models/form';


@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  encapsulation: ViewEncapsulation.None
})
export class Dashboard {
    servicioDashboard = inject(TurnosService);

    private fb = inject(FormBuilder);

    form = this.fb.group({
      fecha:['',Validators.required],
      hora:['', Validators.required],
      nombre: ['',Validators.required],
      dueno: ['',Validators.required],
      razon: ['',Validators.required]
    })

    save(){
      if (this.form.valid) {

      const nuevoTurnos = {
      ...this.form.getRawValue() as Form,
      confirmar: false
};
  
    
      this.servicioDashboard.turnos.update(x =>[...x, nuevoTurnos]);

      this.servicioDashboard.mostrarFormulario.set(false);
      this.form.reset();

      const modal = Modal.getInstance(document.getElementById('staticBackdrop')!);
      modal?.hide();
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();

    }
}
}
