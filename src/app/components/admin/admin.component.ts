import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Admin} from '../../models/admin-model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admins: Admin[] = [];
  toggle = false;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.getAdmins();
  }

  getAdmins() {
    this.adminService.getAdmins().subscribe(admins => {
      this.admins = admins;
    });
  }

  buttonClicked() {
    this.toggle = !this.toggle;
  }

  addAdmin(admin: Admin) {
    this.admins.unshift(admin);
    this.toggle = false;
  }

  deleteAdmin(adminId: number) {
    this.adminService.deleteAdmin(adminId).subscribe(() => {
      this.getAdmins();
    });
  }
}
