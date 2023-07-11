import { Component, OnInit } from '@angular/core';
import { isAuthenticated, logout } from 'src/app/helpers/auth.helper';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isAuthenticated = isAuthenticated();
  }

  sair() {
    if (window.confirm('Deseja realmente sair do sistema?')) {

      this.spinner.show();

      logout();

      this.router.navigate(['/home/login'])
        .then(() => {
          window.location.reload();
        });
    }
  }
}
