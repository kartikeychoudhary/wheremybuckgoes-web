import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/modal/chart-options.modal';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
})
export class PieComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() series: number[] = [];
  @Input() labels: string[] = [];
  @Input() duration: string;
  height = 400;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.populateChart();
    // this.updateLabels();
  }

  ngOnInit() {}

  populateChart() {
    this.height = this.height < this.series.length * 50 ? this.series.length * 50 : this.height;
    this.chartOptions = {
      series: this.series,
      chart: {
        height: this.height,
        width: '100%',
        type: 'pie',
      },
      stroke: {
        colors: ['white'],
        lineCap: 'butt',
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: '100%',
          dataLabels: {
            offset: -25,
          },
        },
      },
      labels: this.labels,
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + '%';
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + '%';
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  }
}
