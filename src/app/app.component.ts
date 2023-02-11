import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AnhHuy6';

  constructor(private authService: AuthService) {}
  
  isLogined(): boolean {
    return this.authService.isLogin();
  }
}
