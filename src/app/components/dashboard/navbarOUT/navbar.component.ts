import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})

export class NavbarComponent {
  constructor(

    private router:Router
  ) { }

  salir() {
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }
}
