const supabaseClient = supabase.createClient(window.env.URL, window.env.KEY);

const Auth = {
    async signUp(email, password, fullName, role) {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: role
                }
            }
        });
        
        if (error) throw error;

        if (data.user) {
            await supabaseClient.from('profiles').insert([
                { 
                    id: data.user.id, 
                    full_name: fullName, 
                    email: email, 
                    role: role 
                }
            ]);
        }
        return data;
    },

    async signIn(email, password) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    },

    async signOut() {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        window.location.href = 'login.html';
    },

    async getUser() {
        const { data: { user } } = await supabaseClient.auth.getUser();
        return user;
    }
};

window.Auth = Auth;
