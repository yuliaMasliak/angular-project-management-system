import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { baseUrl } from 'src/environment/environment';
import { Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public name: string = '';
  @Output() id: string = '';
  constructor(private http: HttpClient, private authService: AuthService) {}
  ngOnInit() {
    const userToken = `Bearer ${this.authService.token}`;
    const config = {
      headers: {
        Authorization: userToken
      }
    };
    this.http.get(`${baseUrl}users`, config).subscribe((data: any) => {
      data.forEach((el: any) => {
        if (el._id == this.authService.user.id) {
          this.name = el.name;
          this.id = el._id;
        }
      });
    });
  }
}
