import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {

  public static emailFormat(c: AbstractControl) {
    if (!c.value) {
      return null;
    }

    // tslint:disable-next-line
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(c.value) ? null : { emailFormat: true };
  }

  public static notEmpty(c: AbstractControl) {
    return (c.value && !c.value.trim()) ? { empty: true } : null;
  }

  public static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  // https://codinglatte.com/posts/angular/cool-password-validation-angular/
  public static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ noPasswordMatch: true });
    }
  }


  public static urlFormat(control: AbstractControl) {
    const obj: any = Validators.required(control);
    if (obj !== undefined && obj !== null) {
      return null;
    }

    const v: string = control.value;
    // tslint:disable-next-line
    const REGEXP = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return REGEXP.test(v) ? null : { url: true };
  }

  public static url(c: AbstractControl) {
    if (!c.value) {
      return null;
    }

    // tslint:disable-next-line
    let REGEXP = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return REGEXP.test(c.value) ? null : { url: true };
  }

  public static phoneFormat(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    // tslint:disable-next-line
    const REGEXP = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
    return REGEXP.test(c.value) ? null : { phoneFormat: true };
  }

  // refs Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number:
  public static passwordCheck(c: AbstractControl) {
    const PASS_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    return PASS_REGEXP.test(c.value) ? null : { passwordCheck: true };
  }

  public static lowercaseUppercase(c: AbstractControl) {
    const REGEXP = /(?=.*[a-z])(?=.*[A-Z])/;
    return REGEXP.test(c.value) ? null : { lowercaseUppercase: true };
  }

  public static specialSymbol(c: AbstractControl) {
    const REGEXP = /(?=.*\W)/;
    return REGEXP.test(c.value) ? null : { specialSymbol: true };
  }

  public static number(c: AbstractControl) {
    const REGEXP = /(?=.*\d)/;
    return REGEXP.test(c.value) ? null : { number: true };
  }

  public static specialSymbolOrNumber(c: AbstractControl) {
    const REGEXP = /(?=.*\d)|(?=.*\W)/;
    return REGEXP.test(c.value) ? null : { specialSymbolOrNumber: true };
  }


  public static passwordsEqual(firstField: string, secondField: string) {
    return (c: FormGroup) => {
      return (c.controls && c.controls[firstField].value === c.controls[secondField].value) ? null : { passwordsEqual: true };
    };
  }

  public static ipHostFormat(c: AbstractControl) {
    if (c.value.length === 0) {
      return null;
    }

    // Ref: http://jsfiddle.net/AJEzQ/
    // tslint:disable-next-line
    let pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    return pattern.test(c.value) ? null : { ipHostFormat: true };
  }

  static blanked(control: AbstractControl) {
    return control.value && control.value.trim().length === 0 ? { blanked: true } : null;
  }

  static validateCCNumber(control: AbstractControl) {
    if (Validators.required(control) !== undefined && Validators.required(control) !== null) {
      return true;
    }

    const num = control.value.toString().replace(/\s+|-/g, '');

    if (!/^\d+$/.test(num)) {
      return true;
    }

    // let card = control.value;
    //
    // if (!card) {
    //   return {'ccNumber': true};
    // }
    //
    // if (card.length.includes(num.length) && (card.luhn === false || CreditCard.luhnCheck(num))) {
    //   return null;
    // }
    //
    // const upperlength = card.length[card.length.length - 1];
    // if (num.length > upperlength) {
    //   const registeredNum = num.substring(0, upperlength);
    //   if (CreditCard.luhnCheck(registeredNum)) {
    //     return null;
    //   }
    // }
    return true;
  }

  static validateCCExpDate(control: AbstractControl) {
    if (Validators.required(control) !== undefined && Validators.required(control) !== null) {
      return { expDate: true };
    }

    if (typeof control.value !== 'undefined' && control.value.length >= 7) {
      let [month, year] = control.value.split(/[\s\/]+/, 2);
      let prefix;

      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = new Date().getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      month = parseInt(month, 10).toString();
      year = parseInt(year, 10).toString();

      if (/^\d+$/.test(month) && /^\d+$/.test(year) && (month >= 1 && month <= 12)) {
        let currentTime;
        let expiry;
        expiry = new Date(year, month);
        currentTime = new Date();
        expiry.setMonth(expiry.getMonth() - 1);
        expiry.setMonth(expiry.getMonth() + 1, 1);

        if (expiry > currentTime) {
          return null;
        }
      }
    }

    return true;

  }
}
