import { Component, OnInit } from '@angular/core';
import {HookahRequest} from "../domain/resource/HookahRequest";
import {FormBuilder, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MatDialog} from "@angular/material/dialog";
import {v4} from "uuid";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  hookahRequest: HookahRequest = {};

  flavors = ['FLAVOR_OPTION_1',
    'FLAVOR_OPTION_2'];

  bowls = ['BOWL_OPTION_1',
    'BOWL_OPTION_2'];

  hookahs = ['HOOKAH_OPTION_1',
    'HOOKAH_OPTION_2'];

  liquids = ['LIQUID_OPTION_1',
    'LIQUID_OPTION_2'];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });

  duration = "500";

  constructor(
    private _formBuilder: FormBuilder,
    private translateService: TranslateService,
    private dataBase: AngularFireDatabase,
    public dialog: MatDialog) {
    this.hookahRequest.id = v4();
  }

  ngOnInit(): void {
    this.getFlavors();
  }


  getSource(flavor: string) {
    return `assets/image/${flavor}.png`;
  }

  getFlavors(): any {
    this.dataBase.list(`/translations/rs`).snapshotChanges()
      .subscribe((flavors: any[]) => {

        let flavorsList: any[] = [];
        flavors.forEach(flavor =>
        {
          if (flavor.key.includes('FLAVOR_OPTION')) {
            flavorsList.push(flavor.key);
          }
        });

        this.flavors = flavorsList;
      });
  }

  selectFlavor(flavor: any) {
    localStorage.setItem('flavor', this.translateService.instant(flavor));
    console.log(this.translateService.instant(flavor));
  }

  selectBowl(bowl: any) {
    this.hookahRequest.bowl = this.translateService.instant(bowl);
    console.log(this.hookahRequest.bowl);
  }

  selectHookah(hookah: any) {
    this.hookahRequest.hookah = this.translateService.instant(hookah);
    console.log(this.hookahRequest.hookah);
  }

  selectLiquid(liquid: any) {
    this.hookahRequest.liquid = this.translateService.instant(liquid);
    console.log(this.hookahRequest.liquid);
  }

  submitOrder() {
    console.log(this.hookahRequest);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.hookahRequest.flavor = localStorage?.getItem('flavor')?.toString();
    this.dialog.open(DialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dataKey: JSON.stringify(this.hookahRequest)
      }
    });
  }

  openFlavorDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: {
        flavors: this.flavors
      }
    });
  }
}
