import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ipv4Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // retourne null si aucun valeur est entrée pour permettre des champs facultatifs
    }
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const valid = ipv4Regex.test(control.value);
    return valid ? null : { 'ipv4': 'Invalid IPv4 address' };  // retourne un objet d'erreur si non valide
  };
}