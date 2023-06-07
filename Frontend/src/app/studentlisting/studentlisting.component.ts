import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentlisting',
  templateUrl: './studentlisting.component.html',
  styleUrls: ['./studentlisting.component.css'],
})
export class StudentlistingComponent {
  students: any = [];
  constructor(private _studentService: StudentService, public router: Router) {
    this.getStudents();
  }

  getStudents() {
    this._studentService.getAllStudents().subscribe((res: any) => {
      this.students = res.students;
    });
  }

  onPreview(id: string) {
    this.router.navigate([`/previewStudent/${id}`]);
  }

  onEdit(id: string) {
    this.router.navigate([`/editStudent/${id}`]);
  }

  onDelete(id: string) {
    if (confirm('Are you sure want to delete')) {
      this._studentService.deleteStudent(id).subscribe((res: any) => {
        if (res.status === 'success') {
          this.students = this.students.filter(
            (record: any) => record._id !== id
          );
        }
      });
    }
  }
}
