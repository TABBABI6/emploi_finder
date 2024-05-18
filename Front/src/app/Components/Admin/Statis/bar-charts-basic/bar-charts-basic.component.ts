import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";
import {Offres} from "../../../../Entity/Offres";
import {HttpErrorResponse} from "@angular/common/http";
import {OffreService} from "../../../../Services/offre.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};
@Component({
  selector: 'app-bar-charts-basic',
  templateUrl: './bar-charts-basic.component.html',
  styleUrls: ['./bar-charts-basic.component.css']
})
export class BarChartsBasicComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> |any;

  constructor(private offreService: OffreService) {}

  public offres: string[] = [];
  public nbPostulation: number[] = [];
  public offres1: Offres[] = [];
  public offres2: any[] = [];


  ngOnInit(): void {
    this.getOffres();
  }

  public getOffres(): void {
    this.offreService.getOffresByYear().subscribe(
        (responce: Offres[]) => {
          this.offres1 = responce.sort(
              function (a,b) {
                return b.postulations.length - a.postulations.length;
              });
          this.offres2 = this.offres1.slice(0, 10);
          for (let offre of this.offres2){
            this.offres.push(offre.titre.toUpperCase());
            this.nbPostulation.push(offre.postulations.length)
          }

          this.chartOptions = {
            series: [
              {
                name: "basic",
                data: this.nbPostulation
              }
            ],
            chart: {
              type: "bar",
              height: 350,
              width: 800,
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: this.offres
            }
          };
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
  }

}
