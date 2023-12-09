import {Component} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FloatLabelType, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent {
  hideRequiredControl = new FormControl(false);
  numberControl = new FormControl("");
  nameControl = new FormControl("");
  addressControl = new FormControl("");
  sexControl = new FormControl(1);
  student = this._formBuilder.group({
    name: this.nameControl,
    number: this.numberControl,
    address: this.addressControl,
    sex: this.sexControl,
  });

  constructor(private _formBuilder: FormBuilder, private location: Location) {
  }

  createStudent() {
    console.log(this.student.value)
    this.location.back()
  }
}
