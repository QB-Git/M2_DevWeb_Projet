import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  modeOptions: any[];
  mode: boolean = false;

  constructor() {
    this.modeOptions = [
      {icon: 'pi pi-sun', mode: false},
      {icon: 'pi pi-moon', mode: true}
    ];
  }

  ngOnInit() {
  }

}
