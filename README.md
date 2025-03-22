# Luke Eddy Portfolio

A professional portfolio website for Luke Eddy, showcasing web design and development services with a sleek, dark-themed design.

## Features

- **Responsive Design**: Fully responsive, mobile-first design that looks great on all devices
- **Modern UI**: Sleek dark theme with gold accents and subtle animations
- **Interactive 3D Elements**: Three.js-powered 3D globe in the hero section
- **Interactive Project Estimator**: Clients can estimate project costs
- **Contact Form**: Integrated contact form with validation and server-side handling
- **Animations**: Smooth animations and transitions using Framer Motion
- **Performance Optimized**: Fast loading times and optimal performance

## Tech Stack

- **Frontend**:
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Three.js / React Three Fiber
  - React Hook Form

- **Backend**:
  - Next.js API Routes
  - Nodemailer (for contact form)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/luke-eddy-portfolio.git
   cd luke-eddy-portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

For a production deployment with a working contact form, create a `.env.local` file with the following:

```
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=contact@luke-eddy.com
EMAIL_TO=your-email@example.com
```

## Deployment

This project can be easily deployed on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## Customization

### Updating Portfolio Projects

Edit the project data in `src/components/sections/PortfolioSection.tsx` to add your own projects.

### Changing Colors

Modify the color scheme in `src/app/globals.css` by updating the CSS variables in the `:root` selector.

### Adding Real Images

Add portfolio images to the `public/portfolio` directory and update the image paths in the components.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from Heroicons
