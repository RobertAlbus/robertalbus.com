import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { Project, BaseContent } from './models';
import { MetadataAjaxService } from '../markdown/metadata-ajax.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectRepository extends BaseRepository<Project> {

  constructor(http: HttpClient, metaDataFetcherService: MetadataAjaxService) {
    super(metaDataFetcherService, http);

    this.init("project");
  }

  map(document: Document, baseObj: BaseContent): Project {
    let project = new Project(baseObj);
    
    project.repo = getRepo(document);
    project.liveSite = getLiveApp(document);
    project.sortOrder = getSortOrder(document);
    
    return project;
  }
}

// helpers
function getRepo(document: Document): string {
  let node = document.querySelector('.content-repo');
  let repoUrl = node?.getAttribute("content");

  return repoUrl;
}

function getLiveApp(document: Document): string {
  let node = document.querySelector('.content-live-app');
  let liveAppUrl = node?.getAttribute("content");

  return liveAppUrl;
}

function getSortOrder(document: Document): number {
  let node = document.querySelector('.content-sort-order');
  let sortOrderString = node?.getAttribute("content");
  let sortOrder = parseInt(sortOrderString)

  return sortOrder;
}
