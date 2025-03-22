'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProjectLayout from '@/components/layout/ProjectLayout';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  BookmarkIcon,
  StarIcon,
  ClockIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Sample recipe data
const recipes = [
  {
    id: 1,
    title: 'Mediterranean Pasta Salad',
    author: 'Julia Chen',
    authorImage: '/portfolio/user-1.jpg',
    image: '/portfolio/recipe-1.jpg',
    likes: 347,
    comments: 42,
    saved: false,
    liked: true,
    time: '25 min',
    difficulty: 'Easy',
    tags: ['vegetarian', 'summer', 'pasta'],
    ingredients: [
      '8 oz pasta', 'Cherry tomatoes', 'Cucumber', 'Red onion', 
      'Kalamata olives', 'Feta cheese', 'Olive oil', 'Lemon juice', 
      'Garlic', 'Oregano', 'Salt & pepper'
    ],
    steps: [
      'Cook pasta according to package instructions.',
      'Chop vegetables into bite-sized pieces.',
      'Mix olive oil, lemon juice, garlic, and seasonings for dressing.',
      'Combine all ingredients in a large bowl and toss with dressing.',
      'Refrigerate for at least 30 minutes before serving.'
    ]
  },
  {
    id: 2,
    title: 'Spicy Korean Bulgogi Bowl',
    author: 'David Park',
    authorImage: '/portfolio/user-2.jpg',
    image: '/portfolio/recipe-2.jpg',
    likes: 529,
    comments: 86,
    saved: true,
    liked: false,
    time: '40 min',
    difficulty: 'Medium',
    tags: ['korean', 'beef', 'spicy'],
    ingredients: [
      'Beef sirloin', 'Rice', 'Gochujang paste', 'Soy sauce', 
      'Sesame oil', 'Brown sugar', 'Garlic', 'Ginger', 
      'Green onions', 'Sesame seeds', 'Carrots', 'Spinach'
    ],
    steps: [
      'Slice beef thinly and marinate with soy sauce, gochujang, sugar, garlic.',
      'Cook rice according to package instructions.',
      'Stir-fry beef in a hot pan with sesame oil.',
      'Prepare vegetables by blanching or quick stir-frying.',
      'Assemble bowl with rice on the bottom, topped with beef and vegetables.',
      'Garnish with sesame seeds and green onions.'
    ]
  },
  {
    id: 3,
    title: 'Blueberry Lemon Pancakes',
    author: 'Sarah Johnson',
    authorImage: '/portfolio/user-3.jpg',
    image: '/portfolio/recipe-3.jpg',
    likes: 284,
    comments: 35,
    saved: false,
    liked: false,
    time: '20 min',
    difficulty: 'Easy',
    tags: ['breakfast', 'sweet', 'vegetarian'],
    ingredients: [
      'All-purpose flour', 'Baking powder', 'Sugar', 'Salt', 
      'Eggs', 'Milk', 'Vanilla extract', 'Lemon zest', 'Butter', 
      'Fresh blueberries', 'Maple syrup'
    ],
    steps: [
      'Mix dry ingredients in a large bowl.',
      'Whisk eggs, milk, melted butter, vanilla, and lemon zest in another bowl.',
      'Combine wet and dry ingredients until just mixed.',
      'Fold in blueberries gently.',
      'Cook on a greased griddle until bubbles form, then flip.',
      'Serve with maple syrup and additional blueberries.'
    ]
  }
];

