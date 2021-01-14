<script>
    import { goto } from "@sapper/app";

    const newUser = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
    };

    const submit = async () => {
        try {
            const res = await fetch("/auth/register.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            if (res.status === 201) {
                goto("/auth/login");
            }
        } catch (err) {
            console.log(err);
        }
    };
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        width: 40%;
        margin: 0 auto;
    }

    .input-container {
        display: flex;
        justify-content: space-between;
        margin: 1em 0;
    }
</style>

<form on:submit|preventDefault={submit}>
    <div class="input-container">
        <label for="username">Username: </label>
        <input bind:value={newUser.username} name="username" />
    </div>
    <div class="input-container">
        <label for="email">Email: </label>
        <input bind:value={newUser.email} name="email" />
    </div>
    <div class="input-container">
        <label for="password">Password: </label>
        <input type="password" bind:value={newUser.password} name="password" />
    </div>
    <div class="input-container">
        <label for="confirmPassword">Confirm Password: </label>
        <input
            type="password"
            bind:value={newUser.confirmPassword}
            name="confirmPassword" />
    </div>
    <input type="submit" value="Sign Up" />
    <p>Already have an account? <a href="/auth/login">Sign in!</a></p>
</form>
