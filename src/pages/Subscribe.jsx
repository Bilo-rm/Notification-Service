import { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://nzsuh0mopa.execute-api.us-east-1.amazonaws.com/prod/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Successfully subscribed! Please check your email to confirm.');
        setEmail('');
        setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
      } else {
        setError(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setError('Error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-2xl border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Subscribe to Updates</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isLoading}
            placeholder="Enter your email"
          />
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <span className="mr-2">Subscribing...</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      {message && (
        <div className="mt-6 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default Subscribe;