export default function RecipeSocialAppPage() {
  const [activeRecipe, setActiveRecipe] = useState(recipes[0]);
  const [activeTab, setActiveTab] = useState('feed');
  const [recipesData, setRecipesData] = useState(recipes);
  
  const toggleLike = (id) => {
    setRecipesData(recipesData.map(recipe => 
      recipe.id === id 
        ? { 
            ...recipe, 
            liked: !recipe.liked, 
            likes: recipe.liked ? recipe.likes - 1 : recipe.likes + 1 
          } 
        : recipe
    ));
    
    if (activeRecipe.id === id) {
      setActiveRecipe({
        ...activeRecipe,
        liked: !activeRecipe.liked,
        likes: activeRecipe.liked ? activeRecipe.likes - 1 : activeRecipe.likes + 1
      });
    }
  };
  
  const toggleSave = (id) => {
    setRecipesData(recipesData.map(recipe => 
      recipe.id === id 
        ? { ...recipe, saved: !recipe.saved } 
        : recipe
    ));
    
    if (activeRecipe.id === id) {
      setActiveRecipe({
        ...activeRecipe,
        saved: !activeRecipe.saved
      });
    }
  };
  
  return (
    <ProjectLayout title="Culinary Connect">
      {/* App introduction */}
      <section className="w-full py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Interactive Recipe App</h2>
              <p className="text-gray-300 mb-6">
                Experience "Culinary Connect", a social platform for food enthusiasts to discover, 
                share, and save recipes. The app features an interactive feed, recipe details, and 
                social interactions like commenting and saving favorites.
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-400">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400">App Type</h4>
                    <p className="text-gray-300">Social Media + Recipe Sharing</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Vue.js", "Firebase", "Algolia", "TailwindCSS", "Cloudinary"].map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">My Role</h4>
                    <p className="text-gray-300">Full-stack Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* App demo */}
      <section className="w-full px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/70 to-purple-900/30 rounded-xl overflow-hidden shadow-xl p-4 md:p-8">
            {/* App navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-800/70 rounded-full p-1">
                {['feed', 'explore', 'saved', 'profile'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* App content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Recipe feed */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <h3 className="text-lg font-medium mb-4 text-white">Latest Recipes</h3>
                <div className="space-y-4">
                  {recipesData.map((recipe) => (
                    <div 
                      key={recipe.id} 
                      className={`bg-gray-800/60 rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                        activeRecipe.id === recipe.id ? 'ring-2 ring-purple-400' : ''
                      }`}
                      onClick={() => setActiveRecipe(recipe)}
                    >
                      <div className="relative h-40 w-full">
                        <Image 
                          src={recipe.image} 
                          alt={recipe.title} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                            <Image 
                              src={recipe.authorImage} 
                              alt={recipe.author} 
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-300">{recipe.author}</span>
                        </div>
                        <h4 className="font-medium text-white mb-2">{recipe.title}</h4>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-3">
                            <button 
                              className="flex items-center text-gray-400 hover:text-red-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(recipe.id);
                              }}
                            >
                              {recipe.liked ? (
                                <HeartIconSolid className="h-5 w-5 text-red-500" />
                              ) : (
                                <HeartIcon className="h-5 w-5" />
                              )}
                              <span className="ml-1 text-xs">{recipe.likes}</span>
                            </button>
                            <div className="flex items-center text-gray-400">
                              <ChatBubbleLeftIcon className="h-5 w-5" />
                              <span className="ml-1 text-xs">{recipe.comments}</span>
                            </div>
                          </div>
                          <button 
                            className={`${recipe.saved ? 'text-purple-400' : 'text-gray-400'} hover:text-purple-400`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSave(recipe.id);
                            }}
                          >
                            <BookmarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recipe detail */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="bg-gray-800/60 rounded-xl overflow-hidden">
                  <div className="relative h-56 md:h-72 w-full">
                    <Image 
                      src={activeRecipe.image} 
                      alt={activeRecipe.title} 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">{activeRecipe.title}</h2>
                      <div className="flex items-center">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                          <Image 
                            src={activeRecipe.authorImage} 
                            alt={activeRecipe.author} 
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-300">{activeRecipe.author}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between mb-6">
                      <div className="flex space-x-6">
                        <div className="flex items-center">
                          <ClockIcon className="h-5 w-5 text-purple-400 mr-2" />
                          <span className="text-sm text-gray-300">{activeRecipe.time}</span>
                        </div>
                        <div className="flex items-center">
                          <FireIcon className="h-5 w-5 text-purple-400 mr-2" />
                          <span className="text-sm text-gray-300">{activeRecipe.difficulty}</span>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="h-5 w-5 text-purple-400 mr-2" />
                          <span className="text-sm text-gray-300">4.7</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          className={`p-2 rounded-full ${
                            activeRecipe.liked 
                              ? 'bg-red-500/20 text-red-500' 
                              : 'bg-gray-700 text-gray-400 hover:text-red-400'
                          }`}
                          onClick={() => toggleLike(activeRecipe.id)}
                        >
                          {activeRecipe.liked ? (
                            <HeartIconSolid className="h-5 w-5" />
                          ) : (
                            <HeartIcon className="h-5 w-5" />
                          )}
                        </button>
                        <button 
                          className={`p-2 rounded-full ${
                            activeRecipe.saved 
                              ? 'bg-purple-500/20 text-purple-400' 
                              : 'bg-gray-700 text-gray-400 hover:text-purple-400'
                          }`}
                          onClick={() => toggleSave(activeRecipe.id)}
                        >
                          <BookmarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-white mb-3">Ingredients</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {activeRecipe.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-400 mr-2"></div>
                            <span className="text-sm text-gray-300">{ingredient}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-white mb-3">Steps</h3>
                      <ol className="space-y-2">
                        {activeRecipe.steps.map((step, index) => (
                          <li key={index} className="flex">
                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm mr-3">{index + 1}</span>
                            <span className="text-gray-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeRecipe.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project details section */}
      <section className="w-full px-4 md:px-8 py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">About This Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="space-y-4 text-gray-300">
                <p>
                  Culinary Connect is a social recipe sharing platform that brings together food 
                  enthusiasts, home cooks, and professional chefs. The app allows users to discover 
                  new recipes, share their own creations, and connect with others who share their 
                  culinary interests.
                </p>
                <p>
                  The platform features a personalized feed based on user preferences, an advanced 
                  search function with filtering options for dietary restrictions and ingredients, 
                  and a social component that allows users to follow their favorite creators, like 
                  and comment on recipes, and save content for later.
                </p>
                <p>
                  One of the key features is the recipe recommendation engine that suggests recipes 
                  based on the user's past interactions, seasonal ingredients, and trending content 
                  within their network.
                </p>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-purple-400">Development Approach</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  The application was built using Vue.js for the frontend with a component-based 
                  architecture that allows for easy maintenance and scaling. Firebase was used for 
                  the backend, providing authentication, real-time database functionality, and storage 
                  for recipe images.
                </p>
                <p>
                  Algolia was integrated for the search functionality, providing fast and relevant 
                  search results with typo tolerance and filtering capabilities. Cloudinary was used 
                  for image optimization and transformation, ensuring optimal loading times across 
                  devices.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-400">Key Features</h3>
                <ul className="space-y-2">
                  {[
                    "Personalized recipe feed",
                    "Advanced search & filtering",
                    "User profiles & following",
                    "Recipe saving & collections",
                    "Comments & ratings",
                    "Step-by-step cooking mode",
                    "Ingredient scaling",
                    "Dietary preference settings",
                    "Offline recipe access",
                    "Recipe sharing to social media"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProjectLayout>
  );
} 