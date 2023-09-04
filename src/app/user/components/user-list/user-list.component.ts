import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../services/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // Column of tables display
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];

  // DataSource of table
  dataSource: any = null;

  // For paginator
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //For fiter user
  filterValue: any = null;

  // PageEvent of pagination
  pageEvent!: PageEvent;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  // Initialization datasource of table
  initDataSource(): void {
    this.userService
      .getAllUsers(1, 10)
      .pipe(map((userData: any) => (this.dataSource = userData)))
      .subscribe();
  }

  // Change pagination function
  onPaginateChange(event: PageEvent): void {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (!this.filterValue) {
      page = page + 1;
      this.userService
        .getAllUsers(page, size)
        .pipe(map((userData: User) => (this.dataSource = userData)))
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.userService
        .paginateByName(page, size, this.filterValue)
        .pipe(map((userData: User) => (this.dataSource = userData)))
        .subscribe();
    }
  }

  // Filter user by username
  filterUserByUserName(username: string): void {
    this.userService
      .paginateByName(0, 10, username)
      .pipe(
        map((userData: User) => {
          this.dataSource = userData;
        })
      )
      .subscribe();
  }

  // Reset filter input value
  resetFilterInput() {
    this.filterValue = null;
    this.initDataSource();
  }
}
