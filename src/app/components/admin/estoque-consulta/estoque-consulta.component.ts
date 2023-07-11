import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstoqueGetResponseModel } from 'src/app/models/estoques/estoque-get.response.model';
import { deleteEstoque, getAllEstoque, getExcelEstoque, getPdfEstoque } from 'src/app/services/estoques/estoques.service';

@Component({
  selector: 'app-estoque-consulta',
  templateUrl: './estoque-consulta.component.html',
  styleUrls: ['./estoque-consulta.component.css']
})
export class EstoqueConsultaComponent implements OnInit {

  resultado: string = '';

  //atributos e dados do grid
  columnNames: string[] = ['nome', 'descricao', 'datacriacao', 'operacoes'];
  dataSource = new MatTableDataSource<DataSourceModel>();

  //função executado ao abrir o componente
  ngOnInit(): void {
    this.spinner.show();
    getAllEstoque()
      .subscribe({
        next: (data) => {
          const dados: any[] = [];
          data.forEach((item: EstoqueGetResponseModel) => {
            dados.push({
              id: item.id,
              nome: item.nome,
              descricao: item.descricao,
              datacriacao: item.dataHoraCadastro
            })
          });
          this.dataSource.data = dados;
        },
        error: (e) => {
          console.log(e.response.data);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }

  //construtor
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  //função para capturar o evento de exclusão
  onDelete(id: string): void {
    if (window.confirm('Deseja realmente excluir o estoque selecionado?')) {
      this.spinner.show();
      deleteEstoque(id)
        .subscribe({
          next: (data) => {
            this.resultado = `Estoque '${data.nome}', excluído com sucesso.`;
            this.ngOnInit();
          },
          error: (e) => {
            this.resultado = 'Falha ao excluir o estoque.';
            console.log(e.error);
          }
        })
        .add(() => {
          this.spinner.hide();
        })
    }
  }

  //função para capturar o evento de edição
  onEdit(id: string): void {
    this.router.navigate(['/admin/estoque-edicao', id]);
  }

  //função para download dos relatórios
  onDownloadClick(opcao: string): void {

    this.spinner.show();

    if (opcao == 'PDF') {
      getPdfEstoque().subscribe().add(() => { this.spinner.hide(); });
    }
    else if (opcao == 'EXCEL') {
      getExcelEstoque().subscribe().add(() => { this.spinner.hide(); });
    }
  }
}
/*
  Modelo de dados para as informações que são
  guardadas dentro do DataTable do Material
*/
class DataSourceModel {
  id: string = '';
  nome: string = '';
  descricao: string = '';
  datacriacao: Date | null = null;
}
