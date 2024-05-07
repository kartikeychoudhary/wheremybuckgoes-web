import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/modal/chart-options.modal';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
})
export class DonutComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() series: number[] = [];
  @Input() labels: string[] = [];
  @Input() duration: string;
  height = 400;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.sortChart();
    this.populateChart();
    // this.updateLabels();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  populateChart() {
    this.height =
      this.height < this.series.length * 50
        ? this.series.length * 50
        : this.height;
    this.chartOptions = {
      series: this.series,
      chart: {
        height: this.height,
        width: '100%',
        type: 'donut',
      },
      stroke: {
        colors: ['transparent'],
        lineCap: 'butt',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: 'Inter, sans-serif',
                offsetY: 20,
              },
              value: {
                show: true,
                fontFamily: 'Inter, sans-serif',
                offsetY: -20,
                formatter: function (value) {
                  return value;
                },
              },
            },
            size: '80%',
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: this.labels,
      dataLabels: {
        enabled: false,
      },
      legend: {
        onItemHover: {
          highlightDataSeries: true,
        },
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
        formatter: function (value, opts) {
          return value;
        },
        horizontalAlign: 'left',
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + '';
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value;
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

  sortChart(){
    const combinedData = this.series.map((item, index) => {
      return { label: this.labels[index], value: item };
    });
    combinedData.sort((a, b) => b.value - a.value);
    const sortedLabels = combinedData.map(val=>val.label);
    const sortedSeries = combinedData.map(val=>val.value);
    this.series = sortedSeries;
    this.labels = sortedLabels;
  }
}
