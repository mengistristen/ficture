<script>
  import { user } from '../stores.js'
</script>

<header>
  <img src="logo-512.png" alt="ficture logo" />
  <p><strong>Ficture</strong></p>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/maps?username={$user.username}">Maps</a></li>
    </ul>
  </nav>
</header>

<style>
  header img {
    height: 40px;
    margin: 10px;
    margin-left: 40px;
  }

  header {
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    box-shadow: 0 0 25px 0 black;
  }

  header * {
    display: inline;
  }

  header li {
    margin: 20px;
  }

  header li a {
    text-decoration: none;
  }
</style>
