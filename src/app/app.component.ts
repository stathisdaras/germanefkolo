import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from './services/translation.service';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';

interface Testimonial {
  name: string;
  comment: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitcherComponent,
    CarouselModule,
    ButtonModule,
    SideNavigationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private translationService: TranslationService) {}

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
}
