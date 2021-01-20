<script>
  import { goto } from '@sapper/app'
  import { user } from '../stores.js'
  import { onMount } from 'svelte'

  onMount(async () => {
    if (!$user.access_token || !$user.refresh_token) {
      let res = await fetch('/user.json')

      if (res.status === 200) {
        const oldTokens = await res.json()

        res = await fetch('/auth/login.json', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: oldTokens.refresh_token }),
        })

        const { access_token } = await res.json()

        $user.access_token = access_token
      } else goto('/auth/login')
    }
  })
</script>

<svelte:head><title>Ficture | Home</title></svelte:head>
<h1>Home</h1>
<a href="/auth/change-password">change password</a>
