export interface WikiResponse {
    batchcomplete?: string;
    query: Query;
}

export interface Query {
    pages: Pages;
}

export interface Pages {
    [key: string]: WikiPage;
}

export interface WikiPage {
    pageid: number;
    ns: number;
    title: string;
    extract: string;
}
