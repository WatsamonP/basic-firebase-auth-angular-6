import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  onClickSignIn() {
    if (this.form.invalid) {
      console.log("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const val = this.form.value;
    console.log(val.email)

    this.authService.login(val.email, val.password)
      .subscribe(() => {
        alert(val.email + ' เข้าสู่ระบบสำเร็จ')
        this.router.navigate(['/'])
      },
        err => alert(err.message)
      );

  }

}
