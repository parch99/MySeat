import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-evrice',
  templateUrl: './evrice.component.html', 
  styleUrls: ['./evrice.component.css']
})
export class EvriceComponent implements OnInit {

  @Input() cost: number;

  constructor() { }

  ngOnInit(): void {
  }

}
