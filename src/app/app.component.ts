import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth.service';
import { generateInitialsAvatar } from './utils/application.helper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wheremybuckgoes-web';
  name = '';
  constructor(public authService: AuthService){}

  ngOnInit(): void {
    initFlowbite();
    this.name = this.authService.getName();
  }
}
