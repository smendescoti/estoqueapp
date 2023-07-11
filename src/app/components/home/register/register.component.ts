import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CriarContaRequestModel } from 'src/app/models/usuarios/criar-conta.request.model';
import { postCriarConta } from 'src/app/services/usuarios/criar-conta.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //atributo
  resultado: string = '';

  //construtor
  constructor(
    private spinner: NgxSpinnerService
  ) { }

  //estrutura do formulário
  formRegister = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    senha_confirmacao: new FormControl('', [Validators.required])
  });

  //função para acessar os campos na página html
  get form(): any {
    return this.formRegister.controls;
  }

  //função para processar o SUBMIT do formulário
  onSubmit(): void {

    this.spinner.show();

    //dados enviados na requisição
    const request = new CriarContaRequestModel(
      this.formRegister.value.nome as string,
      this.formRegister.value.email as string,
      this.formRegister.value.senha as string,
      this.formRegister.value.senha_confirmacao as string
    );

    //fazendo a requisição para a API
    postCriarConta(request)
      .subscribe({
        next: (data) => {
          this.resultado = `Parabéns ${data.nome}, sua conta foi criada com sucesso!`;
          this.formRegister.reset();
        },
        error: (e) => {
          this.resultado = e.response.data.mensagem;
          console.log(e.response.data)
        }
      }).add(() => {
        this.spinner.hide();
      })
  }
}