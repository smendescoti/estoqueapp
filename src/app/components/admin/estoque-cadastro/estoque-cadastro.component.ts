import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstoquePostRequestModel } from 'src/app/models/estoques/estoque-post.request.model';
import { postEstoque } from 'src/app/services/estoques/estoques.service';

@Component({
  selector: 'app-estoque-cadastro',
  templateUrl: './estoque-cadastro.component.html',
  styleUrls: ['./estoque-cadastro.component.css']
})
export class EstoqueCadastroComponent {

  resultado: string = '';

  constructor(
    private spinner: NgxSpinnerService
  ) {
  }

  formEstoque = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEstoque.controls;
  }

  onSubmit(): void {

    this.spinner.show();

    const request = new EstoquePostRequestModel(
      this.formEstoque.value.nome as string,
      this.formEstoque.value.descricao as string
    );

    postEstoque(request)
      .subscribe({
        next: (data) => {
          this.resultado = `Estoque '${data.nome}', cadastrado com sucesso!`;
          this.formEstoque.reset();
        },
        error: (e) => {
          this.resultado = 'Falha ao cadastrar o estoque.';
          console.log(e.response.data);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }

}
