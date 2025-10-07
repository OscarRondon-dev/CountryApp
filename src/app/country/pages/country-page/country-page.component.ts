import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";
@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code']; // Obtenemos el código del país de la ruta activa
  countryService = inject(CountryService); // Inyectamos el servicio de países

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }), // este método se encarga de crear el objeto que se le pasa al loader, en este caso es un objeto con una propiedad querySearch que es la señal que hemos creado antes
    loader: ({ request }) => { // este método se encarga de hacer la petición a la API y devolver los datos
      return this.countryService.searchByCountryByAlphaCode(request.code) // Hace la petición a la API y devuelve los datos
    },

  });

}
