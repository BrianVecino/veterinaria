import { Component, inject, ViewEncapsulation } from '@angular/core';
import { TurnosService } from '../../servicios/turnos';
import { ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  encapsulation: ViewEncapsulation.None
})
export class Dashboard {
  servicioDashboard = inject(TurnosService);

  currentPage = 1;
  itemsPerPage = 8;

get paginatedItems() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.servicioDashboard.turnosDashboard().slice(start, end);
}

get total() {
  return Math.ceil(this.servicioDashboard.turnosDashboard().length / this.itemsPerPage);
}

changePage(page: number) {
  if (page < 1 || page > this.total) return;
  this.currentPage = page
}

get pages() {
  return Array.from({length: this.total},
  (_,i) => i + 1);
}

}
