<script>
    /** @type {import('./$types').PageProps} */
    let { data } = $props();

    import { getContext } from "svelte";


        // Get the user context from the layout
    const user = getContext("user");


</script>

<h2>Admin Page</h2>
<p>Welcome, {user ? user.email : 'Guest'}!</p>
