import { Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from 'src/app/service/animation.service';
import { DEVICONS } from 'src/app/entity/icons.entity';
import { Subject } from 'rxjs';
import { random } from 'lodash-es';
@Component({
  selector: 'app-flying-icon',
  templateUrl: './flying-icon.component.html',
  styleUrl: './flying-icon.component.scss',
})
export class FlyingIconComponent {
  private classSubject = new Subject<string>();
  classes = this.classSubject.asObservable();

  constructor(
    private animService: AnimationService,
    private elementRef: ElementRef
  ) {}

  iconCls!: string;

  ngOnInit(): void {
    const style = this.elementRef.nativeElement.style;
    style.top = `${random(2, 98)}vw`;
    style.left = `${random(2, 98)}vh`;
    style.offsetPath = `path("M${random(
      30
    )},${random(30)} C${random(30)},${random(300)} ${random(300)},${random(
      30
    )} ${random(300)},${random(230)}")`;
    style.animation = `move ${random(5,10)}s infinite alternate ease-in-out`;
      style.animationDelay = `${random(5,20)}s`
    this.iconCls = DEVICONS[this.icon];
    this.animService.register(this.classSubject);
  }

  @Input() icon!: string;
}
