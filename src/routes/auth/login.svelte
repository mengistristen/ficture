<script>
  import { goto } from '@sapper/app'
  import { user } from '../../stores.js'

  const userInfo = {
    username: '',
    password: ''
  }

  const login = async () => {
    const res = await fetch('/auth/login.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    })

    if (res.status == 201) {
      const tokenData = await res.json()

      $user = tokenData
      goto('/')
    }
  }

  $: canSubmit = !!userInfo.username && !!userInfo.password
</script>

<svelte:head><title>Ficture | Login</title></svelte:head>

<form class="paper auth-form" on:submit|preventDefault={login}>
  <div style="text-align: center">
    <img src="logo-512.png" alt="ficture logo" height="100" width="100" />
  </div>
  <h1>Login</h1>
  <input
    class="input"
    bind:value={userInfo.username}
    name="username"
    placeholder="Username"
  />
  <input
    class="input"
    type="password"
    bind:value={userInfo.password}
    name="password"
    placeholder="Password"
  />
  {#if canSubmit}
    <input class="button" type="submit" value="Login" />
  {:else}
    <button class="button" disabled>Login</button>
  {/if}
  <p>Don't have an account? <a href="/auth/register">Register!</a></p>
</form>

<style>
  form {
    max-width: 300px;
    margin: 1em auto;
  }
</style>
