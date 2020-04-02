export class BaseContent {
  content?: string;
  title?: string;
  tags?: string[];
  description?: string;
  shouldDisplay?: boolean;

  constructor(baseContent?: BaseContent) {
    if (baseContent) {
      const keys = Object.keys(baseContent);
      for (let key of keys) {
        this[key] = baseContent[key];
      }
    }
  }
}

export type ContentTypeUnion = 
  Project | 
  BlogPost | 
  SiteContent;
export type ContentTypeArrayUnion = 
  Project[] | 
  BlogPost[] | 
  SiteContent[];

export class SiteContent extends BaseContent {
  sortOrder: number;
}

export class Project extends BaseContent {
    repo: string;
    liveSite: string;
    sortOrder: number;
}

export class BlogPost extends BaseContent {
    tags: string[];
    publishDate: Date;
}