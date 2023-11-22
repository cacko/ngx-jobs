import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { random, shuffle, isUndefined, remove, pull } from 'lodash-es';
import { IconPosition, StylesEntity } from '../entity/icons.entity';


@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private classSubjects: Subject<string>[] = [];
  private positions: IconPosition[] = [];
  private choices: number[] = [];

  private readonly SIZE = 150;

  constructor() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.choices = [...Array(Math.floor(screenHeight / this.SIZE) * Math.floor(screenWidth / this.SIZE)).keys()];

  }

  register(classes: Subject<string>): IconPosition | null {
    this.classSubjects.push(classes);
    const pos = shuffle(this.choices).pop();
    this.choices = this.choices.filter(a => a !== pos);
    if (isUndefined(pos)) {
      return null;
    }
    const numRows =  Math.floor(window.innerWidth /  this.SIZE);
    const position = {
      x: (pos % numRows ) * this.SIZE + random(10, this.SIZE/2),
      y: Math.floor(pos / numRows) * this.SIZE + random(10, this.SIZE/2),
    };
    this.positions.push(position);
    return position;
  }

  readonly ANIMATIONS = [
    'animate__bounce',
    'animate__shakeY',
    'animate__rubberBand',
    'animate__flip',
    'animate__wobble',
    'animate__jello',
    'animate__rotateIn',
    'animate__swing'
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
