<script>
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'
  import { user } from '../../stores.js'

  onMount(() => {
    if (!$user.access_token || !$user.refresh_token) goto('/')
  })
</script>
