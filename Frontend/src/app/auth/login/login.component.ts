import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false; 
  error: string | null = null; 
  private userSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.userSubscription = this.auth.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true; // Activar estado de carga
    this.error = null; // Limpiar mensaje de error

    const { email, password } = this.loginForm.value;

    try {
      await this.auth.loginWithEmail(email, password);
    } catch (err: any) {
      console.error('Login error:', err);
      this.handleError(err);
    } finally {
      this.loading = false; // Desactivar estado de carga
    }
  }

  async loginWithGoogle() {
    this.loading = true; // Activar estado de carga
    this.error = null; // Limpiar mensaje de error

    try {
      const result = await this.auth.loginWithGoogle();
      console.log('User authenticated with Google:', result);
      this.router.navigate(['/']);
    } catch (err: any) {
      console.error('Google login error:', err);
      this.error = err.message;
    } finally {
      this.loading = false; // Desactivar estado de carga
    }
  }

  private handleError(err: any) {
    switch (err.code) {
      case 'auth/user-not-found':
        this.error = 'No se encontró una cuenta con ese correo.';
        break;
      case 'auth/wrong-password':
        this.error = 'La contraseña es incorrecta.';
        break;
      default:
        this.error = 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.';
    }
  }
  
}