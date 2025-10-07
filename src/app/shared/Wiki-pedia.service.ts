import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { WikiResponse } from './wikiResponse';
import { wikiMapper } from '../country/mappers/wiki.mapper';
import { SimpleWiki } from './simpleWiki';

@Injectable({
  providedIn: 'root'
})
export class WikiPedíaService {

  private http = inject(HttpClient); // Injecting HttpClient para realizar peticiones HTTP hay que importar el HttpClientModule en el app.config.ts
  private static readonly API_URL = 'https://es.wikipedia.org/w/api.php'; // URL de la API de Wikipedia


  GetCountryInfo(country: string): Observable<SimpleWiki> { // este método recibe un string y devuelve un observable de un array de objetos Country para hacer la búsqueda por nombre y solicita la API de restcountries los países por nombre
    country = country.trim().toLowerCase(); // eliminamos los espacios en blanco y convertimos a minúsculas
    const params = {
      action: 'query',
      format: 'json',
      titles: country,
      prop: 'extracts',
      exintro: 'true',
      explaintext: 'true',
      exsentences: '5',
      origin: '*' // Necesario para CORS
    };
    return this.http.get<WikiResponse>(WikiPedíaService.API_URL, { params })
      .pipe(
        map((response: WikiResponse) => {
          const pages = response.query.pages; // Obtenemos las páginas de la respuesta
          const pageId = Object.keys(pages)[0]; // Obtenemos el primer ID de página Object.keys es un método que devuelve un array con las claves de un objeto, en este caso las claves son los IDs de las páginas
          // Si no hay páginas, lanzamos un error

          if (pageId === '-1') {
            throw new Error(`No se encontró información sobre ${country} en Wikipedia.`);
          }

          // Ahora devolvemos el SimpleWiki completo
          return wikiMapper.toWikiString(response);
        }),
        catchError((error) => {
          return throwError(() => new Error(`No se encontró información para ${country} en Wikipedia: ${error.message}`));
        })
      );
  }
}