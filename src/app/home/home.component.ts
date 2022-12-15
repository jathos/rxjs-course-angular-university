import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    //BELOW CODE IS AN EXAMPLE OF BUILDING COMPONENTS WITH IMPERATIVE DESIGN
    // beginnerCourses: object;

    // advancedCourses: object;

    // constructor() {

    // }

    // ngOnInit() {

    //     const http$ = createHttpObservable();

    //     const courses$ = http$.pipe(map(res => res['payload']));

    //     courses$.subscribe(courses => {
    //         this.beginnerCourses = courses.filter(course => course.category == 'BEGINNER');
    //         this.advancedCourses = courses.filter(course => course.category == 'ADVANCED');
    //     }, () => { }, () => console.log('completed'));
    // }

    //BELOW CODE IS AN EXAMPLE OF BUILDING COMPONENTS WITH REACTIVE DESIGN
    beginnerCourses$: Observable<Course>;

    advancedCourses$: Observable<Course>;

    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable();

        //THE TAP OPERATOR IS USED TO PERFORM SIDE EFFECTS / UPDATE ELEMENTS OUTSIDE THE OBSERVABLE CHAIN
        const courses$ = http$.pipe(
            tap(() => console.log('HTTP Request Executed')),
            map(res => res['payload']),
            shareReplay()
        );

        this.beginnerCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category == 'BEGINNER')));

        this.advancedCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category == 'ADVANCED')));

    }
}
