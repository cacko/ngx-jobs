import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-joburl',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './joburl.component.html',
  styleUrl: './joburl.component.scss',
})
export class JoburlComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.url);
  }
  @Input() url!: string;



}
