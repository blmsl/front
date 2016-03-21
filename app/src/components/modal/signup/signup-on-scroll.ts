import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

import { Modal, SignupModal } from '../modal';
import { SessionFactory } from '../../../services/session';
import { ScrollService } from '../../../services/ux/scroll';
import { AnalyticsService } from '../../../services/analytics';


@Component({
  selector: 'm-modal-signup-on-scroll',
  directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, Modal, SignupModal ],
  template: `
    <m-modal-signup open="true" *ngIf="open"></m-modal-signup>
  `
})

export class SignupOnScrollModal {

  open : boolean = false;
  session = SessionFactory.build();
  route : string = "";
  scroll_listener;
  minds = window.Minds;

  display : string = 'initial';

  constructor(public router : Router, public scroll : ScrollService){
    this.listen();
  }

  listen(){
    this.router.subscribe((route) => {
      this.route = route;
      switch(route.split('?')[0]){
        case 'register':
        case 'login':
        case 'forgot-password':
        case '':
          this.open = false;
          break;
        default:
          this.scroll_listener = this.scroll.listen((e) => {
            if(this.scroll.view.scrollTop > 100){
              if(window.localStorage.getItem('hideSignupModal'))
                this.open = false;
              else
                this.open = true;
              this.scroll.unListen(this.scroll_listener);
            }
          }, 100);
      }
    });
  }

  ngOnDestroy(){
    if(this.scroll_listener)
      this.scroll.unListen(this.scroll_listener);
  }

}
