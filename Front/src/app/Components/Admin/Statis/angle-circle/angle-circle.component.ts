import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent
} from "ng-apexcharts";
import {map} from "rxjs";
import {Recruteur} from "../../../../Entity/Recruteur";
import {HttpErrorResponse} from "@angular/common/http";
import {RecruteurService} from "../../../../Services/recruteur.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};
@Component({
  selector: 'app-angle-circle',
  templateUrl: './angle-circle.component.html',
  styleUrls: ['./angle-circle.component.css']
})
export class AngleCircleComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  public recruteurs1!: any[];
  public recruteurs2!: any[];
  public nbOffres: number[] = [];
  public recruteurs: string[] = [];

  constructor(private recruteurService: RecruteurService) {}

  ngOnInit(): void {
    this.getRecruteurs();
  }

  public getRecruteurs(): void{
    this.recruteurService.getRecruteurs()
        .subscribe(
            (responce:Recruteur[]) => {
              this.recruteurs1 = responce.sort(
                  function (a,b) {
                    return b.offres.length - a.offres.length;
                  });
              this.recruteurs2 = this.recruteurs1.slice(0, 10);
              for (let recruteur of this.recruteurs2){
                this.recruteurs.push(recruteur.prenom.toUpperCase());
                this.nbOffres.push(recruteur.offres.length)
              }

              this.chartOptions = {
                series: this.nbOffres,
                chart: {
                  height: 350,
                  type: "radialBar"
                },
                plotOptions: {
                  radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                      margin: 5,
                      size: "50%",
                      background: "transparent",
                      image: undefined
                    },
                    dataLabels: {
                      name: {
                        show: false
                      },
                      value: {
                        show: false
                      }
                    }
                  }
                },
                labels: this.recruteurs,
                legend: {
                  show: true,
                  floating: true,
                  fontSize: "12px",
                  position: "left",
                  offsetX: 0,
                  offsetY: 0,
                  labels: {
                    useSeriesColors: true
                  },
                  formatter: function(seriesName: any, opts: any) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                  },
                  itemMargin: {
                    horizontal: 3
                  }
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      legend: {
                        show: false
                      }
                    }
                  }
                ]
              };


            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            });
  }

}
