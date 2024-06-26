import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: User

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user == null) {
      this.user = new User('id', 'John Doe', 'abc@xyz.com', '+911234567890')
    }
  }

  getInitials(nameString: string) {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
