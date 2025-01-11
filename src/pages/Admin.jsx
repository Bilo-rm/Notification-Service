import { useState } from 'react';

const Admin = () => {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    if (!subject.trim()) {
      setError('Subject is required');
      return;
    }
    if (!message.trim()) {
      setError('Message is required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://nzsuh0mopa.execute-api.us-east-1.amazonaws.com/prod/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, subject }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Messages sent successfully!');
        setMessage('');
        setSubject('');
        setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
      } else {
        setError(data.error || 'Failed to send messages. Please try again.');
      }
    } catch (error) {
      setError('Error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-2xl border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Send Broadcast Message</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoading}
            placeholder="Enter subject"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-40 resize-none"
            disabled={isLoading}
            placeholder="Enter your message"
          />
        </div>
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <span className="mr-2">Sending...</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
      {status && (
        <div className="mt-6 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center">
          {status}
        </div>
      )}
    </div>
  );
};

export default Admin;