import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  step = 0;
  flavorCount = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    this.getCurrentFlavorCount();
  }

  prevStep() {
    this.step--;
  }

  constructor(private dataBase: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  getCurrentFlavorCount(): any {
    this.dataBase.list(`/translations/rs`).snapshotChanges()
      .subscribe((flavors: any[]) => {

        let flavorsList: any[] = [];
        flavors.forEach(flavor => {
          if (flavor.key.includes('FLAVOR_OPTION')) {
            flavorsList.push(flavor.key);
          }
        });

        this.flavorCount = flavorsList.length;
      });
  }

}
