import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ApplicationConstant } from 'src/app/constants/application.constant';
import { ChartOptions } from 'src/app/modal/chart-options.modal';
import { Transaction } from 'src/app/modal/transaction.modal';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
})
export class BarComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() series: {name: string, color:string, data:number[]}[] = [];
  @Input() labels: string[] = [];

  income: number;
  expense: number;
  net: number;
  height = 400;

  ngOnInit() {
    // this.populateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.populateChart();
    this.updateLabels();
  }

  updateLabels(){
    this.series.forEach(ser=>{
      if(ser.name==='Income'){
        this.income = ser.data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      }else{
        this.expense = ser.data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      }
    })
    this.net = this.income - this.expense
  }

  populateChart(){
    this.height = this.height < this.series[0].data.length * 50 ? this.series[0].data.length * 50 : this.height;
    this.chartOptions = {
      series: [
        ...this.series
      ],
      chart: {
        width: "100%",
        height: this.height,
        sparkline: {
          enabled: false,
        },
        type: 'bar',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '100%',
          borderRadiusApplication: 'end',
          borderRadius: 6,
          dataLabels: {
            position: 'top',
          },
        },
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      fill: {
        opacity: 1,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20,
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
        },
        categories: this.labels,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
        },
      },
    };
  }
}