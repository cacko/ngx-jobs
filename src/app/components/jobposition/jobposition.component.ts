import { Component, Input, OnInit } from '@angular/core';

interface IconsInterface {
  [key: string]: string;
}

const DEVICONS: IconsInterface = {
  python: 'devicon-python-plain colored',
  php: 'devicon-php-plain colored',
  django: 'devicon-django-plain colored',
  flask: 'devicon-flask-original colored',
  linux: 'devicon-linux-plain colored',
  typescript: 'devicon-typescript-plain colored',
  fastapi: 'devicon-fastapi-plain colored',
  firebase: 'devicon-firebase-plain colored',
};

@Component({
  selector: 'app-jobposition',
  templateUrl: './jobposition.component.html',
  styleUrls: ['./jobposition.component.scss'],
})
export class JobpositionComponent implements OnInit {
  ngOnInit(): void {
    this.icon = Object.keys(DEVICONS).reduce(
      (res, lng) =>
        this.position.toLowerCase().indexOf(lng) > -1 ? DEVICONS[lng] : res,
      ''
    );
  }

  @Input() position!: string;

  icon: string = '';
}
