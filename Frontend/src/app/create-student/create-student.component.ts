import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidationUtil } from '../util/validation.util';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from '../model/student.model';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  public studentId: string;
  public student: any;
  // @ts-ignore
  public studentForm: FormGroup;
  public profileImage!: File;
  public isEdit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _studentService: StudentService,
    public router: Router,
    private _Activatedroute: ActivatedRoute
  ) {
    this.studentId = this._Activatedroute.snapshot.paramMap.get('id') || '';
    this.isEdit = !!this.studentId;
  }

  async getStudent() {
    try {
      const response: any = await this._studentService.getStudentById(
        this.studentId
      );
      this.student = response.student;
    } catch (e) {
      console.log('Error occurre while fetching student data --', e);
    }
  }

  async ngOnInit() {
    this.isEdit && (await this.getStudent());
    this.studentForm = this.formBuilder.group({
      firstName: [
        this.student?.firstName || '',
        [ValidationUtil.requiredNonSpace, ValidationUtil.onlyAlphabets],
      ],
      lastName: new FormControl(this.student?.lastName || '', [
        ValidationUtil.requiredNonSpace,
        ValidationUtil.onlyAlphabets,
      ]),
      email: [
        this.student?.email || '',
        [ValidationUtil.requiredNonSpace, ValidationUtil.validateEmail],
      ],
      phone: [this.student?.phone || '', [ValidationUtil.validatePhone]],
      profileImage: this.student?.profileImage || '',
    });
  }

  emailClicked() {
    console.log(this.studentForm.controls['email']);
  }

  onChange(event: any) {
    this.profileImage = event.target.files[0];
  }

  onCreate() {
    if (this.studentForm.invalid) {
      return;
    }
    try {
      const studentData = this.studentForm.value;

      const formData = new FormData();
      formData.append('firstName', studentData.firstName);
      formData.append('lastName', studentData.lastName);
      formData.append('email', studentData.email);
      formData.append('phone', studentData.phone);
      formData.append('profileImage', this.profileImage);

      this._studentService.createStudent(formData).subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/']);
        }
      });
    } catch (e) {
      console.log('Error occured while upserting a student ---', e);
    }
  }
}
