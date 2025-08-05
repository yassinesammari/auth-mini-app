import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../data/Models/User.model';
import { selectUser } from '../../../store/user.selectors';
import { UserService } from '../../../data/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null>;
  userName: any;
  listUsersColumns: string[] = ['email', 'firstName', 'lastName'];
  listUsersData: any;

  constructor(
    private store: Store,
    private userService: UserService
  ) {
    this.user$ = this.store.select(selectUser);
  }
  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userName = `${user?.lastName}` + " " + `${user?.firstName}`;
    });

    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.listUsersData = users;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }
}
