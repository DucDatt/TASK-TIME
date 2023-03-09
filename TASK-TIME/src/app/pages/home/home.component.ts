import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  index: number = 0;

  urlIndicesMap = [
    '/home/projects',
    '/home/starred',
  ]

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      let tempIndex = 0;
      try {
        tempIndex = this.urlIndicesMap.indexOf(val.routerEvent.url);
      } catch (error) { }
      if (tempIndex >= 0) {
        this.index = tempIndex;
      }
    })
  }
}
