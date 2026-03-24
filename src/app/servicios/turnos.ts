import { Injectable, signal, computed, effect } from '@angular/core';
import { Form } from '../models/form';


@Injectable({
  providedIn: 'root',
})
export class TurnosService {
    mostrarFormulario = signal(false);
    turnos= signal<Form[]>(JSON.parse(localStorage.getItem('turnos') ?? '[]'));
    
    constructor () {
      effect(() => {
        localStorage.setItem('turnos', JSON.stringify(this.turnos()))
      }) 
    }

    turnosHoy = computed(() => {
      const hoy = new Date().toISOString().split('T')[0];

      return this.turnos().filter(x => x.fecha === hoy)
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

      return this.turnos().filter(x => {
        const fecha = new Date(x.fecha);
        return fecha >= lunes && fecha <= viernes;
      })
    })

    turnosPendientes = computed(() => {
      return this.turnos().filter(x => x.confirmar === false)
    })

    confirmar(i:number) {
      this.turnos.update(x => x.map((turno, index) =>
        index === i ? {...turno, confirmar:true } : turno
    )
  )
    }

}
