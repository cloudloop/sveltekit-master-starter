<script>
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { writable } from "svelte/store";
    import { setContext } from "svelte";
    import {auth} from "$lib/firebase";

    import Login from '$lib/Login.svelte';

    // Create a writable store to hold the user state
    export const user = writable(null);

    // Set up auth listener immediately, not waiting for mount
    onAuthStateChanged(auth, (firebaseUser) => {
        user.set(firebaseUser);
        // console.log(firebaseUser 
        //     ? `User is authenticated: ${firebaseUser.uid}`
        //     : 'User is not authenticated'
        // );
    });

    // Set context immediately
    setContext("user", user);

</script>

{#if !$user}
    <Login />
{:else}
    <!-- This slot renders child routes like /admin/[user]/+page.svelte -->
    <div data-theme="mytheme">
        <slot />
    </div>
{/if}