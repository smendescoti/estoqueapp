import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { login } from 'src/app/helpers/auth.helper';
import { AutenticarRequestModel } from 'src/app/models/usuarios/autenticar.request.model';
import { postAutenticar } from 'src/app/services/usuarios/autenticar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  resultado: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
  }

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  })

  get form(): any {
    return this.formLogin.controls;
  }

  onSubmit(): void {

    this.spinner.show();

    const request = new AutenticarRequestModel(
      this.formLogin.value.email as string,
      this.formLogin.value.senha as string
    );

    postAutenticar(request)
      .subscribe({
        next: (data) => {
          login(data); //autenticando o usuário
          this.router.navigate(['/admin/dashboard'])
            .then(() => {
              window.location.reload();
            });
        },
        error: (e) => {
          this.resultado = e.response.data.mensagem;
        }
      })
      .add(() => {
        this.spinner.hide();
      });
  }
}
