import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';

const SubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        fetchStats();
        fetchSubscriptions();
    }, [filter, currentPage]);

    const fetchStats = async () => {
        try {
            const response = await apiService.getSubscriptionStats();
            if (response?.data) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await apiService.getAllSubscriptions(filter, currentPage, pageSize);
            if (response?.data) {
                setSubscriptions(response.data.subscriptions || []);
                setTotalPages(response.data.totalPages || 1);
            }
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchSubscriptions();
            return;
        }

        try {
            setLoading(true);
            const response = await apiService.searchSubscriptions(searchQuery);
            if (response?.data) {
                setSubscriptions(Array.isArray(response.data) ? response.data : []);
            }
        } catch (error) {
            console.error('Error searching subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const configs = {
            active: 'bg-green-100 text-green-700',
            canceled: 'bg-red-100 text-red-700',
            past_due: 'bg-yellow-100 text-yellow-700',
            trialing: 'bg-blue-100 text-blue-700',
            default: 'bg-gray-100 text-gray-700'
        };
        const className = configs[status?.toLowerCase()] || configs.default;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
                {status || 'Unknown'}
            </span>
        );
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscriptions Management</h1>
                <p className="text-gray-600">Manage and monitor all user subscriptions</p>
            </div>

            {/* Statistics Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">Total Subscriptions</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalSubscriptions}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-100">
                        <p className="text-sm text-green-700 mb-1">Active</p>
                        <p className="text-3xl font-bold text-green-600">{stats.activeSubscriptions}</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 shadow-sm border border-purple-100">
                        <p className="text-sm text-purple-700 mb-1">MRR</p>
                        <p className="text-3xl font-bold text-purple-600">${stats.monthlyRecurringRevenue.toFixed(2)}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
                        <p className="text-sm text-blue-700 mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold text-blue-600">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            )}

            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                        <select
                            value={filter}
                            onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="all">All Subscriptions</option>
                            <option value="active">Active</option>
                            <option value="canceled">Canceled</option>
                            <option value="past_due">Past Due</option>
                            <option value="trialing">Trialing</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Search by email or name..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                    </div>
                ) : subscriptions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No subscriptions found
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Plan</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Period End</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {subscriptions.map((sub) => (
                                        <tr key={sub.subscriptionId} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{sub.userName || 'N/A'}</p>
                                                    <p className="text-sm text-gray-500">{sub.userEmail}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{sub.planName}</td>
                                            <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                ${sub.amount?.toFixed(2)} {sub.currency?.toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(sub.createdOn).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                                <p className="text-sm text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SubscriptionsPage;
