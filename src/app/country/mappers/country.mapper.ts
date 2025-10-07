import { Country } from "../interfaces/country";
import { RESTCountry } from "../interfaces/rest-countries";



export class CountryMapper {
    static toDomain(restCountry: RESTCountry): Country {
        return {
            cca2: restCountry.cca2 || '',
            flag: restCountry.flag || '',
            flagSvg: restCountry.flags?.svg || '',
            name: restCountry.translations?.["spa"]?.common || restCountry.name?.common || 'Desconocido',

            // Aquí está la corrección principal
            capital: Array.isArray(restCountry.capital) // Verifica si es un array
                ? restCountry.capital.join(", ") // Si es un array, lo unimos en una cadena
                : (typeof restCountry.capital === 'string' // Verifica si es un string
                    ? restCountry.capital // Si es un string, lo dejamos como está
                    : 'No tiene capital'),

            population: restCountry.population || 0,
            continent: restCountry.subregion || restCountry.region || 'Desconocido',
            escudo: restCountry.coatOfArms?.png || restCountry.coatOfArms?.svg || '',
            area: restCountry.area || 0,
        };
    }

    static toDomainList(restCountries: RESTCountry[]): Country[] {
        return restCountries.map((restCountry) => this.toDomain(restCountry));
    }

}