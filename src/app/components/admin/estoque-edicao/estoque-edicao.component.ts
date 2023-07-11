import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { getByIdEstoque, putEstoque } from 'src/app/services/estoques/estoques.service';
import { EstoquePutRequestModel } from 'src/app/models/estoques/estoque-put.request.model';

@Component({
  selector: 'app-estoque-edicao',
  templateUrl: './estoque-edicao.component.html',
  styleUrls: ['./estoque-edicao.component.css']
})
export class EstoqueEdicaoComponent implements OnInit {

  resultado: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    let id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    getByIdEstoque(id)
      .subscribe({
        next: (data) => {
          //preencher o formulário com os dados obtidos
          this.formEstoque.patchValue(data);
        },
        error: (e) => {
          this.resultado = 'Falha ao obter estoque.';
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }

  formEstoque = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEstoque.controls;
  }

  onSubmit(): void {
    this.spinner.show();

    const request = new EstoquePutRequestModel(
      this.formEstoque.value.id as string,
      this.formEstoque.value.nome as string,
      this.formEstoque.value.descricao as string
    );

    putEstoque(request)
      .subscribe({
        next: (data) => {
          this.resultado = `Estoque '${data.nome}', atualizado com sucesso.`;
        },
        error: (e) => {
          this.resultado = 'Falha ao atualizar o estoque.';
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }
}
