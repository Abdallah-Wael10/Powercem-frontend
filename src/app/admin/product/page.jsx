'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav2 from '@/app/compnant/nav2/page';
import { ProductsContext } from '@/app/context/ProductContext';
import { useContext } from 'react';
import { getAuthToken } from '@/app/utils/page';
const ProductDashboard = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const Token = getAuthToken();
    
    const { Products ,loading , setProducts } = useContext(ProductsContext)

    // State for Products

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [editingProduct, setEditingProduct] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        applicationTitle: '',
        applicationDescription: '',
        sustainabilityTitle: '',
        sustainabilityDescription: '',
        benefitTitle1: '',
        benefitDescription1: '',
        benefitTitle2: '',
        benefitDescription2: '',
        benefitTitle3: '',
        benefitDescription3: '',
        mainImage: null,
        detailsImage: null,
        productImage: null,
        applicationImage: null,
        sustainabilityImage: null,
        benefitImage1: null,
        benefitImage2: null,
        benefitImage3: null,
    });

  

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file uploads
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    // Open modal in add mode
    const openAddModal = () => {
        setFormData({
            name: '',
            title: '',
            description: '',
            applicationTitle: '',
            applicationDescription: '',
            sustainabilityTitle: '',
            sustainabilityDescription: '',
            benefitTitle1: '',
            benefitDescription1: '',
            benefitTitle2: '',
            benefitDescription2: '',
            benefitTitle3: '',
            benefitDescription3: '',
            mainImage: null,
            detailsImage: null,
            productImage: null,
            applicationImage: null,
            sustainabilityImage: null,
            benefitImage1: null,
            benefitImage2: null,
            benefitImage3: null,
        });
        setModalMode('add');
        setIsModalOpen(true);
    };

    // Open modal in edit mode
    const openEditModal = (product) => {
        setFormData({
            name: product.name || '',
            title: product.title || '',
            description: product.description || '',
            applicationTitle: product.applicationTitle || '',
            applicationDescription: product.applicationDescription || '',
            sustainabilityTitle: product.sustainabilityTitle || '',
            sustainabilityDescription: product.sustainabilityDescription || '',
            benefitTitle1: product.benefitTitle1 || '',
            benefitDescription1: product.benefitDescription1 || '',
            benefitTitle2: product.benefitTitle2 || '',
            benefitDescription2: product.benefitDescription2 || '',
            benefitTitle3: product.benefitTitle3 || '',
            benefitDescription3: product.benefitDescription3 || '',
            mainImage: null,
            detailsImage: null,
            productImage: null,
            applicationImage: null,
            sustainabilityImage: null,
            benefitImage1: null,
            benefitImage2: null,
            benefitImage3: null,
        });
        setEditingProduct(product);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    // Save product (add or edit)
    const saveProduct = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key.endsWith('Image') && formData[key]) {
                formDataObj.append(key, formData[key]);
            } else if (formData[key] !== null && formData[key] !== '') {
                formDataObj.append(key, formData[key]);
            }
        });

        try {
            let response;
            if (modalMode === 'add') {
                response = await fetch(`${baseUrl}/api/Products`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${Token}`,
                       
                    },
                    body: formDataObj,
                });
            } else if (modalMode === 'edit') {
                response = await fetch(`${baseUrl}/api/Products/${editingProduct._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${Token}`,
                    },
                    body: formDataObj,
                });
            }

            if (!response.ok) throw new Error('Failed to save product');
            const updatedProduct = await response.json();

            // Update local state
            if (modalMode === 'add') {
                setProducts((prevProducts) => [...prevProducts, updatedProduct]);
            } else if (modalMode === 'edit') {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === editingProduct._id ? updatedProduct : product
                    )
                );
            }

            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    // Delete product
    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`${baseUrl}/api/Products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to delete product');

            // Update local state
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 bg-white  min-h-[900px] text-black">
            {/* Navbar */}
            <Nav2 />

            {/* Add Button */}
            <button
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
                onClick={openAddModal}
            >
                Add Product
            </button>

            {/* Loading Spinner */}
            {loading && <div>Loading...</div>}

            {/* Product List */}
            {!loading && (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Product Image</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map((product) => (
                            <tr key={product._id} className="odd:bg-white even:bg-gray-100">
                                <td className="p-2 border">{product.name}</td>
                                <td className="p-2 border flex justify-center items-center">
                                    <Image
                                        src={`${baseUrl}/${product.productImage}`}
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                                        onClick={() => openEditModal(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded w-96 overflow-y-auto max-h-[80vh]">
                        <h2 className="text-lg font-bold mb-4">
                            {modalMode === 'add' ? 'Add Product' : 'Edit Product'}
                        </h2>
                        <form onSubmit={saveProduct}>
                            {/* Input Fields */}
                            <div className="mb-2">
                                <label className="block mb-1">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                ></textarea>
                            </div>

                            {/* Application Section */}
                            <div className="mb-2">
                                <label className="block mb-1">Application Title:</label>
                                <input
                                    type="text"
                                    name="applicationTitle"
                                    value={formData.applicationTitle}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Application Description:</label>
                                <textarea
                                    name="applicationDescription"
                                    value={formData.applicationDescription}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Application Image:</label>
                                <input
                                    type="file"
                                    name="applicationImage"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    required={modalMode === 'add'}
                                />
                            </div>

                            {/* Sustainability Section */}
                            <div className="mb-2">
                                <label className="block mb-1">Sustainability Title:</label>
                                <input
                                    type="text"
                                    name="sustainabilityTitle"
                                    value={formData.sustainabilityTitle}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Sustainability Description:</label>
                                <textarea
                                    name="sustainabilityDescription"
                                    value={formData.sustainabilityDescription}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Sustainability Image:</label>
                                <input
                                    type="file"
                                    name="sustainabilityImage"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    required={modalMode === 'add'}
                                />
                            </div>

                            {/* Benefit Sections */}
                            <div className="mb-2">
                                <label className="block mb-1">Benefit Title 1:</label>
                                <input
                                    type="text"
                                    name="benefitTitle1"
                                    value={formData.benefitTitle1}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Benefit Description 1:</label>
                                <textarea
                                    name="benefitDescription1"
                                    value={formData.benefitDescription1}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Benefit Image 1:</label>
                                <input
                                    type="file"
                                    name="benefitImage1"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    required={modalMode === 'add'}
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block mb-1">Benefit Title 2:</label>
                                <input
                                    type="text"
                                    name="benefitTitle2"
                                    value={formData.benefitTitle2}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Benefit Description 2:</label>
                                <textarea
                                    name="benefitDescription2"
                                    value={formData.benefitDescription2}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Benefit Image 2:</label>
                                <input
                                    type="file"
                                    name="benefitImage2"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    required={modalMode === 'add'}
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block mb-1">Benefit Title 3:</label>
                                <input
                                    type="text"
                                    name="benefitTitle3"
                                    value={formData.benefitTitle3}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Benefit Description 3:</label>
                                <textarea
                                    name="benefitDescription3"
                                    value={formData.benefitDescription3}
                                    onChange={handleInputChange}
                                    className="w-full border p-1"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Benefit Image 3:</label>
                                <input
                                    type="file"
                                    name="benefitImage3"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    required={modalMode === 'add'}
                                />
                            </div>

                            {/* Image Uploads */}
                            <div className="mb-2">
                                <label className="block mb-1">Main Image:</label>
                                <input
                                    type="file"
                                    name="mainImage"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    required={modalMode === 'add'}

                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Details Image:</label>
                                <input
                                    type="file"
                                    name="detailsImage"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    required={modalMode === 'add'}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Product Image:</label>
                                <input
                                    type="file"
                                    name="productImage"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    required={modalMode === 'add'}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>      
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDashboard;