import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexLegend
} from "ng-apexcharts";
import {CandidatService} from "../../../../Services/candidat.service";
import {Offres} from "../../../../Entity/Offres";
import {HttpErrorResponse} from "@angular/common/http";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    labels: string[];
    legend: ApexLegend;
    subtitle: ApexTitleSubtitle;
};

@Component({
    selector: 'app-area-charts',
    templateUrl: './area-charts.component.html',
    styleUrls: ['./area-charts.component.css']
})
export class AreaChartsComponent implements OnInit {

    @ViewChild("chart") chart: ChartComponent | undefined;
    public chartOptions: Partial<ChartOptions> | any;

    constructor(private candidatService: CandidatService) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    public users: any[] = [];
    public nombre:  number[] = [];

    public getUsers() {
        this.candidatService.getUsers().subscribe(
            (responce: any[]) => {
                this.users = responce;
                let m = 1;
                for (let j = 0; j < 12; j++) {
                    var n = 0;
                    for (let user of this.users) {
                        const [year, month, day] = user.dateinscription.split('-');
                        if (Number(month) == m) {
                            n++;
                        }
                    }
                    this.nombre.push(n);
                    m += 1;
                }


                this.chartOptions = {
                    series: [
                        {
                            name: "Utilisateur",
                            data: this.nombre
                        }
                    ],
                    chart: {
                        type: "area",
                        height: 350,
                        width: 800,
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "straight"
                    },

                    title: {
                        text: "",
                        align: "left"
                    },
                    subtitle: {
                        text: "",
                        align: "left"
                    },
                    labels: [
                        "Jan",
                        "Fév",
                        "Mar",
                        "Avr",
                        "Mai",
                        "Juin",
                        "Juil",
                        "Août",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Déc"
                    ],

                    yaxis: {
                        opposite: true
                    },
                    legend: {
                        horizontalAlign: "left"
                    }
                };


            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            });
    }
}
