'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProjectLayout from '@/components/layout/ProjectLayout';
import { 
  ChartBarIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

// Sample data for the dashboard
const sampleData = {
  totalSales: 12495,
  totalOrders: 368,
  totalCustomers: 1204,
  revenue: 47880,
  salesIncrease: 12.5,
  ordersIncrease: 8.3,
  customersIncrease: 15.7,
  revenueDecrease: 2.1,
  recentOrders: [
    { id: 'ORD-5723', customer: 'John Doe', amount: 125.99, status: 'Delivered' },
    { id: 'ORD-5722', customer: 'Sarah Smith', amount: 89.45, status: 'Processing' },
    { id: 'ORD-5721', customer: 'Mike Johnson', amount: 432.12, status: 'Shipped' },
    { id: 'ORD-5720', customer: 'Emily Wilson', amount: 76.30, status: 'Delivered' },
    { id: 'ORD-5719', customer: 'David Brown', amount: 154.25, status: 'Processing' }
  ],
  topProducts: [
    { name: 'Wireless Headphones', sold: 124, revenue: 7440 },
    { name: 'Smart Watch Pro', sold: 98, revenue: 9800 },
    { name: 'Laptop Sleeve', sold: 156, revenue: 4680 },
    { name: 'Phone Charger', sold: 212, revenue: 4240 }
  ]
};

export default function EcommerceDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <ProjectLayout title="E-commerce Dashboard">
      {/* Project introduction */}
      <section className="w-full py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Interactive Demo</h2>
              <p className="text-gray-300 mb-6">
                This is a functional demo of an e-commerce admin dashboard. Explore the various
                sections to see real-time data visualization, order management, and inventory tracking.
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400">Scope</h4>
                    <p className="text-gray-300">Admin Dashboard UI + Data Visualization</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["React", "TypeScript", "Chart.js", "Tailwind CSS", "Node.js"].map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">My Role</h4>
                    <p className="text-gray-300">Frontend Developer & UI Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Dashboard demo */}
      <section className="w-full px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800/70 rounded-xl overflow-hidden shadow-xl">
            {/* Dashboard tabs */}
            <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex overflow-x-auto hide-scrollbar">
              {['dashboard', 'orders', 'products', 'customers', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 mr-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Dashboard content */}
            <div className="p-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard 
                      title="Total Sales" 
                      value={`$${sampleData.totalSales.toLocaleString()}`} 
                      change={sampleData.salesIncrease} 
                      icon={<ChartBarIcon className="h-6 w-6" />}
                      isPositive={true}
                    />
                    <StatsCard 
                      title="Orders" 
                      value={sampleData.totalOrders.toLocaleString()} 
                      change={sampleData.ordersIncrease} 
                      icon={<ShoppingCartIcon className="h-6 w-6" />}
                      isPositive={true}
                    />
                    <StatsCard 
                      title="Customers" 
                      value={sampleData.totalCustomers.toLocaleString()} 
                      change={sampleData.customersIncrease} 
                      icon={<UsersIcon className="h-6 w-6" />}
                      isPositive={true}
                    />
                    <StatsCard 
                      title="Revenue" 
                      value={`$${sampleData.revenue.toLocaleString()}`} 
                      change={sampleData.revenueDecrease} 
                      icon={<CurrencyDollarIcon className="h-6 w-6" />}
                      isPositive={false}
                    />
                  </div>
                  
                  {/* Charts and tables */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-4 text-white">Sales Overview</h3>
                      <div className="h-64 w-full flex items-center justify-center">
                        <div className="text-gray-500 text-sm">
                          [Interactive Chart - Visualization Demo]
                        </div>
                        <div className="relative h-full w-full">
                          <Image 
                            src="/portfolio/dashboard-chart.jpg" 
                            alt="Sales chart" 
                            fill
                            className="object-contain rounded opacity-70"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-4 text-white">Top Products</h3>
                      <div className="space-y-3">
                        {sampleData.topProducts.map((product, index) => (
                          <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <div>
                              <p className="text-white">{product.name}</p>
                              <p className="text-sm text-gray-400">{product.sold} units</p>
                            </div>
                            <span className="text-blue-400">${product.revenue.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent orders */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-white">Recent Orders</h3>
                      <button className="text-sm text-blue-400 hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700/30">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {sampleData.recentOrders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-700/30">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                                {order.id}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                                {order.customer}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                                ${order.amount}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-900/30 text-green-400' 
                                    : order.status === 'Processing' 
                                      ? 'bg-yellow-900/30 text-yellow-400'
                                      : 'bg-blue-900/30 text-blue-400'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-400 hover:text-blue-300 ml-2">View</button>
                                <button className="text-blue-400 hover:text-blue-300 ml-2">Edit</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab !== 'dashboard' && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-4 text-white">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    This section would contain the {activeTab} management interface. 
                    Click on other tabs to explore the dashboard.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Project details section */}
      <section className="w-full px-4 md:px-8 py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">About This Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="space-y-4 text-gray-300">
                <p>
                  This e-commerce dashboard is designed to provide business owners with a comprehensive 
                  view of their online store's performance. The interface is optimized for quick access 
                  to critical information while maintaining visual clarity.
                </p>
                <p>
                  The dashboard includes real-time data visualization, order management, inventory 
                  tracking, and customer relationship tools. The responsive design ensures that 
                  store managers can monitor performance metrics from any device.
                </p>
                <p>
                  Key features include customizable widgets, data export capabilities, user role 
                  management, and integration with popular payment gateways and shipping providers.
                </p>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-blue-400">Development Process</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  The development process began with extensive user research to understand the 
                  needs of e-commerce managers. Wireframes were created to establish the information 
                  hierarchy and user flow, followed by high-fidelity mockups.
                </p>
                <p>
                  The frontend was built using React and TypeScript, with Tailwind CSS for styling. 
                  Chart.js was integrated for data visualization, and the dashboard communicates with 
                  a Node.js backend API to retrieve and update store data.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Features</h3>
                <ul className="space-y-2">
                  {[
                    "Real-time sales tracking",
                    "Order management system",
                    "Customer database",
                    "Inventory tracking",
                    "Data visualization",
                    "Responsive design",
                    "User role management",
                    "Customizable widgets",
                    "Export capabilities",
                    "Payment gateway integration"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

// Stats card component
function StatsCard({ title, value, change, icon, isPositive }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-white mt-1">{value}</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {isPositive ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={isPositive ? "text-green-500" : "text-red-500"}>
          {change}%
        </span>
        <span className="text-gray-400 text-sm ml-2">from last month</span>
      </div>
    </div>
  );
} 