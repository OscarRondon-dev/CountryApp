import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { CountryService } from './../../services/country.service';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',

})
export class ByCapitalPageComponent {

  CountryService = inject(CountryService);

  ActivatedRoute = inject(ActivatedRoute); // Inyectamos el ActivatedRoute para obtener los parámetros de la ruta
  router = inject(Router)

  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? 'a'; // Obtenemos el parámetro de búsqueda de la URL

  querySearch = signal<string>(this.queryParam ?? 'a'); // Creamos una señal para el input de búsqueda y le asignamos el valor del parámetro de búsqueda

  countryResource = rxResource({
    // Observa que el método request debe tener dos puntos
    request: () => ({ querySearch: this.querySearch() }),

    // Implementación completa del loader
    loader: ({ request }) => {
      console.log('request', request.querySearch);
      if (!request.querySearch) return of([]);
      this.router.navigate([], {
        relativeTo: this.ActivatedRoute, // Mantenemos la ruta actual
        queryParams: { query: request.querySearch }, // Actualizamos la URL con el nuevo parámetro de búsqueda
        queryParamsHandling: 'merge', // Mantenemos los demás parámetros de la URL
      });

      return this.CountryService.searchByCapital(request.querySearch)


    }
  })



  // countryResource = resource({
  //   // Observa que el método request debe tener dos puntos
  //   request: () => ({ querySearch: this.querySearch() }),

  //   // Implementación completa del loader
  //   loader: async ({ request }) => {
  //     if (!request.querySearch) return [];

  //     return await firstValueFrom(this.CountryService.searchByCapital(request.querySearch))


  //   }
  // })

  // isLoading = signal(false);
  // isError = signal<null | string>(null);
  // countries = signal<Country[]>([]);


  // inputSearch(querySearch: string) {
  //   console.log('Buscando:', querySearch);
  //   if (this.isLoading()) {
  //     console.log('Ya hay una búsqueda en curso.');
  //     return;
  //   }

  //   this.isLoading.set(true); // Cambiamos el valor de isLoading a true
  //   this.countries.set([]); // Limpiamos el array de países
  //   this.isError.set(null); // Limpiamos el error

  //   this.CountryService.searchByCapital(querySearch).subscribe({ // Realizamos la búsqueda
  //     // Cambiamos el valor de isLoading a false
  //     // Cambiamos el valor de isError a null
  //     // Cambiamos el valor de countries a un array vacío
  //     // Cambiamos el valor de countries a un array de países

  //     next: (countries) => { //
  //       console.log('Países encontrados:', countries);
  //       this.isLoading.set(false);
  //       this.countries.set(countries);

  //     },
  //     error: (error) => {
  //       console.error(error);
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(error);
  //     },
  //   });
  // }



}
