import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentLanguage = localStorage.getItem('locale');
  languages = ['bg', 'gb', 'rs'];

  constructor() { }

  ngOnInit(): void {
  }

  public changeLanguage(code: string) {
    localStorage.setItem('locale', code);
    let value = 0;

    if (code == 'bg') {
      value = 0;
    }

    if (code == 'gb') {
      value = 1;
    }

    if (code == 'rs') {
      value = 2;
    }

    localStorage.setItem('localeValue', String(value));
    window.location.reload();
  }

}
