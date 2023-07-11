import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  grafico: Chart = new Chart();

  ngOnInit(): void {
    var dados = [['Estoque A', 100], ['Estoque B', 150], ['Estoque C', 200], ['Estoque D', 50]];
    var nomes = ['Estoque A', 'Estoque B', 'Estoque C', 'Estoque D'];

    this.grafico = new Chart({
      chart: { type: 'column' },
      title: { text: 'Controle de Estoques' },
      subtitle: { text: 'Demonstrativo de controle de estoques' },
      series: [{ data: dados, type: undefined as any }],
      xAxis: { categories: nomes },
      legend: { enabled: false },
      credits: { enabled: false }
    });
  }
}
