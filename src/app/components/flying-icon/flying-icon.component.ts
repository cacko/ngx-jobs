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


  constructor(private animService: AnimationService) {}

  iconCls!: string;

  ngOnInit(): void {
    this.iconCls = DEVICONS[this.icon];
    this.animService.register(this.classSubject, this.styleSubject);
  }

  @Input() icon!: string;
  @Input() styleSubject !: Subject<StylesEntity>;
}
