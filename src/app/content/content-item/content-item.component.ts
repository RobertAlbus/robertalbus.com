import { Component, OnInit, Input } from '@angular/core';
import { ContentTypeUnion } from 'src/app/services/contentRepositories/models';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})
export class ContentItemComponent implements OnInit {

  @Input() item: ContentTypeUnion;
  @Input() hasContentBorder: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
