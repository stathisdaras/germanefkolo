import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-navigation.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SideNavigationComponent implements OnInit, OnDestroy {
  isScrolled = false;
  currentSection = 'hero';
  private scrollTimeout: any;
  private sections = ['hero', 'about', 'services', 'testimonials', 'contact'];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolled = false;
    }, 1000);

    // Update current section based on scroll position
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          this.currentSection = section;
          break;
        }
      }
    }
  }

  ngOnInit() {
    // Initial scroll check
    this.onWindowScroll();
  }

  ngOnDestroy() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
} 