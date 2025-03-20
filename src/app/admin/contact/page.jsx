'use client';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '@/app/compnant/loading/page';
import moment from 'moment';
import { getAuthToken } from '@/app/utils/page';
import { useRouter } from "next/navigation"; 
import Nav2 from '@/app/compnant/nav2/page';
const ContactLeads = () => {
  const Token = getAuthToken();
  const router = useRouter();
  if (!Token) {
    router.push("/admin/login");
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');



  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/contacts`,{
        headers: { Authorization: `Bearer ${Token}` },
      });
      if (!response.ok) throw new Error('Failed to load contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        },

        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update lead status');
      
      // Refresh the contact list after successful update
      await fetchContacts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format('DD/MM/YYYY') : '-';
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="min-h-screen bg-white text-black ">
      <Nav2 />
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Contact Leads</h1>

      {/* Filter Section */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'active' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Active
        </button>
      </div>

      {/* Contact Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Topic</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter((contact) => filterStatus === 'all' || contact.status === filterStatus)
              .map((contact) => (
                <tr key={contact._id} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-center">
                    {`${contact.firstName || ''} ${contact.lastName || ''}`}
                  </td>
                  <td className="px-4 py-2 text-center">{contact.companyName || '-'}</td>
                  <td className="px-4 py-2 text-center">{contact.email || '-'}</td>
                  <td className="px-4 py-2 text-center">{contact.topic || '-'}</td>
                  <td className="px-4 py-2 relative group">
                    <span className="truncate max-w-[200px] block">{contact.message || '-'}</span>
                    <div className="absolute bottom-0 left-0 bg-white border border-gray-300 rounded p-2 max-w-sm invisible group-hover:visible">
                      {contact.message || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-2">{formatDate(contact.createdAt)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        contact.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : contact.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {contact.status?.charAt(0)?.toUpperCase() + contact.status?.slice(1) || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-1 py-1">
                    {contact.status === 'pending' && (
                      <button
                        onClick={() => updateLeadStatus(contact._id, 'active')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactLeads;