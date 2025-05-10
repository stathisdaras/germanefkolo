import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as yaml from 'js-yaml';

export interface Translation {
  [key: string]: {
    [lang: string]: string;
  };
}

export interface Testimonial {
  name: string;
  comment: string;
}

interface TestimonialsSection {
  title: string;
  list: Testimonial[];
}

interface Translations {
  [key: string]: {
    [lang: string]: string | TestimonialsSection;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  constructor(private http: HttpClient) {
    this.loadTranslations();
  }

  private loadTranslations() {
    this.http.get('assets/translations/translations.yml', { responseType: 'text' })
      .pipe(
        tap(yamlText => {
          this.translations = yaml.load(yamlText) as any;
        })
      )
      .subscribe();
  }

  setLanguage(lang: string) {
    this.currentLang.next(lang);
    localStorage.setItem('preferredLanguage', lang);
  }

  getLanguage(): string {
    return this.currentLang.value;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value[this.currentLang.value] || key;
  }

  getTestimonials(): Testimonial[] {
    const lang = this.currentLang.value;
    return this.translations?.testimonials?.list?.[lang] || [];
  }
}