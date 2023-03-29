import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentLanguage = localStorage.getItem('locale');
  languages = ['bg', 'rs', 'gb'];

  constructor() { }

  ngOnInit(): void {
  }

  public changeLanguage(code: string) {
    localStorage.setItem('locale', code);
    window.location.reload();
  }

}
