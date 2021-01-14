<script>
	import { goto } from "@sapper/app";
	import { user } from "../stores.js";
	import { onMount } from "svelte";

	onMount(async () => {
		if (!$user.access_token || !$user.refresh_token) {
			let res = await fetch("/user");

			if (res.status === 200) {
				const oldTokens = await res.json();
				res = await fetch("/auth/login", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: { refresh_token: oldTokens.refresh_token },
				});

				console.log(await res.json());
			} else goto("/auth/login");
		}
	});
</script>

<h1>Home</h1>
