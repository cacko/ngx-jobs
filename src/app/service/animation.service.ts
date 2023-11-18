import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { random, shuffle, chain, take } from 'lodash-es';
import { IconPosition, StylesEntity } from '../entity/icons.entity';



@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private classSubjects: Subject<string>[] = [];
  private positions: IconPosition[] = [];

  constructor() {}

  register(classes: Subject<string>): IconPosition {
    this.classSubjects.push(classes);
    const position = {
      x: random(2,95),
      y: random(2,95),
    };
    this.positions.push(position);
    return position;
  }

  readonly ANIMATIONS = [
    'animate__bounce',
    'animate__shakeY',
    'animate__rubberBand',
    'animate__flip',
    'animate__flip',
  ];
  // classes = 'animate__animated';\
  classes: string[] = [];

  start() {
    interval(2000 + random(3000, 5000)).subscribe(() => {
      const subject = shuffle(this.classSubjects)[0];
      const rand_anim = shuffle(this.ANIMATIONS)[0];
      subject.next(`no-opacity animate__animated animate__slower ${rand_anim}`);
    });
  }
}
