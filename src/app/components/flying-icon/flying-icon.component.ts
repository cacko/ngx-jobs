import { Component, ElementRef, Input } from '@angular/core';
import { AnimationService } from 'src/app/service/animation.service';
import { DEVICONS, IconPosition, StylesEntity } from 'src/app/entity/icons.entity';
import { Subject } from 'rxjs';
import { SHA1 } from 'crypto-js';
import { SimpleIcon } from 'simple-icons';
@Component({
  selector: 'app-flying-icon',
  templateUrl: './flying-icon.component.html',
  styleUrl: './flying-icon.component.scss',
})
export class FlyingIconComponent {
  private classSubject = new Subject<string>();
  classes = this.classSubject.asObservable();

  private position: IconPosition | null = null;

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
    nativeEl.addEventListener('animationend', () => {
      this.position && this.animService.unregister(this.position);
      this.register();
    }, {once: true});
  }

  @Input() icon!: string;
}
