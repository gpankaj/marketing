import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createbot',
  templateUrl: './createbot.component.html',
  styleUrls: ['./createbot.component.css']
})
export class CreatebotComponent implements OnInit {

  name: String;
  description: String;
  category: String;
  subCategory: String;

  ruleName: String;
  pattern:String;
  condition: String;
  textResponse:String;
  imageResponse:String;

  activate: boolean;

  constructor() { }

  ngOnInit() {
  }

  onCreateBotSubmit(){
    const bot = {
      name : this.name,
      password: this.description,
      category: this.category,
      subCategory : this.subCategory
    }
  }
}
