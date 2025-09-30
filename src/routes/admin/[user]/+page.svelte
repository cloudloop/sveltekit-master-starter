<script>
    import { getContext } from 'svelte';
    import { goto } from '$app/navigation';
    import { signOut } from 'firebase/auth';
    import { auth } from '$lib/firebase';
	import TopNav from '$lib/TopNav.svelte';
    
    // Get user from context
    const user = getContext('user');
    
    let searchQuery = $state('');
    let dropdownOpen = $state(false);
    
    // Format date helper
    function formatDate(timestamp) {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleString();
    }
    
    // Handle logout
    async function handleLogout() {
        try {
            await signOut(auth);
            await goto('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    async function handleSearch(query) {
        searchQuery = query;
        // Implement search logic here if needed
        console.log('Search query:', searchQuery);
    }
    
    // Toggle dropdown
    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }
    
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
        if (!event.target.closest('.dropdown')) {
            dropdownOpen = false;
        }
    }
</script>

<svelte:window onclick={handleClickOutside} />

<svelte:head>
    <title>Admin Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    
    <!-- Main Content Area -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Welcome Section -->
        <div class="mb-8">
            <h2 class="text-3xl font-bold text-slate-800 mb-2">
                Welcome back, {$user?.email?.split('@')[0] || 'Commander'}! 👋
            </h2>
            <p class="text-slate-600">Here's your authentication data and system overview</p>
        </div>
        
       <!-- Stats Overview - Consider extracting to: components/StatsGrid.svelte -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stats shadow-sm bg-white border border-slate-200">
            <div class="stat px-6 py-4">
                <div class="stat-figure text-purple-600">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                </div>
                <div class="stat-title text-slate-600">User ID</div>
                <div class="stat-value text-lg text-slate-800 truncate">{$user?.uid?.substring(0, 12) || 'N/A'}...</div>
                <div class="stat-desc text-slate-500">Unique identifier</div>
            </div>
        </div>
        
        <div class="stats shadow-sm bg-white border border-slate-200">
            <div class="stat px-6 py-4">
                <div class="stat-figure text-green-600">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <div class="stat-title text-slate-600">Email Verified</div>
                <div class="stat-value text-lg text-slate-800">{$user?.emailVerified ? 'Yes' : 'No'}</div>
                <div class="stat-desc text-slate-500">
                    {$user?.emailVerified ? 'Account verified' : 'Verification pending'}
                </div>
            </div>
        </div>
        
        <div class="stats shadow-sm bg-white border border-slate-200">
            <div class="stat px-6 py-4">
                <div class="stat-figure text-blue-600">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                </div>
                <div class="stat-title text-slate-600">Last Sign In</div>
                <div class="stat-value text-sm text-slate-800">
                    {$user?.metadata?.lastSignInTime ? new Date($user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
                </div>
                <div class="stat-desc text-slate-500">
                    {$user?.metadata?.lastSignInTime ? new Date($user.metadata.lastSignInTime).toLocaleTimeString() : 'Unknown'}
                </div>
            </div>
        </div>
        
        <div class="stats shadow-sm bg-white border border-slate-200">
            <div class="stat px-6 py-4">
                <div class="stat-figure text-orange-600">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                </div>
                <div class="stat-title text-slate-600">Account Created</div>
                <div class="stat-value text-sm text-slate-800">
                    {$user?.metadata?.creationTime ? new Date($user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                </div>
                <div class="stat-desc text-slate-500">Registration date</div>
            </div>
        </div>
    </div>

        <!-- User Data Cards - Consider extracting to: components/UserDataCards.svelte -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Account Information Card -->
            <div class="card bg-white shadow-sm border border-slate-200">
                <div class="card-body p-6">
                    <h3 class="card-title text-slate-800 flex items-center gap-2 mb-4">
                        <svg class="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Account Information
                    </h3>
                    <div class="divider my-0 mb-4"></div>
                    <div class="space-y-4">
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">Email:</span>
                            <span class="text-sm text-slate-800 text-right">{$user?.email || 'N/A'}</span>
                        </div>
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">User ID:</span>
                            <span class="text-sm text-slate-800 font-mono text-right break-all">{$user?.uid || 'N/A'}</span>
                        </div>
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">Provider:</span>
                            <span class="text-sm text-slate-800">{$user?.providerData?.[0]?.providerId || 'N/A'}</span>
                        </div>
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">Display Name:</span>
                            <span class="text-sm text-slate-800">{$user?.displayName || 'Not set'}</span>
                        </div>
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">Phone Number:</span>
                            <span class="text-sm text-slate-800">{$user?.phoneNumber || 'Not set'}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Authentication Details Card -->
            <div class="card bg-white shadow-sm border border-slate-200">
                <div class="card-body p-6">
                    <h3 class="card-title text-slate-800 flex items-center gap-2 mb-4">
                        <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Authentication Details
                    </h3>
                    <div class="divider my-0 mb-4"></div>
                    <div class="space-y-4">
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">Account Created:</span>
                            <span class="text-sm text-slate-800 text-right">{formatDate($user?.metadata?.creationTime)}</span>
                        </div>
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">Last Sign In:</span>
                            <span class="text-sm text-slate-800 text-right">{formatDate($user?.metadata?.lastSignInTime)}</span>
                        </div>
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">Email Verified:</span>
                            <span class="text-sm">
                                {#if $user?.emailVerified}
                                    <span class="badge badge-success badge-sm">Verified</span>
                                {:else}
                                    <span class="badge badge-warning badge-sm">Not Verified</span>
                                {/if}
                            </span>
                        </div>
                        <div class="flex justify-between items-start gap-4">
                            <span class="text-sm font-medium text-slate-600">Anonymous:</span>
                            <span class="text-sm">
                                {#if $user?.isAnonymous}
                                    <span class="badge badge-info badge-sm">Yes</span>
                                {:else}
                                    <span class="badge badge-ghost badge-sm">No</span>
                                {/if}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Raw User Data Card (for debugging) -->
            <div class="card bg-white shadow-sm border border-slate-200 lg:col-span-2">
                <div class="card-body p-6">
                    <h3 class="card-title text-slate-800 flex items-center gap-2 mb-4">
                        <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16 18 22 12 16 6"/>
                            <polyline points="8 6 2 12 8 18"/>
                        </svg>
                        Raw User Object (Debug)
                    </h3>
                    <div class="divider my-0 mb-4"></div>
                    <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <pre class="text-sm text-slate-100"><code>{JSON.stringify($user, null, 2)}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    </main> 
</div>

<style>
    /* Custom scrollbar for code block */
    .mockup-code pre {
        max-height: 400px;
        overflow-y: auto;
    }
    
    .mockup-code pre::-webkit-scrollbar {
        width: 8px;
    }
    
    .mockup-code pre::-webkit-scrollbar-track {
        background: #1e293b;
    }
    
    .mockup-code pre::-webkit-scrollbar-thumb {
        background: #475569;
        border-radius: 4px;
    }
    
    .mockup-code pre::-webkit-scrollbar-thumb:hover {
        background: #64748b;
    }
</style>