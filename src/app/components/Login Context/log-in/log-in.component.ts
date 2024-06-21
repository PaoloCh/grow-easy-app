import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService, Credential } from 'src/app/core/services/auth.service';
import { ButtonProviders } from 'src/app/components/button-providers/button-providers.component';

interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ButtonProviders,
    HttpClientModule
  ],
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  providers: [],
})
export default class LogInComponent implements OnInit {
  hide = true;

  formBuilder = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  private _snackBar = inject(MatSnackBar);

  form: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      this.form.get('email')?.setValue(savedEmail);
    }
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'This field is required'
        : 'Enter a valid email';
    }

    return false;
  }

  async logIn(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    this.authService.logInWithEmailAndPassword(credential).subscribe({
      next: (response) => {
        localStorage.setItem('email', credential.email);
        const snackBarRef = this.openSnackBar();

        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/home');
        });
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this._snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 2500,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    });
  }

  openSnackBar() {
    return this._snackBar.open('Successfully Logged in 😀', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
