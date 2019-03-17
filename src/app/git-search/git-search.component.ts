import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AdvancedSearchModel } from '../advanced-search-model';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})

export class GitSearchComponent implements OnInit {

  searchResults: GitSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;
  form: FormGroup;
  formControls = {};

  constructor(
    private GitSearchService1: GitSearchService,
    private route: ActivatedRoute,
    private router: Router) {

    this.modelKeys.forEach((key) => {
      let validators = [];

      if (key === 'q') {
        validators.push(Validators.required);
      }
      if (key === 'stars') {
        validators.push(Validators.maxLength(4));
      }

      validators.push(this.noSpecialChars);

      this.formControls[key] = new FormControl(this.model[key], validators);
    });

    this.form = new FormGroup(this.formControls);
  }

  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);
  noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
      validateEmail: {
        valid: false
      }
    } : null;

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch(this.searchQuery);
    });

    this.route.data.subscribe((result) => {
      this.title = result.title;
    });
  }

  gitSearch = (query: string) => {
    this.GitSearchService1.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = <GitSearch>response;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  sendQuery = () => {
    this.searchResults = null;
    let search: string = this.form.value['q'];
    let params = '';
    this.modelKeys.forEach((elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.form.value[elem]) {
        if (this.form.value[elem].length > 0) {
          params += '+' + elem + ':' + this.form.value[elem];
        }
      }
    });

    this.searchQuery = search;

    if (params !== '') {
      this.searchQuery = search + params;
    }
    this.displayQuery = this.searchQuery;

    console.log(this.searchQuery);

    this.gitSearch(this.searchQuery);
  }

}
