import { useState, useEffect } from 'react';
import { appRequest } from '../utils/axios';
import { FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateGood = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [name, setName] = useState('');
  const [numberOfItems, setNumberOfItems] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

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

    const fetchGoodDetails = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await appRequest.get(`/goods/${id}`);
        const { name, numberOfItems, price, categoryId } = response.data;
        setName(name);
        setNumberOfItems(numberOfItems);
        setPrice(price);
        setCategoryId(categoryId);
      } catch (error) {
        setMessage('Failed to fetch good details');
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
    fetchGoodDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 

    try {
      const response = await appRequest.put(
        `/goods/${id}`,
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

      setMessage('Good updated successfully!');
      navigate('/home'); 
    } catch (error) {
      console.error('Error updating good:', error); 
      setMessage('Failed to update good. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <FaEdit size={48} className="text-gray-700" />
        </div>
        <h3 className="text-3xl font-bold text-center text-gray-700 mb-6">Update Good</h3>
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
            Update Good
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateGood;
