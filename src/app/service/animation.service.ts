import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { random, shuffle, isUndefined, remove, pull } from 'lodash-es';
import { IconPosition, StylesEntity } from '../entity/icons.entity';
import { SHA1 } from 'crypto-js';

interface Subjects {
  [key:string]: Subject<string>;
}

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private classSubjects: Subjects = {};
  private positions: IconPosition[] = [];
  private choices: number[] = [];

  private readonly SIZE = 150;

  constructor() {
    this.choices = [...Array(Math.floor(this.height / this.SIZE) * Math.floor(this.width / this.SIZE)).keys()];
  }

  get width(): number {
    return window.screen.width;
  }

  get height(): number {
    return window.screen.height;
  }

  private positionToChoice(position: IconPosition): number {
    const row = Math.floor(this.height / this.SIZE);
    const col = Math.floor(this.width / this.SIZE);
    const numCols =  Math.floor(this.width /  this.SIZE);
    return (row * numCols) + col;
  }

  private removePosition(position: IconPosition) {
    const choice = this.positionToChoice(position);
    this.choices.push(choice);
    delete this.classSubjects[this.positionHash(position)];
  }

  private positionHash(position: IconPosition): string {
    return SHA1(`${position.x}_${position.y}`).toString();
  }

  register(classes: Subject<string>): IconPosition | null {
    const pos = shuffle(this.choices).pop();
    this.choices = this.choices.filter(a => a !== pos);
    if (isUndefined(pos)) {
      return null;
    }
    const numCols =  Math.floor(this.width/  this.SIZE);
    const position = {
      x: (pos % numCols ) * this.SIZE + random(10, this.SIZE/2),
      y: Math.floor(pos / numCols) * this.SIZE + random(10, this.SIZE/2),
    };
    this.classSubjects[this.positionHash(position)] = classes;
    this.positions.push(position);
    return position;
  }

  unregister(position: IconPosition) {
    return this.removePosition(position);
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
      const subject = shuffle(Object.values(this.classSubjects))[0];
      const rand_anim = shuffle(this.ANIMATIONS)[0];
      subject.next(`no-opacity animate__animated animate__repeat-5 animate__fast ${rand_anim}`);
    });
  }
}
