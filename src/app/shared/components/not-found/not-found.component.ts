import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {

  error = input<string | unknown>(); // es un string o un objeto

  location = inject(Location); // Inyectamos el servicio de Location para poder navegar a la página anterior
  goBack() { // Método para navegar a la página anterior
    this.location.back(); // Navegamos a la página anterior
  } // Método para navegar a la página anterior
}
