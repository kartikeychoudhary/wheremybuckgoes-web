import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { getMillisForLast } from 'src/app/utils/application.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  rowData = [];
  isLoaded = false;
  
  multiDimChart:any;
  singleDimChart:any;

  multiDimChartSeries = [];
  multiDimChartLabels = [];

  singleDimChartSeries = [];
  singleDimChartLabels = [];

  accountSelector = [];
  account = ''
  accounts = []
  uniqueSelector = [];
  uniqueSelected = '';

  duration = '7_DAYS';

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadTransactions();
  }


  loadTransactions() {
    const millis = this.duration === 'ALL' ? 'All' : getMillisForLast(this.duration);
      this.dashboardService.getAllTransactionsForDashboard(millis).subscribe({
        next: (res) => {
          if (res['status'] === 'OK') {
            this.multiDimChart = res['payload']['RESULT']['multiDimChart']
            this.singleDimChart = res['payload']['RESULT']['singleDimChart']
            if(this.multiDimChart && this.singleDimChart && Object.keys(this.multiDimChart).length > 0 && Object.keys(this.singleDimChart).length > 0){
              this.accounts = Object.keys(this.multiDimChart);
              this.account = this.accounts[0]
              this.uniqueSelector = Object.keys(this.singleDimChart[this.account]);
              this.uniqueSelected = this.uniqueSelector[0];
              this.selector();
              this.isLoaded = true;
            }
          }
        },
        error: (err) => {
          this.isLoaded = true;
        },
    });
  }

  selector(){
    this.multiDimChartSeries = this.multiDimChart[this.account].series;
    this.multiDimChartLabels = this.multiDimChart[this.account].labels;

    this.singleDimChartSeries = this.singleDimChart[this.account][this.uniqueSelected][1].series;
    this.singleDimChartLabels = this.singleDimChart[this.account][this.uniqueSelected][1].labels;
  }
  
}
