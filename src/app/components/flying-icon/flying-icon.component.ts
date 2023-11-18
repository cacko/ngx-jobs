import { Component, ElementRef, Input } from '@angular/core';
import { AnimationService } from 'src/app/service/animation.service';
import { DEVICONS, StylesEntity } from 'src/app/entity/icons.entity';
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
    this.iconCls = DEVICONS[this.icon];
    const position = this.animService.register(this.classSubject);
    const nativeEl = this.elementRef.nativeElement;
    nativeEl.style.top = `${position.y}vh`;
    nativeEl.style.left = `${position.x}vw`;

  }

  @Input() icon!: string;
}
