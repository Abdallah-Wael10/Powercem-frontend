'use client';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '@/app/compnant/loading/page';
import Image from 'next/image';
import { getAuthToken } from '@/app/utils/page';
import { useRouter } from "next/navigation"; 
import Nav2 from '@/app/compnant/nav2/page';
const ProjectDashboard = () => {
    const Token = getAuthToken();
    const router = useRouter();
    if (!Token) {
      router.push("/admin/login");
    }
  const [projects, setProjects] = useState([]);
  const [clientsWorld, setClientsWorld] = useState([]);
  const [clientsEgypt, setClientsEgypt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState({ type: '', item: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, type: '', id: null });
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/projects`);
      if (!response.ok) throw new Error('Failed to load projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Clients (World)
  const fetchClientsWorld = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/clients/world`);
      if (!response.ok) throw new Error('Failed to load clients (world)');
      const data = await response.json();
      setClientsWorld(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Clients (Egypt)
  const fetchClientsEgypt = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/clients/egypt`);
      if (!response.ok) throw new Error('Failed to load clients (Egypt)');
      const data = await response.json();
      setClientsEgypt(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Create Item
  const createItem = async (type, formData) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/${type}`, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${Token}` },

      });
      if (!response.ok) throw new Error(`Failed to create ${type}`);
      const createdItem = await response.json();
      if (type === 'projects') setProjects([...projects, createdItem]);
      else if (type === 'clients/world') setClientsWorld([...clientsWorld, createdItem]);
      else if (type === 'clients/egypt') setClientsEgypt([...clientsEgypt, createdItem]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowModal({ type: '', item: null });
    }
  };

  // Update Item
  const updateItem = async (type, id, formData) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/${type}/${id}`, {
        method: 'PATCH',
        body: formData,
        headers: { Authorization: `Bearer ${Token}` },
      });
      if (!response.ok) throw new Error(`Failed to update ${type}`);
      const updatedData = await response.json();
      if (type === 'projects') setProjects(projects.map((p) => (p._id === id ? updatedData : p)));
      else if (type === 'clients/world')
        setClientsWorld(clientsWorld.map((c) => (c._id === id ? updatedData : c)));
      else if (type === 'clients/egypt')
        setClientsEgypt(clientsEgypt.map((c) => (c._id === id ? updatedData : c)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowModal({ type: '', item: null });
    }
  };

  // Delete Item
  const deleteItem = async (type, id) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/${type}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${Token}` },
      });
      if (!response.ok) throw new Error(`Failed to delete ${type}`);
      if (type === 'projects') setProjects(projects.filter((p) => p._id !== id));
      else if (type === 'clients/world') setClientsWorld(clientsWorld.filter((c) => c._id !== id));
      else if (type === 'clients/egypt') setClientsEgypt(clientsEgypt.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setDeleteModal({ open: false, type: '', id: null });
    }
  };

  // Add Extra Image to Project
  const addExtraImage = async (projectId, formData) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/projects/${projectId}/add-extra-image`, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${Token}` },

      });
      if (!response.ok) throw new Error('Failed to add extra image');
      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p._id === projectId ? updatedProject : p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update Extra Image in Project
  const updateExtraImage = async (projectId, imageIndex, formData) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/projects/${projectId}/update-extra-image/${imageIndex}`, {
        method: 'PUT',
        body: formData,
        headers: { Authorization: `Bearer ${Token}` },

      });
      if (!response.ok) throw new Error('Failed to update extra image');
      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p._id === projectId ? updatedProject : p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Extra Image from Project
  const deleteExtraImage = async (projectId, imageIndex) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/projects/${projectId}/delete-extra-image/${imageIndex}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${Token}` },

      });
      if (!response.ok) throw new Error('Failed to delete extra image');
      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p._id === projectId ? updatedProject : p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      await Promise.all([fetchProjects(), fetchClientsWorld(), fetchClientsEgypt()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="min-h-screen bg-white text-black ">
      <Nav2/>
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Project Dashboard</h1>

      {/* Projects Section */}
      <section className="mb-12 px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-gray-700">
          Projects{' '}
          <button
            onClick={() => openModal('projects')}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Add Project
          </button>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded-lg shadow-md relative">
              <Image
                src={`${baseUrl}/${project.mainImage}`}
                alt={project.title}
                width={200}
                height={200}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.owner}</p>
              <p className="text-sm text-gray-600">{project.soilType}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.extraImages.map((img, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={`${baseUrl}/${img}`}
                      alt={`Extra Image ${index}`}
                      width={50}
                      height={50}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded p-1 cursor-pointer" onClick={() => deleteExtraImage(project._id, index)}>
                      X
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => openModal('projects', project)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal('projects', project._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients (World) Section */}
      <section className="mb-12 px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-gray-700">
          Clients (World){' '}
          <button
            onClick={() => openModal('clients/world')}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Add Client
          </button>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {clientsWorld.map((client) => (
            <div key={client._id} className="bg-white p-4 rounded-lg shadow-md relative">
              <Image
                src={`${baseUrl}/${client.image}`}
                alt="Client"
                width={100}
                height={100}
                className="w-full h-20 object-contain"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => openModal('clients/world', client)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal('clients/world', client._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients (Egypt) Section */}
      <section className="mb-12 px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-gray-700">
          Clients (Egypt){' '}
          <button
            onClick={() => openModal('clients/egypt')}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Add Client
          </button>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {clientsEgypt.map((client) => (
            <div key={client._id} className="bg-white p-4 rounded-lg shadow-md relative">
              <Image
                src={`${baseUrl}/${client.image}`}
                alt="Client"
                width={100}
                height={100}
                className="w-full h-20 object-contain"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => openModal('clients/egypt', client)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal('clients/egypt', client._id)}
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
              {showModal.type === 'projects' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={showModal.item?.title || ''}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Owner:</label>
                    <input
                      type="text"
                      name="owner"
                      defaultValue={showModal.item?.owner || ''}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Soil Type:</label>
                    <input
                      type="text"
                      name="soilType"
                      defaultValue={showModal.item?.soilType || ''}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Main Image:
                </label>
                <input
                  type="file"
                  name={showModal.type === 'projects' ? 'mainImage' : 'image'}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {showModal.type === 'projects' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Extra Images:
                  </label>
                  <input
                    type="file"
                    name="extraImages"
                    multiple
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              )}
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
  );
};

export default ProjectDashboard;