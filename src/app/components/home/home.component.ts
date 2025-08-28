import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    // this.userService.user.subscribe((res) => {
    //   console.log(res)
    //   this.router.navigateByUrl(`/${res?.email || ''}`);
    // });
    this.router.navigateByUrl(`/alex@cacko.net`);
  }
}
