import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [

    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalPageComponent,
                data: {
                    title: 'By Capital',
                    description: 'Find countries by their capital city.',
                },
            },
            {

                path: 'by/:code',
                component: CountryPageComponent,
                data: {
                    title: 'By Country',
                    description: 'Find countries by their name.',
                },

            },
            {

                path: 'by-country',
                component: ByCountryPageComponent,
                data: {
                    title: 'By Country',
                    description: 'Find countries by their name.',
                },
            },
            {

                path: 'by-region',
                component: ByRegionPageComponent,
                data: {

                    title: 'By Region',
                    description: 'Find countries by their region.',
                },
            },
            {
                path: '**',
                redirectTo: 'by-capital',
                data: {
                    title: 'By Capital',
                    description: 'Find countries by their capital city.',
                },
            },
        ],
    },

]

export default countryRoutes;