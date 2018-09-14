import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {

  apiUrl = 'http://mouadhhsoumi.com/ademkouki/testapi/'; // Get answers and %
  answerUrl = 'http://mouadhhsoumi.com/ademkouki/testapi/answer.php'; // to store data
  //postUrl = 'http://mouadhhsoumi.com/ademkouki/testapi/post.php'; // for POST

  constructor(public http: HttpClient) {
  }

  getData() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  postData(question_id, answer) {

    // let postData = JSON.stringify({
    //   "question_id": question_id,
    //   "answer": answer,
    // });
    // this.http.post(this.postUrl, postData)
    //   .subscribe(data => {
    //     console.log(data);
    //   }, error => {
    //     console.log(error);
    //   });


    // insted of POST method, i will use GET method.. because my server is piece of shit...
    this.http.get(this.answerUrl + "?question_id=" + question_id + "&answer=" + answer)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });



  }











}
