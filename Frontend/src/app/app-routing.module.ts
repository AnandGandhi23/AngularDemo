import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentlistingComponent } from './studentlisting/studentlisting.component';
import { PreviewStudentComponent } from './preview-student/preview-student.component';

const routes: Routes = [
  { path: '', component: StudentlistingComponent },
  { path: 'createStudent', component: CreateStudentComponent },
  { path: 'editStudent/:id', component: CreateStudentComponent },
  { path: 'previewStudent/:id', component: PreviewStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
