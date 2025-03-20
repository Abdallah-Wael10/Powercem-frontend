"use client";

import React, { useState, useContext } from 'react';
import Nav2 from '@/app/compnant/nav2/page';
import { AboutUsContext } from '@/app/context/aboutUsContext';
import { getAuthToken } from '@/app/utils/page';
const AboutUsAdmin = () => {
  const { aboutUsData, loading: contextLoading, error: contextError, refreshAboutUs } = useContext(AboutUsContext);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // Local loading for mutations
  const [error, setError] = useState(null); // Local error for mutations
  const Token = getAuthToken();
  
  // Securely fetch base URL from environment variables
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const API_URL = `${baseUrl}/api/aboutus`;
  
  // Common headers configuration with token
  const getHeaders = () => ({
    Authorization: `Bearer ${Token}`
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
  
    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        body: data,
        headers: getHeaders()
      });
  
      if (!response.ok) throw new Error(`Failed to save: ${response.statusText}`);
  
      resetForm();
      refreshAboutUs(); // Use context's refresh method
    } catch (err) {
      setError(err.message || 'Error saving data');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle edit
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData(item);
  };
  
  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
  
        if (!response.ok) throw new Error(`Failed to delete: ${response.statusText}`);
        refreshAboutUs(); // Use context's refresh method
      } catch (err) {
        setError(err.message || 'Error deleting entry');
        console.error('Delete error:', err);
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({});
    setEditingId(null);
  };
  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <Nav2 />
      <h1 className="text-3xl font-bold mb-6 text-center">About Us Dashboard</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        {/* Section 1 */}
        <h1 className="text-2xl font-bold mb-4">Section 1</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              placeholder="Title for Section 1"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              placeholder="Description for Section 1"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          {/* Product 1 */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Product 1</h1>
            <input
              type="text"
              name="productName1"
              value={formData.productName1 || ''}
              onChange={handleInputChange}
              placeholder="Name for Product 1"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="productTitle1"
              value={formData.productTitle1 || ''}
              onChange={handleInputChange}
              placeholder="Title for Product 1"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="productDescription1"
              value={formData.productDescription1 || ''}
              onChange={handleInputChange}
              placeholder="Description for Product 1"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type="file"
                name="productImage1"
                onChange={handleFileChange}
                className="w-full p-2"
                accept="image/*"
                required={!editingId}
              />
              <span className="text-sm text-gray-500">Image for Product 1</span>
            </div>
            <div className="relative">
              <input
                type="file"
                name="image1"
                onChange={handleFileChange}
                className="w-full p-2"
                accept="image/*"
                required={!editingId}
              />
              <span className="text-sm text-gray-500">Use Client Image for Product 1</span>
            </div>
          </div>

          {/* Product 2 */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Product 2</h1>
            <input
              type="text"
              name="productName2"
              value={formData.productName2 || ''}
              onChange={handleInputChange}
              placeholder="Name for Product 2"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="productTitle2"
              value={formData.productTitle2 || ''}
              onChange={handleInputChange}
              placeholder="Title for Product 2"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="productDescription2"
              value={formData.productDescription2 || ''}
              onChange={handleInputChange}
              placeholder="Description for Product 2"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type="file"
                name="productImage2"
                onChange={handleFileChange}
                className="w-full p-2"
                accept="image/*"
                required={!editingId}
              />
              <span className="text-sm text-gray-500">Image for Product 2</span>
            </div>
            <div className="relative">
              <input
                type="file"
                name="image2"
                onChange={handleFileChange}
                className="w-full p-2"
                accept="image/*"
                required={!editingId}
              />
              <span className="text-sm text-gray-500">Use Client Image for Product 2</span>
            </div>
          </div>

          {/* Product 3 */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Product 3</h1>
            <input
              type="text"
              name="productName3"
              value={formData.productName3 || ''}
              onChange={handleInputChange}
              placeholder="Name for Product 3"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="productTitle3"
              value={formData.productTitle3 || ''}
              onChange={handleInputChange}
              placeholder="Title for Product 3"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="productDescription3"
              value={formData.productDescription3 || ''}
              onChange={handleInputChange}
              placeholder="Description for Product 3"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type="file"
                name="productImage3"
                onChange={handleFileChange}
                className="w-full p-2"
                accept="image/*"
                required={!editingId}
              />
              <span className="text-sm text-gray-500">Image for Product 3</span>
            </div>
            <div className="relative">
              <input
                type="file"
                name="image3"
                onChange={handleFileChange}
                className="w-full p-2"
                accept="image/*"
                required={!editingId}
              />
              <span className="text-sm text-gray-500">Use Client Image for Product 3</span>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <h1 className="text-2xl font-bold mt-8 mb-4">Section 2</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input
              type="text"
              name="section2Title"
              value={formData.section2Title || ''}
              onChange={handleInputChange}
              placeholder="Title for Section 2"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="section2Description"
              value={formData.section2Description || ''}
              onChange={handleInputChange}
              placeholder="Description for Section 2"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Section 3</h1>
            <input
              type="text"
              name="section3Name"
              value={formData.section3Name || ''}
              onChange={handleInputChange}
              placeholder="Name for Section 3"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="section3Title"
              value={formData.section3Title || ''}
              onChange={handleInputChange}
              placeholder="Title for Section 3"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="section3Description"
              value={formData.section3Description || ''}
              onChange={handleInputChange}
              placeholder="Description for Section 3"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type="file"
                name="section3Image"
                onChange={handleFileChange}
                className="w-full p-2"
                accept="image/*"
                required={!editingId}
              />
              <span className="text-sm text-gray-500">Use Client Image for Section 3</span>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Section 4</h1>
            <input
              type="text"
              name="section4Title"
              value={formData.section4Title || ''}
              onChange={handleInputChange}
              placeholder="Title for Section 4"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="section4Description"
              value={formData.section4Description || ''}
              onChange={handleInputChange}
              placeholder="Description for Section 4"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type="file"
                name="section4Image"
                onChange={handleFileChange}
                className="w-full p-2"
                accept="image/*"
                required={!editingId}
              />
              <span className="text-sm text-gray-500">Use Client Image for Section 4</span>
            </div>
          </div>
        </div>

        {/* Display local errors (e.g., from mutations) or context errors (e.g., from initial fetch) */}
        {(error || contextError) && (
          <p className="text-red-500 mt-4">{error || contextError}</p>
        )}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading || contextLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List View */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Existing Entries</h1>
        {(loading || contextLoading) && <p>Loading...</p>}
        {!loading && !contextLoading && (!aboutUsData || aboutUsData.length === 0) && <p>No entries found</p>}
        {!loading && !contextLoading && aboutUsData && aboutUsData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {aboutUsData.map(item => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUsAdmin;