<script>
    import { getContext } from 'svelte';
    
    const user = getContext('user');
    
    let { 
        searchQuery = '',
        onSearch = () => {}
    } = $props();
    
    let localSearch = $state(searchQuery);
    
    function handleSearchInput(e) {
        localSearch = e.target.value;
        onSearch(localSearch);
    }
</script>

<!-- Top Navigation Bar ONLY -->
<nav class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo Section -->
            <div class="flex items-center gap-3">
                <div class="w-10 h-10">
                    <svg viewBox="0 0 200 200" class="w-full h-full">
                        <circle cx="100" cy="100" r="80" fill="#8b5cf6" opacity="0.2"/>
                        <circle cx="100" cy="100" r="65" fill="#8b5cf6" opacity="0.4"/>
                        <circle cx="100" cy="100" r="45" fill="#8b5cf6"/>
                        <circle cx="90" cy="90" r="8" fill="white" opacity="0.9"/>
                    </svg>
                </div>
                <div>
                    <h1 class="text-xl font-bold text-slate-800">Admin Console</h1>
                    <p class="text-xs text-slate-500">Command Center</p>
                </div>
            </div>
            
            <!-- Search Bar -->
            <div class="hidden md:flex flex-1 max-w-lg mx-8">
                <div class="relative w-full">
                    <input
                        type="text"
                        value={localSearch}
                        oninput={handleSearchInput}
                        placeholder="Search anything..."
                        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </div>
            </div>
            
            <!-- Right Side Actions -->
            <div class="flex items-center gap-3">
                <!-- Notifications Icon -->
                <button class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <div class="relative">
                        <svg class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                        <span class="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
                    </div>
                </button>
                
                <!-- User Button - Opens Drawer -->
                <label for="user-drawer" class="flex items-center gap-2 px-2 py-1 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
                    <div class="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <span class="text-xs font-semibold">
                            {$user?.email?.charAt(0).toUpperCase() || 'A'}
                        </span>
                    </div>
                    <span class="hidden lg:inline text-sm font-medium text-slate-700">
                        {$user?.email?.split('@')[0] || 'Admin'}
                    </span>
                </label>
            </div>
        </div>
    </div>
</nav>