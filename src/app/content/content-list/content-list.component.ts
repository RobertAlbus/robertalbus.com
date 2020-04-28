import { Component, OnInit, Input } from '@angular/core';
import { ContentTypeArrayUnion } from 'src/app/services/contentRepositories/models';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  
  @Input() items: ContentTypeArrayUnion;
  @Input() heading: string = "";
  @Input() hasContentBorder: boolean = false;
  
  constructor(){
  }

  ngOnInit() {
  }
}
