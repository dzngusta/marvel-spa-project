declare interface IComicsResponse {
	count: number;
	limits: number;
	offset: number;
	results: TComics;
	total: number;
}

declare type TComics = IComic[];

declare interface IComic {
	id: number;
	digitalId: number;
	title: string;
	issueNumber: number;
	variantDescription: string;
	description: string;
	modified: Date;
	isbn: string;
	upc: string;
	diamondCode: string;
	ean: string;
	issn: string;
	format: string;
	pageCount: number;
	textObjects: [];
	resourceURI: string;
	urls: [{ type: string; url: string }];
	series: { resourceURI: string; name: string };
	variants: TComicSummary[];
	collections: TComicSummary[];
	collectedIssues: TComicSummary[];
	dates: [{ type: string; date: Date }];
	prices: [{ type: string; price: number }];
	thumbnail: TImage;
	images: TImage[];
	creators: TResourceList;
	characters: TResourceList;
	stories: TResourceList;
	events: TResourceList;
}

type TResourceList = [
	{
		available: number;
		collectionURI: string;
		items: [
			{
				resourceURI: string;
				name: string;
				type?: string;
				role?: string;
			},
		];
		returned: number;
	},
];

type TImage = { extension: string; path: string };

type TComicSummary = { resourceURI: string; name: string };
