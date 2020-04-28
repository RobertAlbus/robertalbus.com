import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { Project, BaseContent, SiteContent } from './models';
import { MetadataAjaxService } from '../markdown/metadata-ajax.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainPageRepository extends BaseRepository<SiteContent> {

  constructor(http: HttpClient, metaDataFetcherService: MetadataAjaxService) {
    super(metaDataFetcherService, http);

    this.init("main-page");
  }

  map(document: Document, baseObj: BaseContent): SiteContent {
    let contentItem = new SiteContent(baseObj);
    
    contentItem.sortOrder = getSortOrder(document);
    
    return contentItem;
  }
}

// helpers
function getSortOrder(document: Document): number {
  let node = document.querySelector('.content-sort-order');
  let sortOrderString = node?.getAttribute("content");
  let sortOrder = parseInt(sortOrderString)

  return sortOrder;
}
