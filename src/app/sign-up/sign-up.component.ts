import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from "@angular/router";
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  profilePath: AngularFireObject<any>;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private afDb: AngularFireDatabase
  ) {
    
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  onClickSignUp() {
    if (this.form.invalid) {
      console.log("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const val = this.form.value;
    console.log(val.email)

    this.authService.signUp(val.email, val.password)
      .subscribe(
        () => {
          // insert Data to DB
          this.insertDB();
          alert('User created successfully !');
          this.router.navigateByUrl('/');
        },
        err => alert(err)
      );
  }

  insertDB() {
    this.profilePath = this.afDb.object(`users/${this.authService.authInfo$.value.$uid}/profile`);

    const val = this.form.value;
    this.profilePath.set({
      email: val.email,
      firstName: val.firstName,
      lastName: val.lastName,
    });
  }

}
