import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import {AuthService, AuthResponseData} from './auth.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.displayName;
    let authObs : Observable<AuthResponseData>
     if(!form.valid) {
       return
     }
     if(this.isLoginMode) {
      authObs = this.authService.login(email, password)
     } else {
      authObs = this.authService.singUp(email, password, name)
     }
     authObs.subscribe(res => {
       console.log(res)
       this.router.navigate(['/pokedex'])
     },
     error=> {

    }
  )
     // form.reset();
  }

}
