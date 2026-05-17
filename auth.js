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
            const { error: profileError } = await supabaseClient.from('profiles').insert({
                id: data.user.id,
                full_name: fullName,
                email: email,
                role: role,
                created_at: new Date()
            });
            
            if (profileError) {
                console.error("Profile insert error:", profileError);
            }
        }
        return data;
    },

    async signIn(email, password) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    },

    async signOut() {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    },

    async getUser() {
        const stored = localStorage.getItem('user');
        if (stored) {
            return JSON.parse(stored);
        }
        
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    }
};

window.Auth = Auth;
