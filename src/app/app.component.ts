import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit{
  constructor( private router: Router) {
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if(token){
      this.router.navigateByUrl('/admin/sys');
    }
    else{
      this.router.navigateByUrl('/passport');
    }
  }
}
