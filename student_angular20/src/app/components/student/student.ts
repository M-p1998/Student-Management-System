import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  student: Student = {
    studName: '',
    email: '',
    city: '',
    state: '',
    mobileNumber: '',
    zipcode: '',
    addressLine1: '',
    addressLine2: ''

  };
  constructor(private studentService: StudentService){}

  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents(){
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  saveStudent(){
    console.log('Saving student:', this.student);
    if(this.student.studentId){
      this.studentService.updateStudent(this.student).subscribe(() => {
        this.resetForm();
        this.loadStudents();
      });
    }else{
      this.studentService.createStudent(this.student).subscribe(() =>{
        this.resetForm();
        this.loadStudents();
      })
    }
  }

  editStudent(s: Student){
    this.student = {...s };
  }
  deleteStudent(id: number){
    this.studentService.deleteStudent(id).subscribe(()=>{
      this.loadStudents();
    })
  }
  resetForm() {
    this.student = {
      studName: '',
      email: '',
      city: '',
      state: '',
      mobileNumber: '',
      zipcode: '',
      addressLine1: '',
      addressLine2: ''
  };

}
}



