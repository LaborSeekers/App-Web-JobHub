import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-category-chart-dialog',
  templateUrl: 'category-chart-dialog.component.html',
  styleUrls: ['category-chart-dialog.component.css']
})
export class CategoryChartDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { categoryData: any[]; selectedCategory: string }) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('categoryChartDialog') as HTMLCanvasElement;

    if (!ctx) {
      console.error('No se encontró el canvas para renderizar el gráfico.');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.categoryData.map((item) => item.label),
        datasets: [
          {
            label: `Cantidad de ofertas por ${this.data.selectedCategory}`,
            data: this.data.categoryData.map((item) => item.value),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
        scales: {
          y: { title: { display: true, text: 'Cantidad de Ofertas' }, beginAtZero: true },
          x: { title: { display: true, text: this.data.selectedCategory } },
        },
      },
    });
  }
}
