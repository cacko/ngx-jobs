import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { random, shuffle } from 'lodash-es';

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
  private subjects: Subject<string>[] = [];

  constructor() {}

  register(subject: Subject<string>) {
    this.subjects.push(subject);
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
      const subject = shuffle(this.subjects)[0];
      const rand_anim = shuffle(this.ANIMATIONS)[0];
      subject.next(`animate__animated animate__slower ${rand_anim}`);
    });
  }
}
