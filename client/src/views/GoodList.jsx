import React, { useState, useEffect } from 'react';
import { appRequest } from '../utils/axios'; // Adjust the path as needed
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GoodsList = () => {
  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await appRequest.get('/cat'); // Fetch categories
        setCategories(response.data);
      } catch (error) {
        setMessage('Failed to fetch categories');
      }
    };

    const fetchGoods = async () => {
      try {
        const response = await appRequest.get('/goods', {
          params: {
            search,
            categoryId: selectedCategory,
          },
        });
        setGoods(response.data);
      } catch (error) {
        setMessage('Failed to fetch goods');
      }
    };

    fetchCategories();
    fetchGoods();
  }, [search, selectedCategory]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await appRequest.delete(
          `/goods/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        setGoods(goods.filter((good) => good.id !== id));
        setMessage('Good deleted successfully!');
      } catch (error) {
        setMessage('Failed to delete good. Please try again.');
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Goods List</h2>
        {message && (
          <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-4">
          {goods.length ? (
            goods.map((good) => (
              <div key={good.id} className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{good.name}</h3>
                  <p className="text-gray-700">Number of Items: {good.numberOfItems}</p>
                  <p className="text-gray-700">Price: ${good.price}</p>
                  <p className="text-gray-700">Category: {good.Category.name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(good.id)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(good.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No goods available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodsList;
