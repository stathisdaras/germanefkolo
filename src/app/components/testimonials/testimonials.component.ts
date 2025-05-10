import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.less'],
  standalone: true,
  imports: [CarouselModule]
})
export class TestimonialsComponent {
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

  constructor(private translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  getTestimonials() {
    return this.translationService.getTestimonials();
  }
} 