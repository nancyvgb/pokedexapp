import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authName: string
  private userSub: Subscription;


  constructor(
   // private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let currentUser =  JSON.parse(localStorage.getItem('currentUser'))
    if(currentUser) {
      this.authName = currentUser.name;
      this.isAuthenticated = true;
    } else {
      this.userSub = this.authService.user.subscribe(user => {
        console.log(user)
        //localStorage.setItem('currentUser', JSON.stringify({ token: token, name: name }));
        this.authName = user.displayName;
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
        localStorage.setItem('currentUser', JSON.stringify({ token: user.token, name: user.displayName, email: user.email }));
      });
    }
    
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
   this.userSub.unsubscribe();
  }

}
