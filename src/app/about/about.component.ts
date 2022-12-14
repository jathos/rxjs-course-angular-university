import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

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
    const interval$ = timer(3000, 1000);

    //SUBSCRIBING TO AN OBSERVABLE CREATES AN INSTANCE OF THAT DATA STREAM
    interval$.subscribe(val => console.log('stream 1 ' + val));

    interval$.subscribe(val => console.log('stream 2 ' + val));

    const click$ = fromEvent(document, 'click');

    click$.subscribe(evt => console.log(evt));
  }

}
