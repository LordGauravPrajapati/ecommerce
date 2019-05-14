import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle:string;
  @Input() iconTitle:string;
  @Input() helpTitle:string;
  configData;
  counter = 0;
  constructor(private _backendservice: BackendService) { }
userstatuscolor="warn";
  ngOnInit() {
    this.counter = 0;
    this.configData= this._backendservice.getConfig();
    this._backendservice.getCartTotal().subscribe(
      (res) => {
        this.counter = res;
      }
    );
    this._backendservice.getUserStatus().subscribe(
      (res) => {
        this.userstatuscolor=res ?"primary":"warn";
      }
    )
  }

}
