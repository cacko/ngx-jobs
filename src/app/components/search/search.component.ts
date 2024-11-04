import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  filterInput = new FormControl('');
  @ViewChild(MatInput, { static: false }) matInput: MatInput | undefined;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public filter: string = ''
  ) {
    this.form = this.builder.group({
      filterInput: this.filterInput,
    });
    if (filter) {
      this.form.patchValue({
        filterInput: filter,
      });
    }
  }

  submitForm() {
    const input = this.filterInput.value || '';
    this.filterInput.reset();
    this.dialogRef.close(input.trim());
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.matInput?.focused || this.matInput?.focus();
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape() {
    this.filterInput.reset();
    this.dialogRef.close("");
  }
}
