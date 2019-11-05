import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unknown-page',
  template: `<div><h1>404: page missing</h1></div>`
})
export class UnknownPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
