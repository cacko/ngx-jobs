import { Injectable } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';
import { random, isEmpty, shuffle, isUndefined } from 'lodash-es';
import { Position } from '../models/position.model';

interface Subjects {
  [key: string]: Subject<string>;
}

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private classSubjects: Subjects = {};
  private choices: number[] = [];

  private readonly SIZE = 150;
  private readonly OFFSET = 60;

  private interval?: Subscription;

  constructor(
  ) {
    this.choices = [...Array(Math.floor(this.height / this.SIZE) * Math.floor(this.width / this.SIZE)).keys()];
  }

  get width(): number {
    return window.screen.width - this.OFFSET;
  }

  get height(): number {
    return window.screen.height - this.OFFSET;
  }

  private positionToChoice(position: Position): number {
    const row = Math.floor(this.height / this.SIZE);
    const col = Math.floor(this.width / this.SIZE);
    const numCols = Math.floor(this.width / this.SIZE);
    return (row * numCols) + col;
  }

  private removePosition(position: Position) {
    const choice = this.positionToChoice(position);
    this.choices.push(choice);
    delete this.classSubjects[position.id];
    return true;
  }

  register(classes: Subject<string>): Position | null {
    const pos = shuffle(this.choices).pop();
    this.choices = this.choices.filter(a => a !== pos);
    if (isUndefined(pos)) {
      return null;
    }
    const numCols = Math.floor(this.width / this.SIZE);
    const position = new Position({
      x: (pos % numCols) * this.SIZE + random(10, this.SIZE / 2),
      y: Math.floor(pos / numCols) * this.SIZE + random(10, this.SIZE / 2),
    });
    this.classSubjects[position.id] = classes;
    return position;
  }

  unregister(position: Position): boolean {
    return this.removePosition(position);
  }

  hide(position: Position) {
    const subject = this.classSubjects[position.id];
    subject?.next(`no-opacity animate__animated animate__fast animate__fadeOut`)
  }

  show(position: Position) {
    const subject = this.classSubjects[position.id];
    subject?.next(`no-opacity animate__animated animate__fast animate__fadeIn`)
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
  classes: string[] = [];

  start() {
    this.interval = interval(2000 + random(3000, 5000)).subscribe(() => {
      if (isEmpty(this.classSubjects)) {
        return;
      }
      const subject = shuffle(Object.values(this.classSubjects))[0];
      const rand_anim = shuffle(this.ANIMATIONS)[0];
      subject.next(`no-opacity animate__animated animate__slow ${rand_anim}`);
    });
  }

  stop() {
    this.interval && this.interval.unsubscribe();
  }

  resume() {
    this.interval?.closed && this.start();
  }

}
