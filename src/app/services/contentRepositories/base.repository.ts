import { Injectable, OnDestroy } from '@angular/core';
import { MetadataAjaxService } from '../markdown/metadata-ajax.service';
import { metadataSlice } from '../markdown/models';
import { BaseContent } from './models';
import { HttpClient } from '@angular/common/http';
import { Marked } from 'marked-ts';
import { BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseRepository<T extends BaseContent> implements OnDestroy {

  items: BehaviorSubject<T[]>;

  // must be implemented by the child class
  abstract map(document: Document, baseObject: BaseContent): T;

  // must be called by the child class
  init(metadataSliceName: string): void {
    this.domParser = new DOMParser();
    this.items = new BehaviorSubject<T[]>([]);
    this.getMetadata(metadataSliceName);
  }

  public hasItems(): boolean {
    get: { return this.items.value.length > 0; }
  }

  private domParser: DOMParser;
  private subscriptions: Subscription[] = [];

  constructor(
    public metadataService: MetadataAjaxService, 
    private http: HttpClient) {

  }

  getMetadata(metadataSliceName: string): void {
    let subscription = this.metadataService.contentMetaData.subscribe( metadata => {
      const sliceMatches = metadata.properties.filter(slice => slice.name == metadataSliceName)
      if (sliceMatches.length) {
        this.items.next([]);
        this.buildRepoItems(sliceMatches[0]);
      }
    });

    this.subscriptions.push(subscription)
  }

  buildRepoItems(metadata: metadataSlice): void {
    
    if (!metadata || !metadata.items || !metadata.path) {
      return;
    };

    // retain context inside the callback
    const self = this;

    for (let markdownAssetUrl of metadata.items) {

        const request = this.http.get(metadata.path + markdownAssetUrl, {
          observe: 'body',
          responseType: "text"
        });
    
        const subscription = request.subscribe( mdString => {
          const parsedMarkdown = Marked.parse(mdString);
          const parsedDocument = this.domParser.parseFromString(parsedMarkdown, "text/html");// new Beautiful(parsedMarkdown);
          const baseItem = this.baseMap(parsedDocument, parsedMarkdown)
          
          const fullyMappedContent = this.map(parsedDocument, baseItem);

          const tempArray = self.items.value;
          tempArray.push(fullyMappedContent)
          self.items.next(tempArray); 
        });
        
        this.subscriptions.push(subscription);
    }
  }

  baseMap(document: Document, parsedMarkdown: string): BaseContent {
    let item = new BaseContent();

    item.shouldDisplay = getShouldDisplay(document);
    item.title = getTitle(document);
    item.description = getDescription(document);
    item.tags = getTags(document);
    item.content = parsedMarkdown;

    return item;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    })
  }
}

function getShouldDisplay(document: Document): boolean {
  let node = document.querySelector('.content-should-display');
  let shouldDisplay = !!node?.getAttribute("data-content");
  
  return shouldDisplay;
}

function getTitle(document: Document): string {
  let node = document.querySelector('.content-title');
  let title = node?.getAttribute("data-content") || "";

  return title;
}

function getDescription(document: Document): string {
  let node = document.querySelector('.content-description');
  let description = node?.getAttribute("content") || "";

  return description;
}

function getTags(document: Document): string[] {
  let nodes = document.querySelectorAll('.content-tag');

  let tags: string[] = [];
  nodes.forEach( node => {
    let tag = node?.getAttribute("content-tag");
    tags.push(tag);
  })

  return [... new Set(tags)];
}
