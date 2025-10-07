# Angular Technical Concepts Documentation

Este documento proporciona una visión detallada de los conceptos técnicos utilizados en nuestra aplicación Angular.

## 🚀 Configuración de la Aplicación

### bootstrapApplication

**Descripción:** Función para iniciar una aplicación Angular standalone.

**Ejemplo:**

```typescript
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

**Detalles:** Toma dos parámetros: el componente raíz y un objeto de configuración que define providers, como router, HTTP, etc.

### ApplicationConfig

**Descripción:** Interfaz para configurar una aplicación Angular standalone.

**Ejemplo:**

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch())],
};
```

**Detalles:** Centraliza la configuración de servicios globales y optimizaciones.

### provideZoneChangeDetection

**Descripción:** Configuración para optimizar la detección de cambios en Angular.

**Ejemplo:**

```typescript
provideZoneChangeDetection({ eventCoalescing: true });
```

**Detalles:** `eventCoalescing` combina eventos múltiples en uno solo para mejorar el rendimiento.

## 💻 Sistema de Componentes

### @Component Decorator

**Descripción:** Define una clase como componente Angular.

**Ejemplo:**

```typescript
@Component({
  selector: "country-information-page",
  imports: [DecimalPipe],
  templateUrl: "./country-information.component.html",
})
export class CountryInformationComponent {
  // ...
}
```

**Detalles:**

- `selector`: Define el nombre del elemento HTML para usar el componente
- `imports`: Array de dependencias necesarias para el componente (standalone)
- `templateUrl`: Ruta al archivo HTML del componente
- `changeDetection`: Estrategia para actualizar la vista

### Standalone Components

**Descripción:** Componentes que no requieren declaración en módulos.

**Ejemplo:**

```typescript
@Component({
  selector: "app-not-found",
  imports: [],
  templateUrl: "./not-found.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  // ...
}
```

**Detalles:** Simplifica la estructura del proyecto eliminando NgModules y permitiendo importaciones directas.

### ChangeDetectionStrategy

**Descripción:** Controla cómo y cuándo Angular actualiza la vista de un componente.

**Ejemplo:**

```typescript
@Component({
  selector: "country-top-menu",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./top-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {}
```

**Detalles:**

- `OnPush`: Solo actualiza cuando cambian las referencias de los inputs o se dispara un evento
- Mejora el rendimiento evitando verificaciones innecesarias

## 🔄 Inyección de Dependencias

### inject() Function

**Descripción:** API moderna para inyectar dependencias sin constructor.

**Ejemplo:**

```typescript
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params["code"];
  countryService = inject(CountryService);

  // ...
}
```

**Detalles:**

- Más conciso que la inyección por constructor
- Permite inyecciones condicionales y dinámicas
- Funciona a nivel de clase, función o efectos

### @Injectable Decorator

**Descripción:** Marca una clase como disponible para el sistema de DI de Angular.

**Ejemplo:**

```typescript
@Injectable({
  providedIn: "root",
})
export class WikiPedíaService {
  private http = inject(HttpClient);
  // ...
}
```

**Detalles:**

- `providedIn: 'root'`: Crea una instancia única (singleton) disponible en toda la aplicación
- Puede recibir otras dependencias mediante `inject()`

## ⚡ Sistema de Reactividad

### Signals

**Descripción:** Sistema reactivo para gestionar y observar el estado.

**Ejemplo:**

```typescript
export class ByRegionPageComponent {
  public selectedRegion = signal<Region | "">("Africa");

  selectRegion(region: Region): void {
    this.selectedRegion.set(region);
  }
}
```

**Detalles:**

- `signal()`: Crea un valor reactivo mutable
- `.set()`: Actualiza el valor de la señal
- `()`: Operador para leer el valor actual (ej: `selectedRegion()`)

### input() / output() API

**Descripción:** API moderna para la comunicación entre componentes padre-hijo.

**Ejemplo:**

```typescript
export class CountryListComponent {
  countries = input.required<Country[]>();
  errorMEssage = input<string | unknown>();
  isLoading = input<boolean>(false);
  value = output<string>();
}
```

