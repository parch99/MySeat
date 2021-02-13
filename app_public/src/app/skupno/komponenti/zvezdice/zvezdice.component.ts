import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-zvezdice',
  templateUrl: './zvezdice.component.html',
  styleUrls: ['./zvezdice.component.css']
})
export class ZvezdiceComponent implements OnInit {

  @Input() ocena: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
