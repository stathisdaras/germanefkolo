import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
  private currentLang = new BehaviorSubject<string>('el');
  currentLang$ = this.currentLang.asObservable();
  private translations: Translations = {};

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      this.currentLang.next(savedLang);
    }
    this.loadTranslations();
  }

  private loadTranslations() {
    this.http.get<Translations>('assets/translations/translations.json')
      .pipe(
        tap(translations => {
          this.translations = translations;
        })
      )
      .subscribe();
  }

  setLanguage(lang: string) {
    this.currentLang.next(lang);
    localStorage.setItem('preferredLanguage', lang);
  }

  getTranslation(key: string): string {
    const lang = this.currentLang.value;
    const translation = this.translations[key]?.[lang];
    return typeof translation === 'string' ? translation : key;
  }

  getTestimonials(): Testimonial[] {
    const lang = this.currentLang.value;
    const testimonials = this.translations['testimonials']?.[lang];
    return (testimonials as TestimonialsSection)?.list || [];
  }
}