**Detalles:**

- `input()`: Reemplaza @Input() con ventajas tipo valor por defecto y requerido
- `output()`: Reemplaza @Output() y EventEmitter
- Se invocan como funciones: `value.emit(...)` y `placeholder()`

### linkedSignal

**Descripción:** Crea una señal vinculada a otra fuente reactiva.

**Ejemplo:**

```typescript
export class SearchInputComponent {
  initialValue = input<string>("a");
  inputValue = linkedSignal<string>(() => this.initialValue() ?? "");

  // ...
}
```

**Detalles:**

- Inicializa una señal basada en el valor de otra, manteniéndolas sincronizadas
- Útil para transformar o derivar valores de otros inputs o señales

### effect()

**Descripción:** Función que reacciona automáticamente cuando cambian las signals de las que depende.

**Ejemplo:**

```typescript
debounceEffect = effect((onCleanup) => {
  const value = this.inputValue();

  const timeout = setTimeout(() => {
    this.value.emit(value);
  }, 1000);

  onCleanup(() => {
    clearTimeout(timeout);
  });
});
```

**Detalles:**

- Se ejecuta automáticamente cuando cambian las señales referenciadas
- `onCleanup`: Función para limpiar recursos cuando el efecto se vuelve a ejecutar
- Ideal para efectos secundarios como llamadas API, manipulación DOM, etc.

## 🛣️ Routing

### Configuración de Rutas

**Descripción:** Define la estructura de navegación de la aplicación.

**Ejemplo:**

```typescript
export const countryRoutes: Routes = [
  {
    path: "",
    component: CountryLayoutComponent,
    children: [
      {
        path: "by-capital",
        component: ByCapitalPageComponent,
        data: {
          title: "By Capital",
          description: "Find countries by their capital city.",
        },
      },
      // ...
    ],
  },
];
```

**Detalles:**

- `path`: Define la URL para acceder a la ruta
- `component`: Componente a mostrar cuando se active la ruta
- `loadChildren`: Carga lazy de módulos
- `**`: Comodín para rutas no encontradas

### Lazy Loading

**Descripción:** Carga de código bajo demanda para optimizar el tiempo de carga inicial.

**Ejemplo:**

```typescript
{
  path: 'country',
  loadChildren: () => import('./country/country.routes')
}
```

**Detalles:**

- Mejora el rendimiento cargando código solo cuando es necesario
- Reduce el bundle inicial para una carga más rápida
- La sintaxis moderna usa `import()` en lugar de strings

### Navegación Programática

**Descripción:** Control de la navegación desde el código TypeScript.

**Ejemplo:**

```typescript
this.router.navigate([], {
  relativeTo: this.ActivatedRoute,
  queryParams: { query: request.querySearch },
  queryParamsHandling: "merge",
});
```

**Detalles:**

- `router.navigate()`: Método para navegar
- `relativeTo`: Define la ruta base para la navegación
- `queryParams`: Parámetros de consulta (después de ?)
- `queryParamsHandling`: Cómo tratar los query params existentes

### Extracción de Parámetros

**Descripción:** Obtención de valores de la URL.

**Ejemplo:**

```typescript
countryCode = inject(ActivatedRoute).snapshot.params["code"];
queryParam = this.ActivatedRoute.snapshot.queryParamMap.get("query") ?? "a";
```

**Detalles:**

- `snapshot`: Captura única de los parámetros
- `params`: Objeto con parámetros de ruta
- `queryParamMap`: Mapa para query params con métodos como `get()`

## 🌊 RxJS y Manejo de Datos Asíncronos

### Observable

**Descripción:** Tipo para representar flujos de datos asincrónicos.

**Ejemplo:**

```typescript
GetCountryInfo(country: string): Observable<SimpleWiki> {
  // ...
  return this.http.get<WikiResponse>(WikiPedíaService.API_URL, { params })
    .pipe(
      map((response: WikiResponse) => wikiMapper.toWikiString(response)),
      catchError((error) => throwError(() => new Error(`No se encontró información para ${country}`)))
    );
}
```

