import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { baseUrl } from 'src/environment/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Output() name: string = '';
  @Output() login: string = '';
  @Output() id: string = '';
  @Output() password: string = this.auth.user.password;
  private userToken = `Bearer ${this.auth.token}`;
  public class: string = '';
  public success: boolean = false;
  public failed: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    public modal: ModalServiceService
  ) {}

  ngOnInit() {
    this.http.get(`${baseUrl}users`).subscribe((data: any) => {
      data.forEach((el: any) => {
        if (el._id == this.auth.user.id) {
          this.login = el.login;
          this.name = el.name;
          this.id = el._id;
        }
      });
    });
  }
  editName() {
    this.modal.openName();
  }

  editLogin() {
    this.modal.openLogin();
  }
  editPassword() {
    this.modal.openPassword();
  }
  deleteUserClick() {
    this.modal.openDelete();
    this.class = 'hidden';
  }

  provideResultOfModal(value: boolean) {
    if (value && this.modal.name) {
      const input = document.querySelector('.form-control') as HTMLInputElement;
      this.name = input.value;
      this.updateUser();
      this.modal.closeName();
    } else if (value && this.modal.login) {
      const input = document.querySelector('.form-control') as HTMLInputElement;
      this.login = input.value;
      this.updateUser();
      this.modal.closeLogin();
    } else if (value && this.modal.password) {
      const input = document.querySelector('.form-control') as HTMLInputElement;
      this.password = input.value;
      this.updateUser();
      this.modal.closePassword();
    } else if (value && this.modal.delete) {
      this.deleteUser();
      this.modal.closePassword();
    } else {
      this.modal.closeName();
      this.modal.closeLogin();
      this.modal.closePassword();
      this.modal.closeDelete();
    }
  }

  updateUser() {
    const body = {
      name: this.name,
      login: this.login,
      password: this.password
    };

    this.http.put(`${baseUrl}users/${this.id}`, body).subscribe(
      (data: any) => {
        this.id = data._id;
        this.modal.close();
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 2000);
      },
      (err) => {
        this.defaultName();
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 2000);
      }
    );
  }
  defaultName() {
    this.http
      .get(`${baseUrl}users/${localStorage.getItem('access_id')}`)
      .subscribe((user: any) => {
        this.login = user.login;
      });
  }
  deleteUser() {
    this.http.delete(`${baseUrl}users/${this.id}`).subscribe((data) => {
      window.localStorage.clear();
      this.router.navigate(['main/welcome']);
    });
  }
}
