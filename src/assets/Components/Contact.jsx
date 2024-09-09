import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Thank you for your message. We will get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen mx-auto overflow-hidden bg-gray-900 text-white flex flex-col">
      <div className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Contact Us
            </h1>
            <p className="mt-2 text-xl text-gray-300">
              We'd love to hear from you! Drop us a message.
            </p>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold text-gray-200">Other Ways to Reach Us</h2>
            <div className="mt-2 space-y-1">
              <p className="text-gray-300">
                <span className="font-semibold">Email:</span> support@movieapp.com
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Phone:</span> +1 (123) 456-7890
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Address:</span> 123 Movie Street, Hollywood, CA 90001
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          &larr; Back to previous page
        </button>
      </div>
    </div>
  );
};

export default ContactUs;