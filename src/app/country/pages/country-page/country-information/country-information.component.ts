import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Country } from '../../../interfaces/country';
import { DecimalPipe } from '@angular/common';
import { WikiPedíaService } from '../../../../shared/Wiki-pedia.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { SimpleWiki } from '../../../../shared/simpleWiki';
import { of } from 'rxjs';


interface WikiRequest {
  countryName: string;
}
@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {

  country = input.required<Country>(); // Definimos la propiedad country como un input requerido, que será el país que se le pase al componente

  wikiService = inject(WikiPedíaService) // Inyectamos el servicio WikiPedíaService para poder usarlo en el componente


  wikiResource = rxResource({
    // Configuración de la petición
    request: () => ({ countryName: this.country().name }),

    // Implementación del loader
    loader: ({ request }) => {
      if (!request.countryName) return of({
        title: 'No disponible',
        resume: 'No hay información disponible para este país.'
      });

      // Llamamos al servicio WikiPedíaService
      return this.wikiService.GetCountryInfo(request.countryName);
    }
  });
}
