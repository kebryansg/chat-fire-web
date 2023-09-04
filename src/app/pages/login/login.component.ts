import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  itemForm!: FormGroup;

  private fb: FormBuilder = inject(FormBuilder);
  private route: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.itemForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.min(5)]],
    });
  }

  login() {
    const {email, pass} = this.itemForm.getRawValue();
    this.authService.signIn({email, password: pass})
      .then((res) => {
        this.route.navigate(['chat']);
      });
  }
}