**Detalles:**

- Representa una secuencia de valores que pueden ocurrir en el tiempo
- No se ejecuta hasta que hay una suscripción
- Soporta operadores para transformación y control de flujo

### rxResource

**Descripción:** API de Angular para gestionar recursos asincrónicos.

**Ejemplo:**

```typescript
countryResource = rxResource({
  request: () => ({ querySearch: this.querySearch() }),
  loader: ({ request }) => {
    if (!request.querySearch) return of([]);
    return this.CountryService.searchByCountryName(request.querySearch);
  },
});
```

**Detalles:**

- `request`: Función que devuelve el objeto de petición
- `loader`: Función que carga los datos basados en la petición
- Proporciona estados: `isLoading()`, `hasValue()`, `error()`, `value()`

### Operadores RxJS

#### pipe()

**Descripción:** Método para encadenar operadores RxJS.

**Ejemplo:**

```typescript
return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
  map((restCountries) => CountryMapper.toDomainList(restCountries)),
  tap((countries) => {
    this.queryCacheCapital.set(query, countries);
  }),
  catchError((error) => {
    return throwError(() => new Error(`No se encontró un país con ${query}`));
  })
);
```

**Detalles:** Permite componer operaciones de transformación en un flujo.

#### map()

**Descripción:** Transforma cada valor emitido aplicando una función.

**Ejemplo:**

```typescript
map((restCountries) => CountryMapper.toDomainList(restCountries));
```

**Detalles:** Similar al método `map()` de arrays pero para Observables.

#### tap()

**Descripción:** Realiza efectos secundarios sin modificar el flujo.

**Ejemplo:**

```typescript
tap((countries) => {
  this.queryCacheCapital.set(query, countries);
});
```

**Detalles:** Útil para debugging, logging o guardado en caché.

#### catchError()

**Descripción:** Maneja errores en el flujo Observable.

**Ejemplo:**

```typescript
catchError((error) => {
  return throwError(() => new Error(`No se encontró un país con ${query}`));
});
```

**Detalles:** Atrapa errores y permite devolver un Observable alternativo o propagar un error personalizado.

#### of()

**Descripción:** Crea un Observable que emite valores específicos.

**Ejemplo:**

```typescript
if (this.queryCacheCapital.has(query)) {
  return of(this.queryCacheCapital.get(query)!);
}
```

**Detalles:** Útil para crear Observables simples con valores síncronos.

#### throwError()

**Descripción:** Crea un Observable que emite un error.

**Ejemplo:**

```typescript
return throwError(() => new Error(`No se encontró un país con nombre ${query}`));
```

**Detalles:** Emite un error específico que puede ser capturado con `catchError`.

#### delay()

**Descripción:** Retrasa la emisión de valores.

**Ejemplo:**

```typescript
delay(2000); // Simulamos un retraso de 2 segundos para ver el loading
```

**Detalles:** Útil para simular latencia de red o controlar el timing de emisiones.

## 🌐 Manejo de HTTP y APIs

### HttpClient

**Descripción:** Servicio para realizar peticiones HTTP.

**Ejemplo:**

```typescript
private http = inject(HttpClient);

return this.http.get<WikiResponse>(WikiPedíaService.API_URL, { params })
```

**Detalles:**

- Soporta métodos REST: `get()`, `post()`, `put()`, `delete()`
- Permite tipado genérico de respuestas
- Devuelve Observables para manejo asincrónico

### provideHttpClient

**Descripción:** Configuración moderna para el cliente HTTP en Angular.

**Ejemplo:**

```typescript
providers: [provideHttpClient(withFetch())];
```

**Detalles:**

- `withFetch()`: Usa la API Fetch en lugar de XMLHttpRequest
- Mejora el rendimiento y compatibilidad con navegadores modernos

### Caché de Peticiones

**Descripción:** Sistema para almacenar respuestas y evitar peticiones repetidas.

**Ejemplo:**

