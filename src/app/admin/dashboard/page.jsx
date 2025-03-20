'use client';
import LoadingSpinner from '../../compnant/loading/page';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { getAuthToken } from '@/app/utils/page';
import { useRouter } from "next/navigation"; 
import Nav2 from '@/app/compnant/nav2/page';

const Dashboard = () => {
    const Token = getAuthToken();
    const router = useRouter();
    if (!Token) {
      router.push("/admin/login");
    }
  const [sliders, setSliders] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true); // For initial data loading
  const [loadingAction, setLoadingAction] = useState(false); // For actions like create/update/delete
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState({ type: '', item: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, type: '', id: null });
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  // Fetch Sliders
  const fetchSliders = async () => {
    try {
      setLoadingAction(true);
      const response = await fetch(`${baseUrl}/api/sliders`);
      if (!response.ok) throw new Error('Failed to load sliders');
      const data = await response.json();
      setSliders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  // Fetch Certifications
  const fetchCertifications = async () => {
    try {
      setLoadingAction(true);
      const response = await fetch(`${baseUrl}/api/certifications`);
      if (!response.ok) throw new Error('Failed to load certifications');
      const data = await response.json();
      setCertifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  // Fetch Partners
  const fetchPartners = async () => {
    try {
      setLoadingAction(true);
      const response = await fetch(`${baseUrl}/api/partners`);
      if (!response.ok) throw new Error('Failed to load partners');
      const data = await response.json();
      setPartners(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  // Create Item
  const createItem = async (type, formData) => {
    try {
      setLoadingAction(true);
      const response = await fetch(`${baseUrl}/api/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        headers:{authorization: `Bearer ${Token}`},

        body: formData,
      });
      if (!response.ok) throw new Error(`Failed to create ${type}`);
      const createdItem = await response.json();
      if (type === 'sliders') setSliders([...sliders, createdItem]);
      else if (type === 'certifications') setCertifications([...certifications, createdItem]);
      else if (type === 'partners') setPartners([...partners, createdItem]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
      setShowModal({ type: '', item: null }); // Close modal after creation
    }
  };

  // Update Item
  const updateItem = async (type, id, formData) => {
    try {
      setLoadingAction(true);
      const response = await fetch(`${baseUrl}/api/${type}/${id}`, {
        method: 'PATCH',
        body: formData,
        headers: { 'Content-Type': 'application/json' },
        headers:{authorization: `Bearer ${Token}`},
      });
      if (!response.ok) throw new Error(`Failed to update ${type}`);
      const updatedData = await response.json();
      if (type === 'sliders') setSliders(sliders.map((s) => (s._id === id ? updatedData : s)));
      else if (type === 'certifications')
        setCertifications(certifications.map((c) => (c._id === id ? updatedData : c)));
      else if (type === 'partners') setPartners(partners.map((p) => (p._id === id ? updatedData : p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
      setShowModal({ type: '', item: null }); // Close modal after update
    }
  };

  // Delete Item
  const deleteItem = async (type, id) => {
    try {
      setLoadingAction(true);
      const response = await fetch(`${baseUrl}/api/${type}/${id}`, {
        method: 'DELETE',
        headers:{authorization: `Bearer ${Token}`},
      });
      if (!response.ok) throw new Error(`Failed to delete ${type}`);
      if (type === 'sliders') setSliders(sliders.filter((s) => s._id !== id));
      else if (type === 'certifications') setCertifications(certifications.filter((c) => c._id !== id));
      else if (type === 'partners') setPartners(partners.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
      setDeleteModal({ open: false, type: '', id: null }); // Close delete modal after deletion
    }
  };

  // Open Modal
  const openModal = (type, item = null) => {
    setShowModal({ type, item });
  };

  // Close Modal
  const closeModal = () => {
    setShowModal({ type: '', item: null });
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (type, id) => {
    setDeleteModal({ open: true, type, id });
  };

  // Close Delete Confirmation Modal
  const closeDeleteModal = () => {
    setDeleteModal({ open: false, type: '', id: null });
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchSliders(), fetchCertifications(), fetchPartners()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading || loadingAction) return <LoadingSpinner />;

  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav2/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Home Dashboard</h1>

        {/* Slider Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-gray-700">
            Sliders{' '}
            <button
              onClick={() => openModal('sliders')}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Slider
            </button>
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="h-96 bg-gray-100 rounded-lg"
          >
            {sliders.map((slider) => (
              <SwiperSlide key={slider._id} className="relative">
                <Image
                  src={`${baseUrl}/${slider.image}`}
                  alt={slider.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <h3 className="text-white text-xl font-semibold">{slider.title}</h3>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => openModal('sliders', slider)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal('sliders', slider._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Certifications Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-gray-700">
            Certifications{' '}
            <button
              onClick={() => openModal('certifications')}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Certification
            </button>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {certifications.map((certification) => (
              <div key={certification._id} className="bg-white p-4 rounded-lg shadow-md relative">
                <Image
                  src={`${baseUrl}/${certification.image}`}
                  alt="Certification"
                  width={200}
                  height={200}
                  className="w-full h-32 object-contain"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => openModal('certifications', certification)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal('certifications', certification._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-gray-700">
            Partners{' '}
            <button
              onClick={() => openModal('partners')}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Partner
            </button>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {partners.map((partner) => (
              <div key={partner._id} className="bg-white p-4 rounded-lg shadow-md relative">
                <Image
                  src={`${baseUrl}/${partner.image}`}
                  alt="Partner"
                  width={200}
                  height={200}
                  className="w-full h-32 object-contain"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => openModal('partners', partner)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal('partners', partner._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {showModal.type && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4 text-gray-700">
                {showModal.item ? 'Update' : 'Create'} {showModal.type}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  if (showModal.item) {
                    updateItem(showModal.type, showModal.item._id, formData);
                  } else {
                    createItem(showModal.type, formData);
                  }
                }}
              >
                {showModal.type === 'sliders' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={showModal.item?.title || ''}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Upload Image:</label>
                  <input
                    type="file"
                    name="image"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4 text-gray-700">
                Are you sure you want to delete this item?
              </h3>
              <div className="flex justify-end">
                <button
                  onClick={closeDeleteModal}
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteItem(deleteModal.type, deleteModal.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;