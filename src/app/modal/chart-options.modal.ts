import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexOptions, ApexPlotOptions, ApexStates, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export type ChartOptions = {
    series?: ApexAxisChartSeries | number[];
    colors?: string[];
    chart?: ApexChart;
    xaxis?: ApexXAxis;
    title?: ApexTitleSubtitle;
    tooltip?: ApexTooltip;
    fill?: ApexFill;
    dataLabels?: ApexDataLabels;
    stroke?: ApexStroke;
    grid?: ApexGrid;
    yaxis?: ApexYAxis;
    legend?: ApexLegend;
    options?: ApexOptions;
    plotOptions?: ApexPlotOptions | any;
    states?: ApexStates;
    labels?: string[];
  };