# German Language Learning Website

A modern, responsive website for German language learning services, built with Angular standalone components and Tailwind CSS.

## Features

- 🌐 Multi-language support (German, English, Greek)
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 💬 Testimonials carousel
- 🎯 Interactive navigation
- ⚡ Built with Angular standalone components (no NgModules)
- 💅 LESS and Tailwind CSS for styling

## Tech Stack

- Angular 19+ (standalone components, `bootstrapApplication`)
- Tailwind CSS
- PrimeNG Components
- TypeScript
- LESS for component-level styling

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/stathisdaras/germanefkolo.git
    cd germanefkolo
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    ng serve
    ```
4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── services/
│   │   ├── testimonials/
│   │   ├── contact/
│   │   ├── footer/
│   │   ├── language-picker/
│   │   └── side-navigation/
│   ├── services/
│   │   └── translation.service.ts
│   ├── app.component.ts
│   └── app.component.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── translations/
└── styles/
    └── styles.less
```

## Deployment

To build for production:
```bash
ng build --configuration production
```
Deploy the contents of the `dist/` directory to your preferred static hosting provider.

## Features in Detail

### Multi-language Support
- Seamless language switching between German, English, and Greek
- Persistent language preference using localStorage
- Translation service for dynamic content

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Adaptive layouts for all screen sizes

### Interactive Elements
- Animated hero section
- Smooth scrolling
- Interactive service cards
- Testimonials carousel

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Angular](https://angular.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PrimeNG](https://www.primefaces.org/primeng/)
- [Font Awesome](https://fontawesome.com/)

## Contact

Efstathios Daras - [stathisdaras.github.io](https://stathisdaras.github.io/)

Project Link: [https://github.com/stathisdaras/germanefkolo](https://github.com/stathisdaras/germanefkolo)
