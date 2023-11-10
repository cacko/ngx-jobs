import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-joburl',
  templateUrl: './joburl.component.html',
  styleUrl: './joburl.component.scss',
})
export class JoburlComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.url);
  }
  @Input() url!: string;
}
