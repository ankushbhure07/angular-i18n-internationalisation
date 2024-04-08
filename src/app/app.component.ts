import { Component, Inject, LOCALE_ID, inject } from '@angular/core';
import { Location, LocationStrategy, PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(@Inject(LOCALE_ID) public locale: string, private location: Location, private platformLocation: PlatformLocation, private locationStrategy: LocationStrategy){
    console.log(locale)
  }
  title = 'language_i18n';
  status = true;
  array = [1, 2];
  minutes = 0;
  gender = 'female';
  date = '2023/06/20';
  switch_languge(){
    console.log(this.platformLocation.href + this.locale);
    document.location = this.platformLocation.href + this.locale;
  }

}