```typescript
private queryCacheCapital = new Map<string, Country[]>();

searchByCapital(query: string): Observable<Country[]> {
  query = query.trim().toLowerCase();

  if (this.queryCacheCapital.has(query)) {
    return of(this.queryCacheCapital.get(query)!);
  }

  return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      tap((countries) => {
        this.queryCacheCapital.set(query, countries);
      })
    )
}
```

**Detalles:**

- Mejora rendimiento evitando peticiones innecesarias
- Implementado con Map para búsqueda eficiente
- Se integra con RxJS mediante `of()` y `tap()`

## 🧩 TypeScript Features

### Union Types

**Descripción:** Tipo que puede ser uno de varios tipos posibles.

**Ejemplo:**

```typescript
export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania" | "Antarctic";
```

**Detalles:**

- Permite definir un conjunto cerrado de opciones válidas
- Proporciona autocompletado y verificación de tipo
- El operador `|` significa "o"

### Type Guards

**Descripción:** Funciones que verifican tipos en tiempo de ejecución.

**Ejemplo:**

```typescript
private isValidRegion(value: string): boolean {
  return this.regions.includes(value as Region);
}
```

**Detalles:**

- Ayuda a TypeScript a inferir tipos en bloques condicionales
- Permite uso seguro de tipos que podrían no ser compatibles
- Comúnmente usa `instanceof`, `typeof` o verificaciones personalizadas

### Record<K, T>

**Descripción:** Tipo que define un objeto con claves de tipo K y valores de tipo T.

**Ejemplo:**

```typescript
const validRegions: Record<string, Region> = {
  africa: "Africa",
  americas: "Americas",
  asia: "Asia",
  // ...
};
```

**Detalles:**

- Garantiza que todas las claves sean de tipo K
- Garantiza que todos los valores sean de tipo T
- Útil para mapeos, diccionarios y objetos de configuración

### Interfaces

**Descripción:** Define la estructura que debe seguir un objeto.

**Ejemplo:**

```typescript
export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  continent: string;
  escudo?: string;
  area?: number;
}
```

**Detalles:**

- `?`: Indica propiedades opcionales
- Proporciona autocompletado y documentación en el IDE
- No genera código JavaScript en tiempo de ejecución

### Operador de Coalescencia Nula (??)

**Descripción:** Proporciona un valor por defecto cuando el valor es null o undefined.

**Ejemplo:**

```typescript
queryParam = this.ActivatedRoute.snapshot.queryParamMap.get("query") ?? "a";
```

**Detalles:**

- Diferente de `||` que evalúa a falso para valores como 0, "", false
- Solo se activa con null o undefined
- Ayuda a evitar errores de valores nulos

### Operador de Encadenamiento Opcional (?.)

**Descripción:** Acceso seguro a propiedades que pueden ser undefined.

**Ejemplo:**

```typescript
name: restCountry.translations?.["spa"]?.common || restCountry.name?.common || 'Desconocido',
```

**Detalles:**

- Evita errores al acceder a propiedades de objetos posiblemente nulos
- Retorna undefined si alguna propiedad en la cadena es null o undefined
- Reduce código boilerplate de verificación

### Type Assertion (as)

**Descripción:** Indica al compilador que trate un valor como un tipo específico.

**Ejemplo:**

```typescript
return this.regions.includes(value as Region);
```

**Detalles:**

- Bypass de verificación de tipos
- Útil cuando el desarrollador tiene más información que el compilador
- Debe usarse con precaución para evitar errores en runtime

## 🏗️ Patrones de Diseño

### Patrón Mapper

**Descripción:** Transforma datos entre diferentes formatos o estructuras.

**Ejemplo:**

```typescript
export class CountryMapper {
  static toDomain(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2 || "",
      flag: restCountry.flag || "",
      // ...
    };
  }

  static toDomainList(restCountries: RESTCountry[]): Country[] {
    return restCountries.map((restCountry) => this.toDomain(restCountry));
  }
}
```

**Detalles:**

- Separa la lógica de transformación de la lógica de negocio
- Facilita adaptar APIs externas a modelos internos
- Centraliza el manejo de estructuras de datos inconsistentes

### Repository Pattern

**Descripción:** Centraliza la lógica de acceso a datos externos.

