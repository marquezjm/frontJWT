import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit,OnChanges {

  isLogged=false

  constructor(private tokeService:TokenService,private route:Router,private activatedRoute:ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tokeService.getToken()){
      this.isLogged=true
    } else {
      this.isLogged=false
    }
  }

  ngOnInit() {
    this.isLogged=this.tokeService.isLogged()


    this.route.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.activatedRoute)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
    ).subscribe((route: ActivatedRoute) => {
      console.log(window.location.hash)
      this.isLogged=this.tokeService.isLogged()
    })

   
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  logOut(){
    this.tokeService.logOut()
    this.route.navigate(['/login'])
  }



}
