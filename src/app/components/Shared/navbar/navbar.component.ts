import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: User | null = null; // Inicializar con null

  constructor(
    private authService: AuthService, 
    private router: Router,
    public media: MediaObserver
  ) {
    this.authService.authState$.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
