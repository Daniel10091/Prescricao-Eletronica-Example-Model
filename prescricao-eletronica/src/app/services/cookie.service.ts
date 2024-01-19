import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  /**
   * Set the value of the cookie in the browser with the expiration date.
   * 
   * @param name
   * @param value
   * @param days
   * 
   * @description Set cookie value and days to expire in the browser.
   */
  public setCookie(name: string, value: string, days: number): void {
    const date: Date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires: string = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  /**
   * Get the value of the cookie in the browser.
   * 
   * @param name
   * 
   * @description Get cookie value in the browser.
   */
  public getCookie(name: string): string {
    const nameEQ: string = name + "=";
    const ca: string[] = document.cookie.split(';');
    for (let i: number = 0; i < ca.length; i++) {
      let c: string = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      };
    }
    return '';
  }

  /**
   * Delete the value of the cookie in the browser.
   * 
   * @param name
   * 
   * @description Delete cookie value in the browser.
   */
  public deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }

  /**
   * Check if the cookie exists in the browser.
   * 
   * @param name
   * 
   * @description Check if cookie exists in the browser.
   */
  public checkCookie(name: string): boolean {
    const user: string = this.getCookie(name);
    if (user != '') {
      return true;
    } else {
      return false;
    }
  }

}
