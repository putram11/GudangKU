import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWarehouse } from 'react-icons/fa'; // Changing icon to a more relevant one

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); 

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/');
  };

  return (
    <header className="bg-gray-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaWarehouse size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold tracking-wide">GudangKu</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex justify-end">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="text-lg font-semibold hover:text-blue-300 transition-colors">
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <>
                {userRole === 'Admin' && (
                  <>
                    <li>
                      <Link to="/create-user" className="text-lg font-semibold hover:text-blue-300 transition-colors">
                        Create User
                      </Link>
                    </li>
                    <li>
                      <Link to="/logs" className="text-lg font-semibold hover:text-blue-300 transition-colors">
                        Logs
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <li>
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Login Now
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
