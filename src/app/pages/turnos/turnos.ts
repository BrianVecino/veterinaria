import { Component, inject, OnInit} from '@angular/core';
import { TurnosService } from '../../servicios/turnos';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-turnos',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './turnos.html',
  styleUrl: './turnos.css',
})
export class Turnos implements OnInit {
  turnosService = inject(TurnosService);

  ngOnInit() {
    this.currentPage = 1;
  }

  currentPage = 1;
  itemsPerPage = 16;

get paginatedItems() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.turnosService.searchButton().slice(start, end);
}

get total() {
  return Math.ceil(this.turnosService.searchButton().length / this.itemsPerPage);
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
