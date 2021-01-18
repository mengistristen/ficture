<script>
  import { goto } from '@sapper/app'

  const newUser = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  }

  const submit = async () => {
    try {
      const res = await fetch('/auth/register.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      if (res.status === 201) {
        goto('/auth/login')
      }
    } catch (err) {
      console.log(err)
    }
  }
</script>

<form class="paper auth-form" on:submit|preventDefault={submit}>
  <div style="text-align: center">
    <img src="logo-192.png" alt="ficture logo" height="100" width="100" />
  </div>
  <h1>Sign Up</h1>
  <input
    class="input"
    bind:value={newUser.username}
    name="username"
    placeholder="Username"
  />
  <input
    class="input"
    bind:value={newUser.email}
    name="email"
    placeholder="Email"
  />
  <input
    class="input"
    type="password"
    bind:value={newUser.password}
    name="password"
    placeholder="Password"
  />
  <input
    class="input"
    type="password"
    bind:value={newUser.confirmPassword}
    name="confirmPassword"
    placeholder="Confirm Password"
  />
  <input class="button" type="submit" value="Sign Up" />
  <p>Already have an account? <a href="/auth/login">Sign in!</a></p>
</form>
