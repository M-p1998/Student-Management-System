// import { Component, OnInit } from '@angular/core';
// import { Student } from '../../models/student';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { StudentService } from '../../services/student.service';

// @Component({
//   selector: 'app-student',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './student.html',
//   styleUrl: './student.css',
// })
// export class StudentComponent implements OnInit {
//   students: Student[] = [];
//   student: Student = {
//     studName: '',
//     email: '',
//     city: '',
//     state: '',
//     mobileNumber: '',
//     zipcode: '',
//     addressLine1: '',
//     addressLine2: ''

//   };
//   constructor(private studentService: StudentService){}

//   ngOnInit(): void {
//     this.loadStudents();
//   }
//   loadStudents(){
//     this.studentService.getStudents().subscribe(data => {
//       this.students = data;
//     });
//   }

//   saveStudent(){
//     console.log('Saving student:', this.student);
//     if(this.student.studentId){
//       this.studentService.updateStudent(this.student).subscribe(() => {
//         this.resetForm();
//         this.loadStudents();
//       });
//     }else{
//       this.studentService.createStudent(this.student).subscribe(() =>{
//         this.resetForm();
//         this.loadStudents();
//       })
//     }
//   }

//   editStudent(s: Student){
//     this.student = {...s };
//   }
//   deleteStudent(id: number){
//     this.studentService.deleteStudent(id).subscribe(()=>{
//       this.loadStudents();
//     })
//   }
//   resetForm() {
//     this.student = {
//       studName: '',
//       email: '',
//       city: '',
//       state: '',
//       mobileNumber: '',
//       zipcode: '',
//       addressLine1: '',
//       addressLine2: ''
//   };

// }
// }



import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import $ from 'jquery';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class StudentComponent implements OnInit, AfterViewInit {
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

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  ngAfterViewInit(): void {
    $('#searchBox').on('keyup', function () {
      const value = ($(this).val() as string).toLowerCase();
      $('table tbody tr').each(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  saveStudent() {
    console.log('Saving student:', this.student);

    if (this.student.studentId) {
      this.studentService.updateStudent(this.student).subscribe(() => {
        const id = this.student.studentId!;
        this.resetForm();
        this.loadStudents();
        this.highlightRow(id);
      });
    } else {
      this.studentService.createStudent(this.student).subscribe((created) => {
        this.resetForm();
        this.loadStudents();
        if (created.studentId) {
          this.highlightRow(created.studentId);
        }
      });
    }
  }

  editStudent(s: Student) {
    this.student = { ...s };
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
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

  private highlightRow(studentId: number): void {
    setTimeout(() => {
      const row = $(`#row-${studentId}`);
      if (row.length) {
        row.addClass('table-warning');
        setTimeout(() => row.removeClass('table-warning'), 1200);
      }
    }, 300);
  }
}


