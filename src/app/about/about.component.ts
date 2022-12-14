import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    //The below code was used to show what data streams can be 
    //(the click events below are a type of stream, the interval is a continuous stream, and the timeout is a stream with a single value) 
    //The nested code below shows how multiple data streams can overlap creating confusing code and confusing results
    // document.addEventListener('click', evt => {

    //   console.log(evt);

    //   setTimeout(() => {
    //     console.log('Timeout has elapsed');

    //     let counter = 0;

    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);

    //   }, 3000);
    // });

    //THIS CODE WILL DECLARE A STREAM TEMPLATE (OBSERVABLE) REPEATING AT AN INTERVAL OF EVERY 1000 MS
    // THE $ SIGN IS USED TO DECLARE AN OBSERVABLE
    //const interval$ = interval(1000)

    //THIS CODE DECLARES A STREAM TEMPLATE (OBSERVABLE) THAT WILL START AFTER 3000 MS AND THEN REPEAT EVERY 1000 MS
    //THE $ SIGN IS USED TO DECLARE AN OBSERVABLE
    // const interval$ = timer(3000, 1000);

    // SUBSCRIBING TO AN OBSERVABLE CREATES AN INSTANCE OF THAT DATA STREAM
    // interval$.subscribe(val => console.log('stream 1 ' + val));

    // const sub = interval$.subscribe(val => console.log('stream 2 ' + val));

    // UNSUBSCRIBE IS A METHOD ON SUBSCRIPTIONS THAT WILL UNSUBSCRIBE FROM THE DATA STREAM
    // setTimeout(() => sub.unsubscribe(), 5000);

    // const click$ = fromEvent(document, 'click');

    // SUBSCRIBE PARAMETERS ARE CALLBACK, ERROR CALLBACK, AND CALLBACK IF STREAM COMPLETES.  AN OBSERVABLE STREAM SHOULD END AFTER EITHER AN ERROR OR COMPLETING
    // click$.subscribe(evt => console.log(evt), err => console.log(), () => console.log("completed"));


    //BELOW CODE CREATES A NEW OBSERVABLE BY WRITING ONE FROM SCRATCH.  
    //   const http$ = new Observable(observer => {
    //     fetch('/api/courses')
    //       .then(response => {
    //         return response.json();
    //       })
    //       .then(body => {
    //         observer.next(body);
    //         observer.complete();
    //       })
    //       .catch(err => {
    //         observer.error(err);
    //       })
    //   });

    //   http$.subscribe(courses => console.log(courses), () => { }, () => console.log('completed'));

    //BELOW FUNCTION HAS BEEN PLACED INTO 'src/app/comm/util.ts' AS AN EXPORTABLE UTILITY
    // function createHttpObservable(url: string) {
    //   return new Observable(observer => {
    //     fetch('/api/courses')
    //       .then(response => {
    //         return response.json();
    //       })
    //       .then(body => {
    //         observer.next(body);
    //         observer.complete();
    //       })
    //       .catch(err => {
    //         observer.error(err);
    //       });
    //   });
    // };

    //OPERATORS RETURN ANOTHER OBSERVABLE THAT EMITS THE RESULTS OF THE OPERATOR FUNCTION

    //PIPE METHOD ALLOWS YOU TO CHAIN MULTIPLE OPERATORS

    // const http$ = createHttpObservable();

    // //to understand below code, please see the sample api format used in example.json.
    // //bracket notation is being used to access the main property on a json object, with a key name of 'payload'
    // //payload is an array of nine objects
    // const courses$ = http$.pipe(map(res => res['payload']));

    // courses$.subscribe((courses) => console.log(courses), () => { }, () => console.log('completed'));

  }
}
