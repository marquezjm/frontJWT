import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  nombreUsuario=''

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.nombreUsuario=this.tokenService.getUserName()
  }

}
