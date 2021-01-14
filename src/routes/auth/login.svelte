<script>
    import { goto } from "@sapper/app";
    import { user } from "../../stores.js";

    const userInfo = {
        username: "",
        password: "",
    };

    const login = async () => {
        const res = await fetch("/auth/login.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        });

        if (res.status == 201) {
            const tokenData = await res.json();

            $user = tokenData;
            goto("/");
        }
    };
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
</style>

<form on:submit|preventDefault={login}>
    <input bind:value={userInfo.username} />
    <input bind:value={userInfo.password} />
    <input type="submit" value="Login" />
</form>
