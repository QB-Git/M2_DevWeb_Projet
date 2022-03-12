import { Game } from './../Game';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {
  @Input() game: Game | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
