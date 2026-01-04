export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	lastUpdated: string | null;
	author: string;
	tags: string[];
	image?: string;
	readTime: number;
	published?: boolean;
	tldr?: string[];
}
