import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {FloatLabelType, MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StudentService} from "../../../services/student.service";
import {Student} from "../../../common/student";
import {Location} from "@angular/common";

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent {
  numberControl = new FormControl("");
  idControl = new FormControl(0);
  nameControl = new FormControl("");
  addressControl = new FormControl("");
  sexControl = new FormControl(1);
  student = this._formBuilder.group({
    name: this.nameControl,
    number: this.numberControl,
    address: this.addressControl,
    sex: this.sexControl,
    id: this.idControl
  });
  studentId = -1;

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private location: Location,
              private studentService: StudentService) {
    this.studentId = Number(this.route.snapshot.params['id']);
    this.studentService.getStudentById(this.studentId)
      .subscribe(data => {
        this.student.setValue(data)
      })
  }

  editStudent() {
    this.studentService.updateStudent(this.studentId, this.student.value as Student)
      .subscribe(() => {
        this.location.back()
      })
  }
}
