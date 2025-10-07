import { ChangeDetectionStrategy, Component, input, Pipe, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {

  countries = input.required<Country[]>();
  // Cambiamos el tipo de respuesta a un array de objetos

  errorMEssage = input<string | unknown>(); // es un string o un objeto 

  isLoading = input<boolean>(false); // es un booleano para saber si se esta cargando la data

  isEmpty = input<boolean>(false); // es un booleano para saber si la data esta vacía
}
