import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from './services/translation.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

interface Testimonial {
  name: string;
  comment: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    LanguagePickerComponent,
    SideNavigationComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  showMore = false;

  constructor(public translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  getTestimonials(): Testimonial[] {
    return this.translationService.getTestimonials();
  }

  scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
