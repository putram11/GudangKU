import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/banner.jpg'; 


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <img src={bannerImage} alt="Warehouse Banner" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to GudangKu</h1>
          <Link
            to="/login"
            className="bg-blue-800 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-8 space-y-12">
        <section className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About GudangKu</h2>
          <p className="text-gray-700 leading-relaxed">
          GudangKu is more than just a warehouse management solution; it's your strategic ally in optimizing inventory, streamlining operations, and driving business growth. Our platform is designed to revolutionize the way you manage your warehouse, offering unparalleled efficiency, visibility, and control. With GudangKu, you gain complete oversight of your inventory, from incoming goods to outgoing shipments. Our advanced tracking system provides real-time updates on product locations, quantities, and movement, enabling you to make informed decisions and prevent stockouts or overstocking.
          Beyond inventory management, GudangKu empowers you to streamline your entire warehouse operation. Our user-friendly interface and intuitive features simplify tasks, reduce errors, and accelerate processes. From receiving and put-away to picking, packing, and shipping, every step is optimized for maximum productivity.
          Experience the power of data-driven insights with GudangKu's robust analytics. Gain valuable information about inventory turnover, product performance, and warehouse efficiency. Use these insights to identify opportunities for improvement, reduce costs, and enhance overall supply chain performance.Our commitment to excellence extends beyond the software. We offer exceptional customer support and training to ensure you get the most out of GudangKu. Our dedicated team is always ready to assist you with implementation, troubleshooting, and optimization.
          Choose GudangKu as your trusted partner in warehouse management. Let us help you unlock the full potential of your operations, improve efficiency, and drive your business forward.
          </p>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Features</h2>
          <ul className="list-disc pl-5 text-gray-700 leading-relaxed">
            <li>Real-time inventory tracking</li>
            <li>Efficient goods management</li>
            <li>Comprehensive reporting</li>
            <li>User-friendly interface</li>
            <li>Secure and reliable</li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Started</h2>
          <p className="text-gray-700 leading-relaxed">
            To start using GudangKu, simply sign up and create your first warehouse. Explore the various features and tools we offer to optimize your warehouse management.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
