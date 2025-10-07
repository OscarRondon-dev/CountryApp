import { WikiPage, WikiResponse, } from './../../shared/wikiResponse';
import { SimpleWiki } from "../../shared/simpleWiki";

export class wikiMapper {
    // El mapper recibe la página ya validada y extrae la información necesaria
    static toWikiString(response: WikiResponse): SimpleWiki {
        const pageId = Object.keys(response.query.pages)[0];

        return {
            resume: response.query.pages[pageId].extract,
            title: response.query.pages[pageId].title,
        };
    }
}