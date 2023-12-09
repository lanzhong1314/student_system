import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatTableModule, MatTable} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {StudentIndexDataSource} from './student-index-datasource';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import {Student} from "../../common/student";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDividerModule, MatIconModule, RouterLink]
})
export class StudentIndexComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Student>;
  dataSource = new StudentIndexDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['number', 'name', 'sex', 'address', 'operation'];

  constructor(public dialog: MatDialog, private studentService: StudentService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.studentService.getStudents().subscribe(data => {
      this.table.dataSource = data
    })
  }

  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(StudentDeleteDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'student-delete-dialog',
  templateUrl: 'student-delete-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class StudentDeleteDialog {
  constructor(public dialogRef: MatDialogRef<StudentDeleteDialog>, private studentService: StudentService) {
  }

  deleteStudent() {
  // this.studentService.deleteStudent()
  }
}
