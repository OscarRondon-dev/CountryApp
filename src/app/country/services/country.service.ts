import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private http = inject(HttpClient); // Injecting HttpClient para realizar peticiones HTTP hay que importar el HttpClientModule en el app.config.ts
  private queryCacheCapital = new Map<string, Country[]>(); // Creamos un mapa para almacenar las consultas por capital y sus resultados = {}
  private queryCacheCountry = new Map<string, Country[]>(); // Creamos un mapa para almacenar las consultas por nombre y sus resultados = {}
  private queryCacheRegion = new Map<string, Country[]>(); // Creamos un mapa para almacenar las consultas por nombre y sus resultados = {}


  searchByCapital(query: string): Observable<Country[]> { // este método recibe un string y devuelve un observable de un array de objetos Country para hacer la búsqueda por capital y solicita la API de restcountries los países por capital
    query = query.trim().toLowerCase();

    if (this.queryCacheCapital.has(query)) { // Si la consulta ya existe en el mapa, devolvemos el resultado almacenado
      return of(this.queryCacheCapital.get(query)!); // Devolvemos el resultado almacenado
    }

    console.log('No se encontró en el mapa, haciendo la petición a la API', query); // Si no existe en el mapa, hacemos la petición a la API

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`) // Cambiamos el tipo de respuesta a un array de objetos
      .pipe(
        map(restCountries => CountryMapper.toDomainList(restCountries)), // mapeamos la respuesta de la API a un array de objetos Country a través del mapper y lo convertimos a un array de objetos Country
        tap((countries) => { // Guardamos el resultado en el mapa
          this.queryCacheCapital.set(query, countries); // Guardamos el resultado en el mapa query es la capital y countries es el array de objetos Country
        }),
        catchError((error) => { // Manejo de errores para la petición HTTP
          // console.error('Error en la búsqueda:', err);
          return throwError(() => new Error(`No se encontró un país con ${query}`)); // hace el error se lanza con un mensaje personalizado
        })
      )
  }


  searchByCountryName(query: string): Observable<Country[]> { // este método recibe un string y devuelve un observable de un array de objetos Country para hacer la búsqueda por nombre y solicita la API de restcountries los países por nombre

    query = query.trim().toLowerCase(); // eliminamos los espacios en blanco y convertimos a minúsculas
    if (this.queryCacheCountry.has(query)) { // Si la consulta ya existe en el mapa, devolvemos el resultado almacenado
      return of(this.queryCacheCountry.get(query)!); // Devolvemos el resultado almacenado
    }
    console.log('No se encontró en el mapa, haciendo la petición a la API', query); // Si no existe en el mapa, hacemos la petición a la API

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`) // Cambiamos el tipo de respuesta a un array de objetos

      .pipe( // el pipe permite encadenar operadores para transformar el flujo de datos

        map(restCountries => CountryMapper.toDomainList(restCountries)), // mapeamos la respuesta de la API a un array de objetos Country a través del mapper y lo convertimos a un array de objetos Country
        tap((countries) => { // Guardamos el resultado en el mapa
          this.queryCacheCountry.set(query, countries); // Guardamos el resultado en el mapa
        }),
        delay(2000), // Simulamos un retraso de 1 segundo para ver el loading

        catchError((error) => { // Manejo de errores para la petición HTTP
          // console.error('Error en la búsqueda:', err);

          return throwError(() => new Error(`No se encontró un país con nombre ${query}`)); // hace el error se lanza con un mensaje personalizado
        })
      )
  };

  searchByCountryByAlphaCode(code: string): Observable<Country | undefined> { // este método recibe un string y devuelve un observable de un array de objetos Country para hacer la búsqueda por nombre y solicita la API de restcountries los países por nombre



    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`) // Cambiamos el tipo de respuesta a un array de objetos

      .pipe( // el pipe permite encadenar operadores para transformar el flujo de datos

        map(restCountries => CountryMapper.toDomainList(restCountries)), // mapeamos la respuesta de la API a un array de objetos Country a través del mapper y lo convertimos a un array de objetos Country

        map((countries) => countries.at(0)), // mapeamos la respuesta de la API a un objeto Country a través del mapper y lo convertimos a un objeto Country


        catchError((error) => { // Manejo de errores para la petición HTTP
          // console.error('Error en la búsqueda:', err);

          return throwError(() => new Error(`No se encontró un país con ese código ${code}`)); // hace el error se lanza con un mensaje personalizado
        })
      )
  };
  searchByRegionName(regionSelected: string): Observable<Country[]> {
    // Verificar caché
    if (this.queryCacheRegion.has(regionSelected)) {
      return of(this.queryCacheRegion.get(regionSelected) ?? []);
    }

    // Hacer petición HTTP
    return this.http.get<RESTCountry[]>(`${API_URL}/region/${regionSelected}`)
      .pipe(
        // Mapear respuesta
        map(restCountries => CountryMapper.toDomainList(restCountries)),

        // Guardar en caché
        tap(countries => this.queryCacheRegion.set(regionSelected, countries)),

        // Simular delay para ver spinner
        delay(2000),

        // Manejar errores
        catchError(error => throwError(
          () => new Error(`No se encontró una región con nombre ${regionSelected}`)
        ))
      );
  }
}


