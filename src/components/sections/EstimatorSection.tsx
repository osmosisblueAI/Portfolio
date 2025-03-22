'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Project types and features
const projectTypes = [
  { id: 'portfolio', name: 'Portfolio', basePrice: 1500 },
  { id: 'business', name: 'Business Site', basePrice: 2500 },
  { id: 'ecommerce', name: 'E-commerce', basePrice: 3500 },
  { id: 'custom', name: 'Custom App', basePrice: 5000 },
];

const featureOptions = [
  { id: 'cms', name: 'Content Management System', price: 500 },
  { id: 'blog', name: 'Blog Integration', price: 400 },
  { id: 'animations', name: 'Advanced Animations', price: 600 },
  { id: 'payment', name: 'Payment Gateway', price: 800 },
  { id: 'multilingual', name: 'Multilingual Support', price: 700 },
  { id: 'seo', name: 'SEO Optimization', price: 500 },
];

const timelineOptions = [
  { id: 'standard', name: 'Standard (4-6 weeks)', multiplier: 1 },
  { id: 'accelerated', name: 'Accelerated (2-3 weeks)', multiplier: 1.3 },
  { id: 'rush', name: 'Rush (1-2 weeks)', multiplier: 1.6 },
];

const EstimatorSection = () => {
  const [selectedProject, setSelectedProject] = useState(projectTypes[0].id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[0].id);
  const [estimatedPrice, setEstimatedPrice] = useState({ min: 0, max: 0 });
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Calculate the estimated price whenever selections change
  useEffect(() => {
    const projectType = projectTypes.find(p => p.id === selectedProject);
    const timeline = timelineOptions.find(t => t.id === selectedTimeline);
    
    if (!projectType || !timeline) return;
    
    let basePrice = projectType.basePrice;
    
    // Add feature costs
    let featuresPrice = 0;
    selectedFeatures.forEach(featureId => {
      const feature = featureOptions.find(f => f.id === featureId);
      if (feature) {
        featuresPrice += feature.price;
      }
    });
    
    // Apply timeline multiplier
    const totalPrice = (basePrice + featuresPrice) * timeline.multiplier;
    
    // Set a price range rather than an exact figure for flexibility
    const minPrice = Math.floor(totalPrice * 0.9);
    const maxPrice = Math.ceil(totalPrice * 1.1);
    
    setEstimatedPrice({ min: minPrice, max: maxPrice });
  }, [selectedProject, selectedFeatures, selectedTimeline]);

  // Toggle feature selection
  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  return (
    <section id="estimator" className="py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <h2 className="section-heading mx-auto text-center">Project Estimator</h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Use this interactive tool to get a quick estimate for your project. Adjust the options below to see how they affect the price.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-zinc-900 rounded-lg p-6 md:p-8 border border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Project Type */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Type</h3>
              <div className="space-y-3">
                {projectTypes.map((type) => (
                  <div key={type.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`project-${type.id}`}
                      name="projectType"
                      className="sr-only"
                      checked={selectedProject === type.id}
                      onChange={() => setSelectedProject(type.id)}
                    />
                    <label
                      htmlFor={`project-${type.id}`}
                      className={`flex items-center justify-between w-full p-3 rounded cursor-pointer transition-all ${
                        selectedProject === type.id
                          ? 'bg-primary/20 border border-primary'
                          : 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      <span>{type.name}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedProject === type.id
                            ? 'border-primary'
                            : 'border-zinc-500'
                        }`}
                      >
                        {selectedProject === type.id && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Timeline</h3>
              <div className="space-y-3">
                {timelineOptions.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`timeline-${option.id}`}
                      name="timeline"
                      className="sr-only"
                      checked={selectedTimeline === option.id}
                      onChange={() => setSelectedTimeline(option.id)}
                    />
                    <label
                      htmlFor={`timeline-${option.id}`}
                      className={`flex items-center justify-between w-full p-3 rounded cursor-pointer transition-all ${
                        selectedTimeline === option.id
                          ? 'bg-primary/20 border border-primary'
                          : 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      <span>{option.name}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedTimeline === option.id
                            ? 'border-primary'
                            : 'border-zinc-500'
                        }`}
                      >
                        {selectedTimeline === option.id && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featureOptions.map((feature) => (
                <div key={feature.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`feature-${feature.id}`}
                    className="sr-only"
                    checked={selectedFeatures.includes(feature.id)}
                    onChange={() => toggleFeature(feature.id)}
                  />
                  <label
                    htmlFor={`feature-${feature.id}`}
                    className={`flex items-center justify-between w-full p-3 rounded cursor-pointer transition-all ${
                      selectedFeatures.includes(feature.id)
                        ? 'bg-primary/20 border border-primary'
                        : 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700'
                    }`}
                  >
                    <span>{feature.name}</span>
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedFeatures.includes(feature.id)
                          ? 'border-primary'
                          : 'border-zinc-500'
                      }`}
                    >
                      {selectedFeatures.includes(feature.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Estimate Result */}
          <div className="bg-zinc-800 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Estimated Cost</h3>
            <p className="text-3xl font-bold text-primary mb-3">
              ${estimatedPrice.min.toLocaleString()} - ${estimatedPrice.max.toLocaleString()}
            </p>
            <p className="text-zinc-400 text-sm mb-4">
              This is an estimate based on your selections. The final price may vary depending on specific requirements.
            </p>
            <a href="#contact" className="hero-button">
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimatorSection; 