<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    
    let mounted = false;
    let stars = [];
    
    onMount(() => {
        mounted = true;
        stars = Array.from({ length: 50 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 3
        }));
    });
    
    const errorMessages = {
        404: "This page went on vacation and forgot to leave a forwarding address!",
        500: "Our servers are having an existential crisis right now.",
        403: "This page is playing hard to get.",
        default: "Well, this is awkward..."
    };
    
    const getErrorMessage = (status) => {
        return errorMessages[status] || errorMessages.default;
    };
</script>

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
    <div class="text-center z-10 p-8 max-w-2xl transition-all duration-700 ease-out {mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
        <div class="text-8xl md:text-9xl font-black mb-4 text-white drop-shadow-2xl">
            <span class="glitch inline-block" data-text="{$page.status}">{$page.status}</span>
        </div>
        
        <div class="w-48 md:w-56 mx-auto mb-8">
            <svg viewBox="0 0 200 200" class="floating w-full h-full">
                <!-- Helmet -->
                <circle cx="100" cy="80" r="35" fill="#e8f4f8" opacity="0.9"/>
                <circle cx="100" cy="80" r="28" fill="#1a1a2e"/>
                <ellipse cx="100" cy="78" rx="18" ry="22" fill="#4a90e2" opacity="0.6"/>
                
                <!-- Body -->
                <ellipse cx="100" cy="130" rx="30" ry="35" fill="#f8f9fa"/>
                <rect x="85" y="110" width="30" height="15" fill="#e74c3c" rx="3"/>
                
                <!-- Arms -->
                <ellipse cx="70" cy="125" rx="8" ry="25" fill="#f8f9fa" transform="rotate(-30 70 125)"/>
                <ellipse cx="130" cy="125" rx="8" ry="25" fill="#f8f9fa" transform="rotate(30 130 125)"/>
                
                <!-- Legs -->
                <ellipse cx="90" cy="165" rx="8" ry="20" fill="#f8f9fa"/>
                <ellipse cx="110" cy="165" rx="8" ry="20" fill="#f8f9fa"/>
                
                <!-- Boots -->
                <ellipse cx="90" cy="182" rx="10" ry="8" fill="#e74c3c"/>
                <ellipse cx="110" cy="182" rx="10" ry="8" fill="#e74c3c"/>
            </svg>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Houston, We Have a Problem!
        </h1>
        
        <p class="text-xl md:text-2xl text-white/95 mb-2 font-medium">
            {getErrorMessage($page.status)}
        </p>
        
        <p class="text-base md:text-lg text-white/80 mb-8 italic">
            {$page.error?.message || 'Something unexpected happened'}
        </p>
        
        <div class="flex flex-col md:flex-row gap-4 justify-center items-stretch md:items-center">
            <a 
                href="/" 
                class="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold bg-white text-purple-600 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Back to Earth
            </a>
            <button 
                on:click={() => window.location.reload()}
                class="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold bg-white/20 backdrop-blur-md text-white border-2 border-white/30 rounded-full shadow-lg hover:bg-white/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Try Again
            </button>
        </div>
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
    
    .glitch {
        animation: glitch 3s infinite;
    }
    
    @keyframes glitch {
        0%, 90%, 100% { transform: translate(0); }
        91% { transform: translate(-2px, 2px); }
        93% { transform: translate(2px, -2px); }
        95% { transform: translate(-2px, -2px); }
    }
    
    .floating {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
</style>