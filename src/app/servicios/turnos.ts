import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Form } from '../models/form';
import { FormBuilder, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';


@Injectable({
  providedIn: 'root',
})
export class TurnosService {
    mostrarFormulario = signal(false);
    turnos= signal<Form[]>(JSON.parse(localStorage.getItem('turnos') ?? '[]'));
    search = signal('');
    editingAppointment = signal<Form | null>(null);
    fb = inject(FormBuilder);

  searchButton = computed (() => {
    const text = this.search().toLowerCase();
    if (!text) return this.turnos();
    return this.turnos().filter(x => 
      x.nombre.toLowerCase().includes(text) ||
      x.dueno.toLowerCase().includes(text)
    )
  })

    form = this.fb.group({
      fecha:['',Validators.required],
      hora:['', Validators.required],
      nombre: ['',Validators.required],
      dueno: ['',Validators.required],
      razon: ['',Validators.required]
    })

    constructor () {
      effect(() => {
        localStorage.setItem('turnos', JSON.stringify(this.turnos()))
      }) 
    }

    turnosDashboard = computed(() => {
      const today = new Date().toISOString().split('T')[0];
      return this.turnos().filter(x => x.fecha >= today && x.estado !== 'cancelado');
    });

    turnosHoy = computed(() => {
      const hoy = new Date().toISOString().split('T')[0];

      return this.turnosDashboard().filter(x => x.fecha === hoy)
    })

    turnosSemana = computed (() => {
      const hoy = new Date();
      const dia = hoy.getDay();

      const lunes = new Date(hoy);
      lunes.setDate(hoy.getDate() - dia + 1);

      const viernes = new Date(hoy);
      viernes.setDate(hoy.getDate() - dia + 5);

      if (dia === 6) {
      lunes.setDate(hoy.getDate() + 2)
      viernes.setDate(hoy.getDate() + 6)
  }
      if (dia === 0) {
      lunes.setDate(hoy.getDate() + 1)
      viernes.setDate(hoy.getDate() + 5)
  }

      return this.turnosDashboard().filter(x => {
        const fecha = new Date(x.fecha);
        return fecha >= lunes && fecha <= viernes;
      })
    })

    turnosPendientes = computed(() => {
      return this.turnosDashboard().filter(x => x.estado === 'pendiente')
    })

    confirmar(id:number) {
      this.turnos.update(x => x.map((turno) =>
        turno.id === id ? {...turno, estado: 'atendido' } : turno
    )
  )
    }


    save(){
      if (this.form.valid) {
        if (this.editingAppointment()){
          this.turnos.update(x => x.map(turno =>
            turno.id === this.editingAppointment()!.id
            ? {...turno, ...this.form.getRawValue() as Form}
            : turno
          ));
          this.editingAppointment.set(null);
        }else {
          const nuevoTurnos = {
            ...this.form.getRawValue() as Form,
            id: Date.now(),
            estado: 'pendiente'
        };

        this.turnos.update(x =>[...x, nuevoTurnos]);
        }
      this.ordenar()
      this.mostrarFormulario.set(false);
      this.form.reset();


      const modal = Modal.getInstance(document.getElementById('staticBackdrop')!);
      modal?.hide();
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
      
    }}
    

  ordenar() {
  this.turnos.update(x => [...x].sort((a, b) => {
    const fechaComp = new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    if (fechaComp !== 0) return fechaComp;
    return a.hora.localeCompare(b.hora);
  }));
}

  edit(turno: Form) {
    this.mostrarFormulario.set(true)
    this.editingAppointment.set(turno);
    this.form.patchValue(turno);
    const modalEl = document.getElementById('staticBackdrop')!;
    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
    modal.show();
    
  }  

  reset (){
    this.editingAppointment.set(null)
    this.form.reset();
  }


  cancel(id: number) {
    this.turnos.update(x => x.map(x =>
      x.id === id ? {...x, estado: 'cancelado'} : x
    ));
  }


}
