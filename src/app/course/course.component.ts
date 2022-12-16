import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course$: Observable<any>;
    lessons$: Observable<any>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        const courseId = this.route.snapshot.params['id'];

        this.course$ = createHttpObservable(`/api/courses/${courseId}`);

        this.lessons$ = createHttpObservable(`/api/lessons?courseId=${courseId}&pageSize=100`)
            .pipe(
                map(res => res['payload'])
            );
    }

    ngAfterViewInit() {

        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                map((event: any) => event.target.value),
                //https://rxjs-dev.firebaseapp.com/api/index/function/debounceTime
                //DEBOUNCE TIME WILL ONLY SEND A VALUE TO THE STREAM IF
                //THERE HAS BEEN SILENCE FOR A GIVEN PERIOD OF TIME
                //IN THE CASE BELOW IT NEEDS 400MS OF SILENCE BEFORE 
                //EMITTING A VALUE
                debounceTime(400),
                //DISTINCTUNTILCHANGED IS KIND OF LIKE IT SOUNDS
                distinctUntilChanged()
            )
            .subscribe(console.log);


    }




}
