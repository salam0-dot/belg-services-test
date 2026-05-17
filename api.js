const sb = supabase.createClient(window.env.URL, window.env.KEY);

const API = {
    // ==================== PROFILES ====================
    async getProfile(userId) {
        const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
        if (error) throw error;
        return data;
    },
    async updateProfile(userId, updateData) {
        const { error } = await sb.from('profiles').update(updateData).eq('id', userId);
        if (error) throw error;
        return true;
    },
    async deleteProfile(userId) {
        const { error } = await sb.from('profiles').delete().eq('id', userId);
        if (error) throw error;
        return true;
    },

    // ==================== COMPANIES ====================
    async getCompany(companyId) {
        const { data, error } = await sb.from('companies').select('*').eq('id', companyId).single();
        if (error) return null;
        return data;
    },
    async updateCompany(companyId, updateData) {
        const { error } = await sb.from('companies').update(updateData).eq('id', companyId);
        if (error) throw error;
        return true;
    },
    async deleteCompany(companyId) {
        const { error } = await sb.from('companies').delete().eq('id', companyId);
        if (error) throw error;
        return true;
    },
    async getAllCompanies() {
        const { data, error } = await sb.from('companies').select('*');
        if (error) return [];
        return data;
    },

    // ==================== COMPANY PROJECTS ====================
    async getCompanyProjects(companyId) {
        const { data, error } = await sb.from('company_projects').select('*').eq('company_id', companyId).order('created_at', { ascending: false });
        if (error) return [];
        return data;
    },
    async addCompanyProject(companyId, title, description, status, completionDate) {
        const { error } = await sb.from('company_projects').insert({ company_id: companyId, title: title, description: description, status: status, completion_date: completionDate });
        if (error) throw error;
        return true;
    },
    async updateCompanyProject(projectId, updateData) {
        const { error } = await sb.from('company_projects').update(updateData).eq('id', projectId);
        if (error) throw error;
        return true;
    },
    async deleteCompanyProject(projectId) {
        const { error } = await sb.from('company_projects').delete().eq('id', projectId);
        if (error) throw error;
        return true;
    },

    // ==================== PROJECT MEDIA ====================
    async getProjectMedia(projectId) {
        const { data, error } = await sb.from('project_media').select('*').eq('project_id', projectId);
        if (error) return [];
        return data;
    },
    async addProjectMedia(projectId, mediaUrl, mediaType) {
        const { error } = await sb.from('project_media').insert({ project_id: projectId, media_url: mediaUrl, media_type: mediaType });
        if (error) throw error;
        return true;
    },
    async deleteProjectMedia(mediaId) {
        const { error } = await sb.from('project_media').delete().eq('id', mediaId);
        if (error) throw error;
        return true;
    },

    // ==================== WORKERS ====================
    async getWorker(workerId) {
        const { data, error } = await sb.from('workers').select('*').eq('id', workerId).single();
        if (error) return null;
        return data;
    },
    async updateWorker(workerId, updateData) {
        const { error } = await sb.from('workers').update(updateData).eq('id', workerId);
        if (error) throw error;
        return true;
    },
    async deleteWorker(workerId) {
        const { error } = await sb.from('workers').delete().eq('id', workerId);
        if (error) throw error;
        return true;
    },
    async getAllWorkers() {
        const { data, error } = await sb.from('workers').select('*');
        if (error) return [];
        return data;
    },
    async getAvailableWorkers() {
        const { data, error } = await sb.from('workers').select('*').eq('is_available', true);
        if (error) return [];
        return data;
    },

    // ==================== SKILLS ====================
    async getAllSkills() {
        const { data, error } = await sb.from('skills').select('*');
        if (error) return [];
        return data;
    },
    async addSkill(skillName) {
        const { error } = await sb.from('skills').insert({ name: skillName });
        if (error) throw error;
        return true;
    },

    // ==================== WORKER SKILLS ====================
    async getWorkerSkills(workerId) {
        const { data, error } = await sb.from('worker_skills').select('skill_id').eq('worker_id', workerId);
        if (error) return [];
        return data;
    },
    async addWorkerSkill(workerId, skillId) {
        const { error } = await sb.from('worker_skills').insert({ worker_id: workerId, skill_id: skillId });
        if (error) throw error;
        return true;
    },
    async removeWorkerSkill(workerId, skillId) {
        const { error } = await sb.from('worker_skills').delete().eq('worker_id', workerId).eq('skill_id', skillId);
        if (error) throw error;
        return true;
    },

    // ==================== WORKER PORTFOLIO ====================
    async getWorkerPortfolio(workerId) {
        const { data, error } = await sb.from('worker_portfolio').select('*').eq('worker_id', workerId).order('created_at', { ascending: false });
        if (error) return [];
        return data;
    },
    async addWorkerPortfolio(workerId, title, mediaUrl, mediaType) {
        const { error } = await sb.from('worker_portfolio').insert({ worker_id: workerId, title: title, media_url: mediaUrl, media_type: mediaType });
        if (error) throw error;
        return true;
    },
    async deleteWorkerPortfolio(portfolioId) {
        const { error } = await sb.from('worker_portfolio').delete().eq('id', portfolioId);
        if (error) throw error;
        return true;
    },

    // ==================== WORKER REVIEWS ====================
    async getWorkerReviews(workerId) {
        const { data, error } = await sb.from('worker_reviews').select('*').eq('worker_id', workerId).order('created_at', { ascending: false });
        if (error) return [];
        return data;
    },
    async addWorkerReview(workerId, clientId, rating, comment) {
        const { error } = await sb.from('worker_reviews').insert({ worker_id: workerId, client_id: clientId, rating: rating, comment: comment });
        if (error) throw error;
        return true;
    },

    // ==================== CLIENTS ====================
    async getClient(clientId) {
        const { data, error } = await sb.from('clients').select('*').eq('id', clientId).single();
        if (error) return null;
        return data;
    },
    async updateClient(clientId, updateData) {
        const { error } = await sb.from('clients').update(updateData).eq('id', clientId);
        if (error) throw error;
        return true;
    },
    async deleteClient(clientId) {
        const { error } = await sb.from('clients').delete().eq('id', clientId);
        if (error) throw error;
        return true;
    },

    // ==================== BOOKINGS ====================
    async getBookingsByClient(clientId) {
        const { data, error } = await sb.from('bookings').select('*').eq('client_id', clientId).order('created_at', { ascending: false });
        if (error) return [];
        return data;
    },
    async getBookingsByTarget(targetId, targetType) {
        const { data, error } = await sb.from('bookings').select('*').eq('target_id', targetId).eq('target_type', targetType);
        if (error) return [];
        return data;
    },
    async addBooking(clientId, targetType, targetId, serviceType, price, bookingDate, notes) {
        const { error } = await sb.from('bookings').insert({ client_id: clientId, target_type: targetType, target_id: targetId, service_type: serviceType, price: price, booking_date: bookingDate, notes: notes });
        if (error) throw error;
        return true;
    },
    async updateBookingStatus(bookingId, status) {
        const { error } = await sb.from('bookings').update({ status: status }).eq('id', bookingId);
        if (error) throw error;
        return true;
    },

    // ==================== PAYMENTS ====================
    async getPaymentsByBooking(bookingId) {
        const { data, error } = await sb.from('payments').select('*').eq('booking_id', bookingId);
        if (error) return [];
        return data;
    },
    async addPayment(bookingId, amount, method) {
        const { error } = await sb.from('payments').insert({ booking_id: bookingId, amount: amount, method: method });
        if (error) throw error;
        return true;
    },
    async updatePaymentStatus(paymentId, status, transactionId) {
        const { error } = await sb.from('payments').update({ status: status, transaction_id: transactionId }).eq('id', paymentId);
        if (error) throw error;
        return true;
    },

    // ==================== CONVERSATIONS ====================
    async getConversation(user1Id, user2Id) {
        const { data, error } = await sb.from('conversations').select('*').or(`participant1.eq.${user1Id},participant2.eq.${user1Id}`).single();
        if (error) return null;
        return data;
    },
    async createConversation(user1Id, user2Id) {
        const { data, error } = await sb.from('conversations').insert({ participant1: user1Id, participant2: user2Id }).select();
        if (error) throw error;
        return data;
    },
    async getUserConversations(userId) {
        const { data, error } = await sb.from('conversations').select('*').or(`participant1.eq.${userId},participant2.eq.${userId}`);
        if (error) return [];
        return data;
    },

    // ==================== MESSAGES ====================
    async getMessages(conversationId) {
        const { data, error } = await sb.from('messages').select('*').eq('conversation_id', conversationId).order('created_at', { ascending: true });
        if (error) return [];
        return data;
    },
    async sendMessage(conversationId, senderId, message) {
        const { error } = await sb.from('messages').insert({ conversation_id: conversationId, sender_id: senderId, message: message });
        if (error) throw error;
        return true;
    },
    async markMessageAsRead(messageId) {
        const { error } = await sb.from('messages').update({ is_read: true }).eq('id', messageId);
        if (error) throw error;
        return true;
    },

    // ==================== NOTIFICATIONS ====================
    async getUserNotifications(userId) {
        const { data, error } = await sb.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        if (error) return [];
        return data;
    },
    async addNotification(userId, title, message, type) {
        const { error } = await sb.from('notifications').insert({ user_id: userId, title: title, message: message, type: type });
        if (error) throw error;
        return true;
    },
    async markNotificationAsRead(notificationId) {
        const { error } = await sb.from('notifications').update({ is_read: true }).eq('id', notificationId);
        if (error) throw error;
        return true;
    },

    // ==================== USER SETTINGS ====================
    async getUserSettings(userId) {
        const { data, error } = await sb.from('user_settings').select('*').eq('user_id', userId).single();
        if (error) return null;
        return data;
    },
    async updateUserSettings(userId, updateData) {
        const { error } = await sb.from('user_settings').update(updateData).eq('user_id', userId);
        if (error) throw error;
        return true;
    },
    async createUserSettings(userId) {
        const { error } = await sb.from('user_settings').insert({ user_id: userId });
        if (error) throw error;
        return true;
    },

    // ==================== SERVICES ====================
    async getAllServices() {
        const { data, error } = await sb.from('services').select('*');
        if (error) return [];
        return data;
    },
    async getServicesByCategory(category) {
        const { data, error } = await sb.from('services').select('*').eq('category', category);
        if (error) return [];
        return data;
    }
};

window.API = API;
