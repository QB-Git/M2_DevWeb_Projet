import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../partage/service/rest-api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  data: any;

  // Les options du graphique (taille de la légende)
  chartOptions: any = {
    plugins: {
      legend: {
        labels: {
          font: {
              size: 17
          }
        }
      }
    },
  };

  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    this.restApi.getList('status').subscribe((data: string[]) => {
      const labels = data;
      const resa: number[] = Array(labels.length).fill(0);
      this.restApi.getGames().subscribe((games: {}) => {
        // On récupère l'ensemble des infos
        // et on construit notre graphique
        Object.values(games).forEach((e: any) => {
          if (e['status'])
            resa[labels.indexOf(e.status)] += 1;
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
