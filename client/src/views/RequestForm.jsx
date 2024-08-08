import React, { useState, useEffect } from 'react';
import { appRequest } from '../utils/axios'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const RequestForm = () => {
  const [description, setDescription] = useState('');
  const [goods, setGoods] = useState([{ name: '', numberOfItems: '' }]);
  const [message, setMessage] = useState('');
  const [goodOptions, setGoodOptions] = useState([]);
  const [type, setType] = useState('outgoing'); // State for type

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await appRequest.get('/goods');
        setGoodOptions(response.data);
      } catch (error) {
        setMessage('Failed to fetch goods');
      }
    };

    fetchGoods();
  }, []);

  const handleAddGood = () => {
    setGoods([...goods, { name: '', numberOfItems: '' }]);
  };

  const handleGoodChange = (index, field, value) => {
    const newGoods = [...goods];
    newGoods[index] = { ...newGoods[index], [field]: value };
    setGoods(newGoods);
  };

  const handleRemoveGood = (index) => {
    setGoods(goods.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const token = localStorage.getItem('token'); 

    console.log(token)

    try {
      const response = await appRequest.post('/request', 
        { description,
          goods,
          type,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setMessage('Request submitted successfully!');
      setDescription('');
      setGoods([{ name: '', numberOfItems: '' }]);
      navigate("/log")
    } catch (error) {
      console.error('Error submitting request:', error);
      setMessage('Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Create Request</h2>
        {message && (
          <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-gray-700 text-sm font-semibold mb-2">
              Type
            </label>
            <select
              id="type"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="outgoing">Outgoing</option>
              <option value="incoming">Incoming</option>
            </select>
          </div>
          {goods.map((good, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg flex flex-col gap-4">
              <div>
                <label htmlFor={`name-${index}`} className="block text-gray-700 text-sm font-semibold mb-2">
                  Good Name
                </label>
                <select
                  id={`name-${index}`}
                  className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={good.name}
                  onChange={(e) => handleGoodChange(index, 'name', e.target.value)}
                >
                  <option value="">Select a good</option>
                  {goodOptions.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`numberOfItems-${index}`} className="block text-gray-700 text-sm font-semibold mb-2">
                  Number of Items
                </label>
                <input
                  type="number"
                  id={`numberOfItems-${index}`}
                  className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Enter number of items"
                  value={good.numberOfItems}
                  onChange={(e) => handleGoodChange(index, 'numberOfItems', e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveGood(index)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Remove Good
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddGood}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Good
          </button>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
