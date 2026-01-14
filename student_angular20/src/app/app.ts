import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentComponent } from './components/student/student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'student_angular20';
}
