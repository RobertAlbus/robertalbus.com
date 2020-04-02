import { Component, OnInit, OnDestroy } from '@angular/core';
import { SiteContent } from 'src/app/services/contentRepositories/models';
import { Subscription } from 'rxjs';
import { MainPageRepository } from 'src/app/services/contentRepositories/site-content.repository';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit, OnDestroy {

  contentList: SiteContent[];

  subscriptions: Subscription[] = [];
  constructor(public repository: MainPageRepository){

    let subscription = repository.items.subscribe(contentList => {
      this.contentList = contentList;
      console.log(contentList)
    });

    this.subscriptions.push(subscription);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
