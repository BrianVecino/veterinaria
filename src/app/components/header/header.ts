import { Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TurnosService } from '../../servicios/turnos';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  servicioHeader = inject(TurnosService);

}
