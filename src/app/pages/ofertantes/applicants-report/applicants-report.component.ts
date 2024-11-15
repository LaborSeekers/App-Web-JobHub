import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { OfertantesService } from '../../../core/services/ofertantes.service';
import { ApplicantsByJobOfferReportDTO } from '../../../core/models/applicants-by-jobOffer-report.model';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-applicants-report',
  templateUrl: './applicants-report.component.html',
  styleUrls: ['./applicants-report.component.css']
})
export class ApplicantsReportComponent implements OnInit {

  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Postulantes',
      backgroundColor: 'rgba(52, 152, 219, 0.7)',
      hoverBackgroundColor: 'rgba(41, 128, 185, 0.9)',
      borderColor: 'rgba(52, 152, 219, 1)',
      borderWidth: 2,
      borderRadius: 8,
      barPercentage: 0.6,
    }]
  };

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Ofertas Laborales',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Postulantes',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          precision: 0
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2c3e50',
        bodyColor: '#34495e',
        borderColor: '#bdc3c7',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        boxPadding: 6
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  };

  constructor(
    private authService: AuthService,
    private ofertantesService: OfertantesService
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    const userId = userInfo?.userRoleId;
    console.log('id: ', userId);

    if (userId) {
      this.ofertantesService.getJobOffersWithApplicantsCount(userId).subscribe({
        next: (data: ApplicantsByJobOfferReportDTO[]) => {
          this.chartData.labels = data.map(item => item.jobTitle);
          this.chartData.datasets[0].data = data.map(item => item.applicantsCount);
          this.renderChart();
        },
        error: (err) => {
          console.error('Error al obtener los datos del reporte:', err);
        }
      });
    }
  }

  renderChart(): void {
    const ctx = document.getElementById('applicantsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }
}