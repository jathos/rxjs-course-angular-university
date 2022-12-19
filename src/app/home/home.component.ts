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

        const http$ = createHttpObservable('/api/courses');

        //THE TAP OPERATOR IS USED TO PERFORM SIDE EFFECTS / UPDATE ELEMENTS OUTSIDE THE OBSERVABLE CHAIN
        const courses$ = http$.pipe(
            tap(() => console.log('HTTP Request Executed')),
            map(res => res['payload']),
            shareReplay(),
            catchError(err => of([
                {
                    id: 0,
                    description: "RxJs In Practice Course",
                    iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
                    courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
                    longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
                    category: 'BEGINNER',
                    lessonsCount: 10
                }
            ]))
        );

        this.beginnerCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category == 'BEGINNER')));

        this.advancedCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category == 'ADVANCED')));

    }
}
