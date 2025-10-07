import { CountryService } from './../../services/country.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';

// Función para validar y normalizar el parámetro de consulta
function validateQueryParam(queryParam: string): Region | '' {
  // Normalizar el parámetro (minúsculas y trim)
  const normalizedParam = queryParam.toLowerCase().trim();

  // Mapeo de valores normalizados a valores válidos del tipo Region
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
    // valores alternativos/incorrectos comunes
    'america': 'Americas',
    'europa': 'Europe',

    'antarctica': 'Antarctic',
    'antartida': 'Antarctic',
  };

  // Devuelve el valor correcto o cadena vacía si no es válido
  return validRegions[normalizedParam] ?? 'Africa';
}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  CountryService = inject(CountryService); // Inyectamos el servicio de países

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  ActivatedRoute = inject(ActivatedRoute); // Inyectamos el ActivatedRoute para obtener los parámetros de la ruta
  router = inject(Router)

  // Obtenemos el parámetro de búsqueda
  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? '';

  // Inicializamos la señal verificando que sea una región válida
  public selectedRegion = signal<Region | ''>(
    validateQueryParam(this.queryParam)
  );

  // Verificamos si es una región válida
  private isValidRegion(value: string): boolean {
    return this.regions.includes(value as Region);
  }

  // Recurso reactivo para cargar países por región
  countriesByRegion = rxResource({
    request: () => ({ region: this.selectedRegion() }),

    loader: ({ request }) => {
      // Si no hay región seleccionada, devuelve array vacío
      if (!request.region) return of([]);

      // Actualizar la URL con la región seleccionada
      this.router.navigate([], {
        relativeTo: this.ActivatedRoute,
        queryParams: { query: request.region },
        queryParamsHandling: 'merge',
      });

      // Buscar países de la región
      return this.CountryService.searchByRegionName(request.region);
    }
  });
  selectRegion(region: Region): void {
    this.selectedRegion.set(region);
    console.log('Región seleccionada:', region);
    // Aquí añadirías la lógica para buscar los países de esa región
  }
}
