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

    this.elementRef.nativeElement.style.top =`${random(2, 98)}vw`
    this.elementRef.nativeElement.style.left =`${random(2, 98)}vh`;

    this.iconCls = DEVICONS[this.icon];
    this.animService.register(this.classSubject);
  }

  @Input() icon!: string;

}
