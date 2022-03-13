import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../partage/service/rest-api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  data: any;

  chartOptions: any = {
    plugins: {
      legend: {
        labels: {
          font: {
              size: 17
          }
        }
      },
      datalabels: {
        align: 'end',
        anchor: 'end',
        borderRadius: 4,
        backgroundColor: 'teal',
        color: 'white',
        font: {
          weight: 'bold',
        },
      }
    },
  };

  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    this.restApi.getList('status').subscribe((data: string[]) => {
      const labels = data;
      const resa: number[] = Array(labels.length).fill(0);
      this.restApi.getGames().subscribe((games: {}) => {
        console.log(Object.values(games));
        // debugger;
        Object.values(games).forEach((e: any) => {
          console.log(e);
          if (e['status'])
            resa[labels.indexOf(e.status)] += 1;
          console.log(resa);
        });
        this.data = {
          labels: labels,
          datasets: [
            {
              data: resa,
              backgroundColor: [
                '#00B94D',
                '#059BFF',
                '#ff9a0d',
                '#f94646',
                '#c5c6c6',
              ],
              hoverOffset: 4
            }
          ]
        };
      });
    });
  }
}
