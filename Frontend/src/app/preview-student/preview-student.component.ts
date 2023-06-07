import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { APIResponse } from '../model/student.model';

@Component({
  selector: 'app-preview-student',
  templateUrl: './preview-student.component.html',
  styleUrls: ['./preview-student.component.css'],
})
export class PreviewStudentComponent implements OnInit {
  id: any;
  student: any = {};

  constructor(
    private _studentService: StudentService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.getStudent();
  }

  async getStudent() {
    const response: APIResponse | undefined =
      await this._studentService.getStudentById(this.id);
    this.student = response?.student;
    console.log('this.student---', this.student);
  }
}
