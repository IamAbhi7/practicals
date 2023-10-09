import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/helper/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = new FormGroup({   
    email: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
  });
  constructor(private auth: AuthService, private router: Router,private toastrService: ToastrService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result);
          this.router.navigate(['/admin']);
        },
        (err: Error) => {
          // alert(err.message);
          this.toastrService.error("Invalid email or password","Error")
        }
      );
    }
  }

  public checkIfControlValid(controlName: any): boolean{
    return this.loginForm.get(controlName)?.invalid &&
    this.loginForm.get(controlName)?.errors &&
      (this.loginForm.get(controlName)?.dirty || this.loginForm.get(controlName)?.touched) ? true : false;
  }

  public checkControlHasError(controlName: any, error: any): boolean {
    return this.loginForm.get(controlName)?.hasError(error) ? true : false; 
  }
}
