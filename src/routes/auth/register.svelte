<script>
    import { goto } from "@sapper/app";

    const newUser = {
        username: "",
        password: "",
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

<input bind:value={newUser.username} />
<input type="password" bind:value={newUser.password} />
<input bind:value={newUser.email} />
<button on:click={submit}>Sign Up</button>
