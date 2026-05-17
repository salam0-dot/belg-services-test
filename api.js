const sb = supabase.createClient(window.env.URL, window.env.KEY);

const API = {
    async getProfile(userId) {
        try {
            const { data, error } = await sb
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error("getProfile error:", error);
            return null;
        }
    },

    async updateProfile(userId, updateData) {
        try {
            const { data, error } = await sb
                .from('profiles')
                .update(updateData)
                .eq('id', userId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error("updateProfile error:", error);
            return false;
        }
    },

    async getGallery(userId) {
        try {
            const { data, error } = await sb
                .from('work_gallery')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error("getGallery error:", error);
            return [];
        }
    },

    async uploadWork(userId, imageUrl, title) {
        try {
            const { data, error } = await sb
                .from('work_gallery')
                .insert([{ user_id: userId, image_url: imageUrl, title: title }]);
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error("uploadWork error:", error);
            throw error;
        }
    },

    async deleteWork(photoId, userId) {
        try {
            const { error } = await sb
                .from('work_gallery')
                .delete()
                .eq('id', photoId)
                .eq('user_id', userId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error("deleteWork error:", error);
            return false;
        }
    },

    async getAchievements(userId) {
        try {
            const { data, error } = await sb
                .from('achievements')
                .select('*')
                .eq('user_id', userId);
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error("getAchievements error:", error);
            return [];
        }
    },

    async addAchievement(userId, title, description) {
        try {
            const { data, error } = await sb
                .from('achievements')
                .insert([{ user_id: userId, title: title, description: description }]);
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error("addAchievement error:", error);
            throw error;
        }
    }
};

window.API = API;
