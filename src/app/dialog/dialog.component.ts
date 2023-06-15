import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {SwiperOptions} from 'swiper';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import {HookahRequest} from "../domain/resource/HookahRequest";
import {UserRequest} from "../domain/resource/UserRequest";
import {HttpClient, HttpHeaders} from "@angular/common/http";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent {
  displayedColumns: string[] = ['flavor', 'bowl', 'hookah', 'liquid'];
  dataSource: HookahRequest[];

  name: any;
  email: any;
  phoneNumber: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private translateService: TranslateService,
              private http: HttpClient) {
    let order: HookahRequest[] = [{}];
    let jsonData = JSON.parse(data.dataKey);

    order[0].id = jsonData.id;
    order[0].flavor = jsonData.flavor;
    order[0].bowl = jsonData.bowl;
    order[0].hookah = jsonData.hookah;
    order[0].liquid = jsonData.liquid;

    this.dataSource = order;
  }

  ngOnInit() {
    // will log the entire data object
    console.log([this.data.dataKey])
  }

  selectFlavor(flavor: any) {
    localStorage.setItem('flavor', this.translateService.instant(flavor));
    console.log(this.translateService.instant(flavor));
    this.dialogRef.close();
  }

  public getFlavorData(flavor: string, type: string, translate?: boolean): string {
    if (translate) {
      return this.translateService.instant(flavor.replace('OPTION', type));
    }
    return flavor.replace('OPTION', type);
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: true,
    pagination: {clickable: true},
    scrollbar: {draggable: true},
  };

  onSwiper([swiper]: any) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  confirmOrder() {
    const requestBody = { name: this.name, email: this.email, mobileNumber: this.phoneNumber,
    orders: [{ orderInfo: JSON.stringify(this.dataSource) }]};

    console.log(requestBody);

    // Define the request headers if needed
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Make the POST request
    this.http.post<any>('http://localhost:8080/api/v1/users', requestBody, { headers })
      .subscribe(
        response => {
          console.log('Response:', response);
          // Handle the response here
        },
        error => {
          console.error('Error:', error);
          // Handle the error here
        }
      );
  }
}
