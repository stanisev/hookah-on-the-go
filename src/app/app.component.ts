import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { HookahRequest } from "./domain/resource/HookahRequest";
import { v4 } from "uuid";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hookahRequest: HookahRequest = {};

  flavors = ['FLAVOR_OPTION_1',
    'FLAVOR_OPTION_2',
    'FLAVOR_OPTION_3',
    'FLAVOR_OPTION_4',
    'FLAVOR_OPTION_5',
    'FLAVOR_OPTION_6',
    'FLAVOR_OPTION_7'];

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

  constructor(private _formBuilder: FormBuilder, private translateService: TranslateService) {
    this.hookahRequest.id = v4();
    console.log(this.hookahRequest.id);
  }


  getSource(flavor: string) {
    return `assets/image/${flavor}.png`;
  }

  selectFlavor(flavor: any) {
    this.hookahRequest.flavor = this.translateService.instant(flavor);
    console.log(this.hookahRequest.flavor);
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

}
