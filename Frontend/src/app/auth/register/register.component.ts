import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';
 
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
 
  onRegister() {
    this.auth.register(this.email, this.password)
      .then(() => this.router.navigate(['/login']))
      .catch(err => this.error = err.message);
  }
}
