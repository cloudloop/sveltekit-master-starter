<script>
    import { getContext } from 'svelte';
    import { goto } from '$app/navigation';
    import { signOut } from 'firebase/auth';
    import { auth } from '$lib/firebase';
    import TopNav from '$lib/TopNav.svelte';
    
    const user = getContext('user');
    
    async function handleLogout() {
        try {
            await signOut(auth);
            await goto('/admin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
</script>

{#if !$user}
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div class="text-center">
            <h2 class="text-2xl font-bold text-slate-800 mb-4">Authorization Required</h2>
            <p class="text-slate-600 mb-6">You must be logged in to access the admin area.</p>
        </div>
    </div>
{:else}
    <div class="drawer drawer-end">
        <input id="user-drawer" type="checkbox" class="drawer-toggle" />
        
        <div class="drawer-content">
            <TopNav />
            <slot />
        </div>
        
        <!-- Drawer Side -->
        <div class="drawer-side z-50">
            <label for="user-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="bg-white min-h-full w-80 flex flex-col">
                <!-- Drawer Header -->
                <div class="bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-xl font-bold">User Profile</h2>
                        <label for="user-drawer" class="btn btn-ghost btn-sm btn-circle text-white hover:bg-white/20">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </label>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="avatar placeholder">
                            <div class="bg-white/20 text-white rounded-full w-16 ring-2 ring-white/30">
                                <span class="text-2xl font-bold">
                                    {$user?.email?.charAt(0).toUpperCase() || 'A'}
                                </span>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-lg truncate">{$user?.email?.split('@')[0] || 'Admin'}</p>
                            <p class="text-sm text-purple-100 truncate">{$user?.email || 'admin@example.com'}</p>
                            <div class="mt-2">
                                {#if $user?.emailVerified}
                                    <span class="badge badge-success badge-sm">Verified</span>
                                {:else}
                                    <span class="badge badge-warning badge-sm">Not Verified</span>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Drawer Menu -->
                <ul class="menu p-4 flex-1 text-slate-700">
                    <li class="menu-title">
                        <span class="text-slate-600">Account</span>
                    </li>
                    <li>
                        <a href="/admin/profile" class="flex items-center gap-3">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <span>My Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="/admin/settings" class="flex items-center gap-3">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                            </svg>
                            <span>Settings</span>
                        </a>
                    </li>
                    
                    <li class="menu-title mt-4">
                        <span class="text-slate-600">Information</span>
                    </li>
                    <li>
                        <div class="flex flex-col gap-1 pointer-events-none opacity-70">
                            <div class="flex items-center gap-2 text-xs">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                </svg>
                                <span class="text-slate-500">Last Sign In:</span>
                            </div>
                            <span class="text-sm text-slate-700 ml-6">
                                {$user?.metadata?.lastSignInTime ? new Date($user.metadata.lastSignInTime).toLocaleString() : 'N/A'}
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-col gap-1 pointer-events-none opacity-70">
                            <div class="flex items-center gap-2 text-xs">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                                <span class="text-slate-500">Member Since:</span>
                            </div>
                            <span class="text-sm text-slate-700 ml-6">
                                {$user?.metadata?.creationTime ? new Date($user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                    </li>
                </ul>
                
                <!-- Drawer Footer -->
                <div class="p-4 border-t border-slate-200">
                    <button 
                        onclick={handleLogout} 
                        class="btn btn-error btn-outline w-full gap-2"
                    >
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}