import { useState, useEffect } from 'react';
import { appRequest } from '../utils/axios';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateGood = () => {
  const [name, setName] = useState('');
  const [numberOfItems, setNumberOfItems] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await appRequest.get('/cat');
        setCategories(response.data);
      } catch (error) {
        setMessage('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 

    try {
      const response = await appRequest.post(
        '/create',
        {
          name,
          numberOfItems,
          price,
          categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }

      setMessage('Good created successfully!');
      setName('');
      setNumberOfItems('');
      setPrice('');
      setCategoryId('');
      navigate('/home'); 
    } catch (error) {
      console.error('Error creating good:', error); 
      setMessage('Failed to create good. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <FaPlus size={48} className="text-gray-700" />
        </div>
        <h3 className="text-3xl font-bold text-center text-gray-700 mb-6">Create Good</h3>
        {message && (
          <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter the name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="numberOfItems" className="block text-gray-700 text-sm font-semibold mb-2">
              Number of Items
            </label>
            <input
              type="number"
              id="numberOfItems"
              name="numberOfItems"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter the number of items"
              value={numberOfItems}
              onChange={(e) => setNumberOfItems(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter the price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-gray-700 text-sm font-semibold mb-2">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Create Good
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGood;
