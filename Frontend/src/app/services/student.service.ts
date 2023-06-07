import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse, Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getAllStudents() {
    return this.http.get(`http://127.0.0.1:4900/student/getallstudents`);
  }

  getStudentById(id: string): Promise<APIResponse | undefined> {
    return this.http
      .get<APIResponse>(`http://127.0.0.1:4900/student/getstudentbyid/${id}`)
      .toPromise();
  }

  createStudent(studentData: any) {
    return this.http.post(
      `http://127.0.0.1:4900/student/createstudent`,
      studentData
    );
  }

  deleteStudent(id: string) {
    return this.http.delete(
      `http://127.0.0.1:4900/student/deleteStudent/${id}`
    );
  }
}
