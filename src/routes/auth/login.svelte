<script>
  import { goto } from '@sapper/app'
  import { user } from '../../stores.js'

  const userInfo = {
    username: '',
    password: '',
  }

  const login = async () => {
    const res = await fetch('/auth/login.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    })

    if (res.status == 201) {
      const tokenData = await res.json()

      $user = tokenData
      console.log($user)
      goto('/')
    }
  }
</script>

<form on:submit|preventDefault={login}>
  <div class="input-container">
    <label for="username">Username: </label>
    <input bind:value={userInfo.username} name="username" />
  </div>
  <div class="input-container">
    <label for="password">Password: </label>
    <input type="password" bind:value={userInfo.password} name="password" />
  </div>
  <input type="submit" value="Login" />
  <p>Don't have an account? <a href="/auth/register">Register!</a></p>
</form>

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
