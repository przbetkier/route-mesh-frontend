import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {AdminRequest} from '../../../models/admin-request';
import {AdminService} from '../../../services/admin.service';
import {Admin} from '../../../models/admin-model';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  formGroup: FormGroup;
  processing = false;
  @Output() onAdmin = new EventEmitter<Admin>();

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      telephone: ['', Validators.required],
      email: [''],
      fax: [''],

    });
  }

  get name() {
    return this.formGroup.get('name');
  }

  get address() {
    return this.formGroup.get('address');
  }

  get postalCode() {
    return this.formGroup.get('postalCode');
  }

  get telephone() {
    return this.formGroup.get('telephone');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get fax() {
    return this.formGroup.get('fax');
  }

  addAdmin(formDirective: FormGroupDirective) {
    if (this.isFormValid()) {
      this.processing = true;
      const adminRequest = new AdminRequest(
        this.name.value,
        this.address.value,
        this.postalCode.value,
        this.telephone.value,
        this.email.value,
        this.fax.value
      );
      console.log(adminRequest);
      this.adminService.addAdmin(adminRequest).subscribe(admin => {
        this.onAdmin.emit(admin);
        this.processing = false;
        formDirective.resetForm();
      }, error => {
        this.processing = false;
      });
    }
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }
}
