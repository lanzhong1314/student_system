import {Routes} from '@angular/router';
import {StudentIndexComponent} from "./student-index/student-index.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {StudentEditComponent} from "./student-index/student-edit/student-edit.component";
import {StudentCreateComponent} from "./student-index/student-create/student-create.component";

export const routes: Routes = [
  {path: 'student', component: StudentIndexComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'student/edit/:id', component: StudentEditComponent},
  {path: 'student/create', component: StudentCreateComponent},
];
