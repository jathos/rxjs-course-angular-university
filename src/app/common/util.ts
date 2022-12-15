import { Observable } from "rxjs";

export function createHttpObservable(url: string) {
    return new Observable(observer => {

        const controller = new AbortController();

        //controller.abort()
        //ABOVE CODE IS THE METHOD USED TO ACTIVATE AN UNSUBSCRIPTION

        //PER THE VIDEO LESSON:
        //"the abort controller provides us a signal.  this is an abort signal that if it 
        //emits a value of true then the fetch request is going to be canceled by the browser"
        const signal = controller.signal;

        fetch(url, { signal })
            .then(response => {
                return response.json();
            })
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            .catch(err => {
                observer.error(err);
            });

        return () => controller.abort()
    });
};

