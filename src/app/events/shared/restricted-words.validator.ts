import { FormControl } from '@angular/forms';

//reusable custom validator
export function restrictedWords(words) {
  return (control: FormControl): { [key: string]: any } => {
    if (!words) return null;
    var invalidWords = words
      .map((word: string) => (control.value.includes(word) ? word : null))
      .filter((word: string) => word != null);
    return invalidWords && invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(', ') }
      : null;
  };
}
