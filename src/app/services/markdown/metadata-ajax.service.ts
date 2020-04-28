import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { mdContentMetadata, metadataSlice } from './models';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as yaml from 'js-yaml'


@Injectable({
  providedIn: 'root'
})
export class MetadataAjaxService {

  contentMetaData: BehaviorSubject<mdContentMetadata>;
  subscriptions: Subscription[] = [];
  
  constructor(private http: HttpClient ) {
    this.contentMetaData = new BehaviorSubject<mdContentMetadata>(new mdContentMetadata());
    this.getMetadata();
  }

  getMetadata() {
    const requestUrl = environment.contentBaseUrl + environment.contentMetadataItem;
    const request = this.http.get(requestUrl, {
      observe: 'body',
      responseType: "text"
    });
  
    let subscription = request.subscribe( yamlString => {
      const rawObject = yaml.safeLoad(yamlString);
      let metadata = mapMetadata(rawObject);
      this.contentMetaData.next(metadata);
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}

function mapMetadata(yamlObject: any): mdContentMetadata {
  let metadata = new mdContentMetadata();

  for (let property in yamlObject) {
    const yamlSlice = yamlObject[property];
    yamlSlice["name"] = property;
    const slice = new metadataSlice(yamlSlice);
    if (slice.isValid()) metadata.properties.push(slice);
  }

  return metadata;
}
