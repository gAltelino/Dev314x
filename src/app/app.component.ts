import { Component, OnInit } from '@angular/core';
import { GitSearchService } from './git-search.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GitSearchService]
})
export class AppComponent implements OnInit {

  title = 'Github Browser';

  ngOnInit() {}
}
