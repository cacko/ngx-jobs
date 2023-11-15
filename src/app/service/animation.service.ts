import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { random, shuffle, chain, take } from 'lodash-es';
import { StylesEntity } from '../entity/icons.entity';

interface AnimCoordinates {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private classSubjects: Subject<string>[] = [];
  private styleSubjects: Subject<StylesEntity>[] = [];

  constructor() {}

  register(classes: Subject<string>, styles: Subject<StylesEntity>) {
    this.classSubjects.push(classes);
    this.styleSubjects.push(styles);
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

  moveStart(subject: Subject<StylesEntity>) {
    const styles = {
      top: `${random(2, 98)}vw`,
      left: `${random(2, 98)}vh`,
      offsetPath: `path("M${random(30)},${random(30)} C${random(30)},${random(
        300
      )} ${random(300)},${random(30)} ${random(300)},${random(230)}")`,
      animation: `move ${random(5, 15)}s alternate ease-in-out`,
    };
    subject.next(styles);
  }

  start() {
    interval(2000 + random(3000, 5000)).subscribe(() => {
      const subject = shuffle(this.classSubjects)[0];
      const rand_anim = shuffle(this.ANIMATIONS)[0];
      subject.next(`animate__animated animate__slower ${rand_anim}`);
    });
     interval(15000).subscribe(() => {
      take(shuffle(this.styleSubjects),4).forEach((st) => this.moveStart(st));
    });
  }
}
