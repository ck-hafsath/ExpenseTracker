import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'login-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent {

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) { }

  loginPosition: string = '50px';
  registerPosition: string = '450px';
  buttonPosition: string = '0px';
  loginVisible: boolean = true;
  registerVisible: boolean = false;

  userId: string = '';
  password: string = '';

  registerForm = {
    userId: '',
    email: '',
    password: '',
    agree: false
  };

  onSubmitReg() {
    if (
      !this.registerForm.email ||
      !this.registerForm.email.match(/^[^@]+@[^@]+\.[^@]+$/)
    ) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Invalid Email',
          message: 'The email address entered is not valid. Please enter a valid email.',
        },
      });
      return;
    }

    console.log('Register form:', this.registerForm);
    this.apiService.register(this.registerForm).subscribe(
      (response) => {
        console.log('Registration successful', response);

        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Registration Successful',
            message: 'You have been registered successfully!',
          },
        });


        this.registerForm = {
          userId: '',
          email: '',
          password: '',
          agree: false,
        };


      },
      (error) => {
        console.error('Registration failed', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      }
    );
  }


  onSubmitlogin(): void {
    if (this.userId && this.password) {
      const loginData = {
        email: this.userId,
        password: this.password
      };
  
      this.apiService.login(loginData).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.dialog.closeAll();
          this.router.navigateByUrl('/dashboard');
          
          this.userId = '';
          this.password = '';
        },
        (error) => {
          console.error('Login failed', error);
          this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Login Failed',
              message: 'Invalid email or password. Please try again.',
            },
          });
        }
      );
    } else {
      console.log('Invalid login');
    }
  }
  


  register(): void {
    this.loginPosition = '400px';
    this.registerPosition = '50px';
    this.buttonPosition = '110px';
    this.loginVisible = false;
    this.registerVisible = true;
  }

  login(): void {
    this.loginPosition = '50px';
    this.registerPosition = '450px';
    this.buttonPosition = '0px';
    this.loginVisible = true;
    this.registerVisible = false;
  }



}