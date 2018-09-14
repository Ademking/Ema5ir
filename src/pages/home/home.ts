import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { RestProvider } from '../../providers/rest/rest';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger("showHello", [
      state("true", style({
        "opacity": 1
      })),
      state("false", style({
        "opacity": 0
      })),
      transition("1 => 0", animate("0ms")), // instant hide
      transition("0 => 1", animate("350ms"))
    ])
  ]
})


export class HomePage {

  public red_text: String;
  public blue_text: String;
  public red_per: number = 0;
  public blue_per: number = 0;

  public question_id: number = 0;

  public card_clicked: boolean = false;

  mydata: any;

  public bg_class_red: string = 'red3';
  public bg_class_blue: string = 'blue3';

  public spinners_status: boolean = false;

  public red_clicked: boolean = false;
  public blue_clicked: boolean = false;



  getData() { //first time when app loaded -> get data from Provider
    this.restProvider.getData()
      .then(data => {
        this.mydata = data;
        this.red_text = this.mydata.red;
        this.blue_text = this.mydata.blue;
        this.blue_per = this.mydata.per_blue;
        this.red_per = this.mydata.per_red;
        this.question_id = this.mydata.id;
      });
  }

  nextquestion() { // when next question button is pressed

    if (this.red_clicked === true && this.blue_clicked === false) {
      this.restProvider.postData(this.question_id, 1);
    }


    if (this.blue_clicked === true && this.red_clicked === false) {
      this.restProvider.postData(this.question_id, 2);
    }

    this.change_bg();
    this.blue_per = 0; // 0 when loading
    this.red_per = 0; // 0 when loading
    this.red_clicked = false;
    this.blue_clicked = false;
    this.card_clicked = false; //hide percentage
    this.spinners_status = true; //show spinners
    this.restProvider.getData() //get data from provider
      .then(data => {
        this.mydata = data;
        this.spinners_status = false; //hide spinners when data received
        this.red_text = this.mydata.red;
        this.blue_text = this.mydata.blue;
        this.blue_per = this.mydata.per_blue;
        this.red_per = this.mydata.per_red;
        this.question_id = this.mydata.id;
      });
  }


  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getData(); //first load -> get data from provider
  }

  handleRed() { //when red card clicked

    this.red_clicked = !this.red_clicked;
    if (this.blue_clicked === true) {
      this.card_clicked = false;
      this.blue_clicked = !this.blue_clicked;
    }
    this.card_clicked = !this.card_clicked;

  }

  handleBlue() { //when blue card clicked
    this.blue_clicked = !this.blue_clicked;
    if (this.red_clicked) {
      this.card_clicked = false;
      this.red_clicked = !this.red_clicked;
    }
    this.card_clicked = !this.card_clicked;
  }

  //make a random classname (must me the same as red/blue)
  change_bg() {
    let maxrange = 7 //change this when you add a new class
    let actualnum = Number(this.bg_class_red.replace('red', ''));
    let x = Math.floor(Math.random() * maxrange) + 1;
    //check if it's the same number...
    while (x == actualnum) {
      x = Math.floor(Math.random() * maxrange) + 1;
    }
    this.bg_class_red = 'red' + x;
    this.bg_class_blue = 'blue' + x;
  }







}
