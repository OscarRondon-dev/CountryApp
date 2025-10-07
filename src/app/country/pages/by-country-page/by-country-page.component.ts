import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  CountryService = inject(CountryService);

  ActivatedRoute = inject(ActivatedRoute); // Inyectamos el ActivatedRoute para obtener los parámetros de la ruta
  router = inject(Router)
  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? 'a'; // Obtenemos el parámetro de búsqueda de la URL
  querySearch = signal<string>(this.queryParam ?? 'a'); // Creamos una señal para el input de búsqueda

  // countryResource = resource({
  //   // Observa que el método request debe tener dos puntos
  //   request: () => ({ querySearch: this.querySearch() }), // este método se encarga de crear el objeto que se le pasa al loader, en este caso es un objeto con una propiedad querySearch que es la señal que hemos creado antes

  //   // Implementación completa del loader
  //   loader: async ({ request }) => { // este método se encarga de hacer la petición a la API y devolver los datos
  //     if (!request.querySearch) return []; // si no hay nada en la búsqueda, devuelve un array vacío

  //     return await firstValueFrom(this.CountryService.searchByCountryName(request.querySearch)) // hace la petición a la API y devuelve los datos


  //   }
  // })

  countryResource = rxResource({
    // Observa que el método request debe tener dos puntos
    request: () => ({ querySearch: this.querySearch() }),

    // Implementación completa del loader
    loader: ({ request }) => {
      if (!request.querySearch) return of([]);

      this.router.navigate([], {
        relativeTo: this.ActivatedRoute, // Mantenemos la ruta actual
        queryParams: { query: request.querySearch }, // Actualizamos la URL con el nuevo parámetro de búsqueda
        queryParamsHandling: 'merge', // Mantenemos los demás parámetros de la URL
      })

      return this.CountryService.searchByCountryName(request.querySearch)


    }
  })
}
