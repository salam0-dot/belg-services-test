// api.js
const sb = supabase.createClient(window.env.URL, window.env.KEY);

const API = {
    async getProfile(userId) {
        const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
        if (error) throw error;
        return data;
    },

    async updateProfile(userId, updateData) {
        const { data, error } = await sb.from('profiles').update(updateData).eq('id', userId);
        if (error) throw error;
        return true;
    },

    async getGallery(userId) {
        const { data, error } = await sb.from('work_gallery').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async uploadWork(userId, imageUrl, title) {
        const { data, error } = await sb.from('work_gallery').insert([{ user_id: userId, image_url: imageUrl, title: title }]);
        if (error) throw error;
        return data;
    },

    async deleteWork(photoId, userId) {
        const { error } = await sb.from('work_gallery').delete().eq('id', photoId).eq('user_id', userId);
        if (error) throw error;
    },

    async getAchievements(userId) {
        const { data, error } = await sb.from('achievements').select('*').eq('user_id', userId);
        if (error) throw error;
        return data;
    }
};

window.API = API;
