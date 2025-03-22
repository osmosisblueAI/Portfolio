'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah K.',
    role: 'Small Business Owner',
    text: "Luke transformed our online presence with a site that's both beautiful and functional! The attention to detail and user experience has led to a significant increase in customer engagement.",
    image: '/testimonials/sarah.jpg',
  },
  {
    id: 2,
    name: 'Mark T.',
    role: 'Entrepreneur',
    text: "Fast, professional, and creative—Luke's the real deal. He understood our vision immediately and delivered a website that exceeded our expectations. A true asset to any project.",
    image: '/testimonials/mark.jpg',
  },
  {
    id: 3,
    name: 'Jessica L.',
    role: 'Small Business Owner',
    text: "Working with Luke was a game-changer for our brand. His technical expertise combined with an eye for design resulted in a website that perfectly represents our company values.",
    image: '/testimonials/jessica.jpg',
  },
  {
    id: 4,
    name: 'David R.',
    role: 'Entrepreneur',
    text: "Luke didn't just build us a website; he built us a powerful business tool. The custom solutions he implemented have streamlined our operations and improved user conversion.",
    image: '/testimonials/david.jpg',
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <h2 className="section-heading mx-auto text-center">What Clients Say</h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Don't just take my word for it. Here's what some of my clients have to say about working with me.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <div 
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700 relative">
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 text-primary opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                    </svg>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-zinc-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  <p className="text-zinc-300 italic mb-4">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? 'bg-primary scale-125'
                    : 'bg-zinc-600 hover:bg-zinc-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 