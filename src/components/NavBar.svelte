<script>
  import { user } from '../stores.js'
  import { goto } from '@sapper/app'

  const logout = async () => {
    $user = {}
    await fetch('/auth/logout.json')
    goto('/auth/login')
  }
</script>

<header>
  <div class="container">
    <img src="logo-512.png" alt="ficture logo" />
    <div class="controls">
      <nav>
        <p><strong><a href="/">Ficture</a></strong></p>
        <p><a href="/maps?username={$user.username}">Maps</a></p>
      </nav>
      {#if $user.username}
        <div class="user-controls">
          <a href="/auth/change-password" id="change-password"
            >Change Password</a
          >
          <button class="button" on:click={logout}>Logout</button>
        </div>
      {:else}
        <div class="user-controls">
          <a href="/auth/login">Log In</a>
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  header img {
    height: 40px;
    margin: 10px;
    margin-left: 40px;
  }

  header {
    background-color: white;
    box-shadow: 0 0 5px 0 black;
    z-index: 1;
  }

  header > div {
    max-width: 1500px;
    margin: auto;
    display: flex;
  }

  nav {
    display: flex;
    align-items: baseline;
    gap: 1em;
  }

  nav strong {
    font-size: larger;
  }

  nav a {
    text-decoration: none;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    padding: 0 1em;
  }

  .user-controls {
    display: flex;
    align-items: baseline;
    gap: 1em;
  }

  @media only screen and (max-width: 600px) {
    #change-password {
      display: none;
    }
  }
</style>
