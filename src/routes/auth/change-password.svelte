<script>
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'
  import { user } from '../../stores.js'

  const passwords = {
    PreviousPassword: '',
    ProposedPassword: ''
  }

  const validators = [
    (obj) => !!obj.PreviousPassword && !!obj.ProposedPassword,
    (obj) => obj.PreviousPassword !== obj.ProposedPassword
  ]

  onMount(() => {
    if (!$user.access_token || !$user.refresh_token) goto('/')
  })

  const updatePassword = async () => {
    console.log('updating')
    const res = await fetch('/auth/change-password.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        AccessToken: $user.access_token,
        PreviousPassword: passwords.PreviousPassword,
        ProposedPassword: passwords.ProposedPassword
      })
    })
    console.log('fetched')
    if (res.status === 200) goto('/')
  }

  $: canSubmit = validators.every((validator) => validator(passwords))
</script>

<svelte:head><title>Ficture | Update Password</title></svelte:head>

<form class="paper auth-form" on:submit|preventDefault={updatePassword}>
  <div style="text-align: center">
    <img src="logo-512.png" alt="ficture logo" height="100" width="100" />
  </div>
  <h1>Update Password</h1>
  <input
    class="input"
    type="password"
    bind:value={passwords.PreviousPassword}
    placeholder="Old Password"
  />
  <input
    class="input"
    type="password"
    bind:value={passwords.ProposedPassword}
    placeholder="New Password"
  />
  {#if canSubmit}
    <input class="button" type="submit" value="Update Password" />
  {:else}
    <button class="button" disabled>Update Password</button>
  {/if}
</form>