**Ejemplo:**

```typescript
@Injectable({
  providedIn: "root",
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    // Implementación con caché y manejo de errores
  }

  searchByCountryName(query: string): Observable<Country[]> {
    // Implementación con caché y manejo de errores
  }
}
```

**Detalles:**

- Abstrae la fuente de datos (API, localStorage, etc.)
- Implementa caché y optimizaciones
- Facilita pruebas y cambios en fuentes de datos

### Normalización de Datos

**Descripción:** Estandarización de formatos para consistencia.

**Ejemplo:**

```typescript
function validateQueryParam(queryParam: string): Region | "" {
  const normalizedParam = queryParam.toLowerCase().trim();

  const validRegions: Record<string, Region> = {
    africa: "Africa",
    americas: "Americas",
    // También maneja variantes incorrectas
    america: "Americas",
    europa: "Europe",
    // ...
  };

  return validRegions[normalizedParam] ?? "Africa";
}
```

**Detalles:**

- Maneja inconsistencias de entrada (mayúsculas/minúsculas, espacios)
- Mapea variantes o errores comunes a valores estándar
- Mejora la experiencia al permitir búsquedas más flexibles

### Patrón Debounce

**Descripción:** Limita la frecuencia de ejecución de funciones.

**Ejemplo:**

```typescript
debounceEffect = effect((onCleanup) => {
  const value = this.inputValue();

  const timeout = setTimeout(() => {
    this.value.emit(value);
  }, 1000);

  onCleanup(() => {
    clearTimeout(timeout);
  });
});
```

**Detalles:**

- Reduce sobrecarga de servidor evitando peticiones en cada keystroke
- Mejora rendimiento en eventos frecuentes (resize, scroll, input)
- Implementado con setTimeout y clearTimeout para limpieza

## ⚡ Optimización de Rendimiento

### OnPush Change Detection

**Descripción:** Estrategia que reduce verificaciones de detección de cambios.

**Ejemplo:**

```typescript
@Component({
  selector: "app-footer",
  imports: [],
  templateUrl: "./footer.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
```

**Detalles:**

- Solo verifica componentes cuando:
  - Cambia referencia de Input
  - Se dispara un evento desde el componente o sus hijos
  - Se usa AsyncPipe en el template
  - Se invoca detección manualmente
- Significativa mejora de rendimiento en aplicaciones grandes

### eventCoalescing

**Descripción:** Optimización para combinar eventos múltiples en uno solo.

**Ejemplo:**

```typescript
provideZoneChangeDetection({ eventCoalescing: true });
```

**Detalles:**

- Reduce el número de ciclos de detección de cambios
- Especialmente útil para eventos frecuentes como scroll, resize
- Parte de las optimizaciones de Zone.js en Angular

### withFetch

**Descripción:** Usa la API Fetch en lugar de XMLHttpRequest para peticiones HTTP.

**Ejemplo:**

```typescript
provideHttpClient(withFetch());
```

**Detalles:**

- API más moderna y eficiente
- Mejor soporte para streaming y cancelación
- Mejor rendimiento especialmente en aplicaciones PWA

### Lazy Loading

**Descripción:** Carga componentes y módulos solo cuando son necesarios.

**Ejemplo:**

```typescript
{
  path: 'country',
  loadChildren: () => import('./country/country.routes')
}
```

**Detalles:**

- Reduce el tamaño del bundle inicial
- Mejora el tiempo de carga inicial
- Organiza la aplicación en segmentos lógicos

### Caché con Map

**Descripción:** Almacenamiento en memoria para datos frecuentemente usados.

**Ejemplo:**

```typescript
private queryCacheCapital = new Map<string, Country[]>();

if (this.queryCacheCapital.has(query)) {
  return of(this.queryCacheCapital.get(query)!);
}

// Si no existe, hacer la petición HTTP y guardar en caché
```

**Detalles:**

- Reduce peticiones HTTP repetidas
- Mejora la experiencia de usuario con respuestas instantáneas
- Map proporciona acceso en O(1) para búsquedas eficientes
