import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('email');

    if (savedEmail) {
      console.log(`Email que se usará para obtener usuario: ${savedEmail}`);

      this.authService.getUserByEmail(savedEmail).subscribe({
        next: (retrievedUser) => {
          console.log('Usuario recuperado:', retrievedUser);
          this.user = retrievedUser;
        },
        error: (error) => {
          console.error('Error al recuperar usuario:', error);
        }
      });
    } else {
      console.error('No se encontró un email guardado en localStorage');
    }
  }

  logout() {
    this.authService.logOut();
    console.log('Sesión cerrada');
    window.location.reload();
  }
}
