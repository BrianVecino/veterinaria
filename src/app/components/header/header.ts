import { Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TurnosService } from '../../servicios/turnos';


@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  servicioHeader = inject(TurnosService);

}
