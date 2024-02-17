import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IControls, IPanelItemTypes, IPanelTypes } from 'src/app/models/adminPanel.model';
import { INewsItem } from 'src/app/models/news.model';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})



export class AdminPanelComponent implements OnInit{
  @Input() controls: IControls[] = [];
  @Input() title: string = "";
  @Input() typePanel: string = IPanelTypes[0];
  @Input() typeItem: string = IPanelItemTypes[0];
  @Input() item: INewsItem | IProduct = {
    title: "",
    description: "",
    imagePath: "",
    category: ""
  }
  isLogin: boolean = true;
  isOpen: boolean = false;
  adminForm!: FormGroup;

  submit() {
    console.log(this.adminForm.value)
  }
  changeVisibility() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
    let objForm: Record<string, FormControl> = {};
    this.controls.forEach((item: IControls) => {
      objForm[item.control] = new FormControl(this.item.title, [Validators.required]);
    })
    this.adminForm = new FormGroup(objForm)

    if (this.isLogin) {
      this.controls.forEach((item: IControls) => {
        if (item.type !== 'file') {
          this.adminForm.controls[item.control].setValue(item.control);
        }
        if (item.type == 'file') {
          this.adminForm.controls[item.control].setValue(this.item.imagePath);
        }
      })
    }

    if (this.typePanel in IPanelTypes) {
    }
    if (this.typeItem in IPanelItemTypes) {
    }
  }
}
