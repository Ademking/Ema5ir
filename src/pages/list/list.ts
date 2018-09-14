import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  openmyfacebook(){
    window.open("https://facebook.com/Ademkouki.Officiel",'_system', 'location=yes');
  }

  opengit(){
    window.open("https://github.com/Ademking/",'_system', 'location=yes');
  }
}
