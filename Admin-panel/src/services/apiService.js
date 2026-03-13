// API Service for Admin Panel Integration
const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
    async makeRequest(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        const token = localStorage.getItem('adminToken');
        const authHeaders = {};
        if (token) {
            authHeaders.Authorization = `Bearer ${token}`;
        }

        const finalOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...authHeaders,
                ...(options.headers || {})
            }
        };

        try {
            const response = await fetch(url, finalOptions);

            if (!response.ok) {
                const contentType = response.headers.get('content-type') || '';
                let errorData;
                if (contentType.includes('application/json')) {
                    errorData = await response.json().catch(() => ({}));
                } else {
                    const text = await response.text();
                    errorData = { message: text };
                }
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                return await response.json();
            } else {
                const text = await response.text();
                try {
                    return JSON.parse(text);
                } catch {
                    return { message: text, data: text };
                }
            }
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    async login(credentials) {
        console.log('Attempting login with:', credentials.email);
        try {
            const response = await this.makeRequest('/Account/login', {
                method: 'POST',
                body: JSON.stringify({
                    Email: credentials.email,
                    Password: credentials.password
                }),
            });

            if (response?.data) {
                const d = response.data;
                const token = d.Token || d.token;
                const userId = d.UserId || d.userId;
                const roleId = d.RoleId || d.roleId;

                // Check if user is actually an admin (Role ID 1 is usually admin)
                if (roleId !== 1) {
                    // In a real app we would check roles here. 
                    // For now, we'll just store and proceed.
                }

                if (token) localStorage.setItem('adminToken', token);
                if (userId) localStorage.setItem('adminUserId', userId);
                localStorage.setItem('adminUser', JSON.stringify(d));
                localStorage.setItem('isAdminAuthenticated', 'true');
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUserId');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('isAdminAuthenticated');
    }

    isAuthenticated() {
        return localStorage.getItem('isAdminAuthenticated') === 'true';
    }

    // ─── Sacred Guide Admin APIs ─────────────────────────────

    async getSacredGuideDashboard() {
        return this.makeRequest('/admin/sacredguides/dashboard');
    }

    async getSacredGuideStatus(id) {
        return this.makeRequest(`/admin/sacredguides/${id}/status`);
    }

    async getSacredGuideWaitlist(id, page = 1, pageSize = 10) {
        return this.makeRequest(`/admin/sacredguides/${id}/waitlist?page=${page}&pageSize=${pageSize}`);
    }

    async launchSacredGuide(id) {
        return this.makeRequest(`/admin/sacredguides/${id}/launch`, { method: 'POST' });
    }

    async notifySacredGuideWaitlist(id) {
        return this.makeRequest(`/admin/sacredguides/${id}/notify-waitlist`, { method: 'POST' });
    }

    async createSacredGuide(data) {
        return this.makeRequest('/admin/sacredguides/create', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateSacredGuide(id, data) {
        return this.makeRequest(`/admin/sacredguides/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteSacredGuide(id) {
        return this.makeRequest(`/admin/sacredguides/${id}`, {
            method: 'DELETE',
        });
    }

    async uploadSacredGuide(formData) {
        const url = `${API_BASE_URL}/admin/sacredguides/upload`;
        const token = localStorage.getItem('adminToken');
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData,
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                // Extract exact error reason from backend response
                const errorMsg = data?.message
                    || data?.errors?.join(', ')
                    || 'Something went wrong. Please check your inputs and try again.';
                throw new Error(errorMsg);
            }

            return data;
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to the server. Please check your internet connection.');
            }
            console.error('Upload Error:', error);
            throw error;
        }
    }

    async getAllSacredGuides() {
        return this.makeRequest('/admin/sacredguides/list');
    }

    // ─── User Management Admin APIs ──────────────────────────

    async getUserStats() {
        return this.makeRequest('/admin/users/stats');
    }

    async getUsers(params = {}) {
        const { search, status, page = 1, pageSize = 10 } = params;
        let query = `?page=${page}&pageSize=${pageSize}`;
        if (search) query += `&search=${encodeURIComponent(search)}`;
        if (status && status !== 'All Status') query += `&status=${encodeURIComponent(status)}`;

        return this.makeRequest(`/admin/users${query}`);
    }

    async updateUserStatus(userId, status) {
        return this.makeRequest(`/admin/users/${userId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ Status: status }),
        });
    }

    // Fetch user details for profile modal
    async getUserDetails(userId) {
        return this.makeRequest(`/admin/users/${userId}`);
    }

    // ─── Content Moderation Admin APIs ───────────────────────

    async getContentStats() {
        return this.makeRequest('/admin/content/stats');
    }

    async getContentPosts(params = {}) {
        const { search = '', statusFilter = 'All Posts', page = 1, pageSize = 10 } = params;
        const queryParams = new URLSearchParams({
            search,
            statusFilter,
            page: page.toString(),
            pageSize: pageSize.toString()
        });

        return this.makeRequest(`/admin/content/posts?${queryParams}`);
    }

    async updatePostStatus(postId, action) {
        return this.makeRequest(`/admin/content/posts/${postId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ action }),
        });
    }

    async getPostReports(postId) {
        return this.makeRequest(`/admin/content/posts/${postId}/reports`);
    }

    // ─── Reports Management Admin APIs ───────────────────────

    async getReportStats() {
        return this.makeRequest('/admin/reports/stats');
    }

    async getReports(params = {}) {
        const { type = 'All', status = 'All', page = 1, pageSize = 10 } = params;
        const queryParams = new URLSearchParams({
            type,
            status,
            page: page.toString(),
            pageSize: pageSize.toString()
        });

        return this.makeRequest(`/admin/reports?${queryParams}`);
    }

    async getReportDetails(reportId) {
        return this.makeRequest(`/admin/reports/${reportId}`);
    }

    async updateReportStatus(reportId, status) {
        return this.makeRequest(`/admin/reports/${reportId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ Status: status }),
        });
    }
}

export default new ApiService();
