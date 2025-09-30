<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase';
    
    let mounted = $state(false);
    let stars = $state([]);
    let email = $state('');
    let password = $state('');
    let loading = $state(false);
    let error = $state('');
    
    onMount(() => {
        mounted = true;
        stars = Array.from({ length: 50 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 3
        }));
    });
    
    async function handleSubmit(e) {
        e.preventDefault();
        error = '';
        loading = true;
        
        try {
            // Firebase authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Wait for onAuthStateChanged to fire and update the store
            // This is the key - wait for the user store to be populated
            await new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        unsubscribe();
                        resolve();
                    }
                });
            });
            
            // Extract username from email (everything before @)
            const username = email.split('@')[0];
            
                // Wait for auth state to propagate
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Redirect to admin dashboard
            await goto(`/admin/${username}`, { replaceState: true });
            
        } catch (err) {
            // Handle Firebase auth errors
            switch (err.code) {
                case 'auth/invalid-email':
                    error = 'Invalid email address';
                    break;
                case 'auth/user-disabled':
                    error = 'This account has been disabled';
                    break;
                case 'auth/user-not-found':
                    error = 'No account found with this email';
                    break;
                case 'auth/wrong-password':
                    error = 'Incorrect password';
                    break;
                case 'auth/invalid-credential':
                    error = 'Invalid email or password';
                    break;
                case 'auth/too-many-requests':
                    error = 'Too many failed attempts. Please try again later';
                    break;
                default:
                    error = err.message || 'Login failed. Please try again';
            }
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Admin Login</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-600 via-purple-800 to-pink-500 flex items-center justify-center relative overflow-hidden">
    <!-- Animated background stars -->
    <div class="absolute inset-0 pointer-events-none">
        {#each stars as star}
            <div 
                class="star absolute bg-white rounded-full"
                style="left: {star.x}%; top: {star.y}%; width: {star.size}px; height: {star.size}px; animation-delay: {star.delay}s;"
            />
        {/each}
    </div>
    
    <!-- Main content -->
    <div class="w-full max-w-md px-6 z-10 transition-all duration-700 ease-out {mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
        <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <!-- Logo/Icon -->
            <div class="w-20 h-20 mx-auto mb-6">
                <svg viewBox="0 0 200 200" class="floating w-full h-full">
                    <!-- Simplified astronaut helmet as logo -->
                    <circle cx="100" cy="100" r="80" fill="#e8f4f8" opacity="0.9"/>
                    <circle cx="100" cy="100" r="65" fill="#1a1a2e"/>
                    <ellipse cx="100" cy="95" rx="40" ry="50" fill="#4a90e2" opacity="0.7"/>
                    <circle cx="85" cy="85" r="8" fill="white" opacity="0.8"/>
                </svg>
            </div>
            
            <h1 class="text-3xl font-bold text-white text-center mb-2">
                Admin Console
            </h1>
            <h2 class="text-xl font-semibold text-white/90 text-center mb-2">
                Authorization Required
            </h2>
            <p class="text-white/70 text-center mb-8">
                You must be logged in to access the admin area
            </p>
            
            {#if error}
                <div class="bg-red-500/20 border border-red-400/50 text-white rounded-xl p-4 mb-6 backdrop-blur-sm">
                    <div class="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <span class="font-medium">{error}</span>
                    </div>
                </div>
            {/if}
            
            <form onsubmit={handleSubmit} class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-medium text-white/90 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        bind:value={email}
                        autocomplete="username"
                        required
                        placeholder="admin@example.com"
                        class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    />
                </div>
                
                <div>
                    <label for="password" class="block text-sm font-medium text-white/90 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        bind:value={password}
                        autocomplete="current-password"
                        required
                        placeholder="••••••••"
                        class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    />
                </div>
                
                <div class="flex items-center justify-between text-sm">
                    <label class="flex items-center gap-2 text-white/80 cursor-pointer">
                        <input type="checkbox" class="w-4 h-4 rounded border-white/30 bg-white/10 text-purple-600 focus:ring-2 focus:ring-white/50" />
                        Remember me
                    </label>
                    <a href="/forgot-password" class="text-white/80 hover:text-white transition-colors">
                        Forgot password?
                    </a>
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    class="w-full py-3.5 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                    {#if loading}
                        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Authenticating...
                    {:else}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                            <polyline points="10 17 15 12 10 7"/>
                            <line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                        Launch Mission
                    {/if}
                </button>
            </form>
            
            <div class="mt-6 text-center">
                <a href="/" class="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Back to home
                </a>
            </div>
        </div>
        
        <p class="text-white/50 text-xs text-center mt-6">
            Authorized personnel only. All access is monitored.
        </p>
    </div>
</div>

<style>
    .star {
        animation: twinkle 3s infinite;
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
    
    .floating {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
</style>