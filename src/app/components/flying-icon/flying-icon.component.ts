import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { AnimationService } from 'src/app/service/animation.service';
import { DEVICONS } from 'src/app/entity/icons.entity';
import { Subject } from 'rxjs';
import { SimpleIcon } from 'simple-icons';
import { Position } from 'src/app/models/position.model';
import { CommonModule } from '@angular/common';
import { SimpleIconComponent } from '../simple-icon/simple-icon.component';
@Component({
    selector: 'app-flying-icon',
    templateUrl: './flying-icon.component.html',
    styleUrl: './flying-icon.component.scss',
    imports: [
        CommonModule,
        SimpleIconComponent
    ]
})
export class FlyingIconComponent {
  private classSubject = new Subject<string>();
  classes = this.classSubject.asObservable();

  private position: Position | null = null;

  constructor(
    private animService: AnimationService,
    private elementRef: ElementRef
  ) { }

  siIcon!: SimpleIcon;

  ngOnInit(): void {
    this.siIcon = DEVICONS[this.icon];
    this.register()
  }

  private register() {
    this.position = this.animService.register(this.classSubject);
    if (!this.position) {
      return;
    }
    const nativeEl = this.elementRef.nativeElement;
    nativeEl.style.top = `${this.position.y}px`;
    nativeEl.style.left = `${this.position.x}px`;
    this.animService.show(this.position);
  }

  @HostListener('animationend', ['$event'])
  onAnimationEnd($ev: AnimationEvent) {    
    switch($ev.animationName) {
        case "fadeOut":
          this.position && this.animService.unregister(this.position) && this.register();
          break;
        case "fadeIn":
          break;
        default:
          this.position && this.animService.hide(this.position);
    }
  }

  @Input() icon!: string;
}
