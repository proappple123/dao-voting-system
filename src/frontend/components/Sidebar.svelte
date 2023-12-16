<script>
  import { view } from '../stores.js';
  import { canisterId as canisterIdBackend } from '../../declarations/backend/index.js';
  import { createActor as createBackendActor } from '../../declarations/backend';
  import { AuthClient } from '@dfinity/auth-client';
  import { HttpAgent } from '@dfinity/agent';
  import { principal } from '../stores';
  import { daoActor } from '../stores';
  import { onMount } from 'svelte';

  const handleView = () => {
    $view.current = $view.view;
  };
  const handleCreate = () => {
    $view.current = $view.create;
  };
  const handleVote = () => {
    $view.current = $view.vote;
  };
  const handleHome = () => {
    $view.current = $view.home;
  };

  const handleWebpage = () => {
    process.env.DFX_NETWORK === 'ic'
      ? window.open(`https://${canisterId}.raw.icp0.io`, '_blank')
      : window.open(
          `http://localhost:4943/?canisterId=${canisterIdBackend}`,
          '_blank',
        );
  };

  const handleLogin = async () => {
    let authClient = await AuthClient.create();
    const identityProvider =
      process.env.DFX_NETWORK === 'ic'
        ? 'https://identity.ic0.app'
        : `http://127.0.0.1:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;

    await authClient?.login({
      onSuccess: () => {
        resolve();
      },
      identityProvider,
    });
    const identity = authClient.getIdentity();
    const p = identity.getPrincipal().toString();
    principal.set(p);
    const agent = new HttpAgent({ identity });
    const actor = createBackendActor(canisterIdBackend, {
    agent,
    });
    daoActor.set(actor);
  };

  let loginState = false;

  const handleLogout = async () => {
    let authClient = await AuthClient.create();
    await authClient?.logout();
    principal.set(null);
    daoActor.set(null);
  };

  onMount(() => {
  const loginBtn = document.getElementById('login-button');
  const logoutBtn = document.getElementById('logout-button');
  
  if (loginState == true){
    loginBtn.style.display='none';
    logoutBtn.style.display='block';
  } else {
    loginBtn.style.display='block';
    logoutBtn.style.display='none';
  }
});


</script>

<nav>
  <ul>
    <li on:click={() => handleHome()}>🏠 Home</li>
    <li on:click={() => handleView()}>🚀 View</li>
    <li on:click={() => handleCreate()}>⭐️ Create</li>
    <li on:click={() => handleVote()}>🗑 Vote</li>
  </ul>
  <div class="buttons">
    <button on:click={() => handleWebpage()}> Webpage </button>
    <button on:click={() => handleLogin()} class="login-button"> Login </button>
    <button on:click={() => handleLogout()} class="logout-button"> Logout </button>
  </div>
</nav>

<style>
  nav {
    min-height: 100vh;
    background-color: #262626;
    color: #a2b7c4;
    transition: ease-out 200ms;
    width: 20vmin;
    position: relative;
  }

  ul {
    list-style: none;
    padding-left: 1vmin;
    padding-right: 1vmin;
    margin: 0;
    margin-top: 2vmin;
  }

  li {
    width: 100%;
    padding-top: 2vmin;
    padding-bottom: 2vmin;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    font-size: 1em;
    cursor: pointer;
  }

  li:hover {
    background-color: #6e6b6b;
    transition: 300ms;
    transform: scale(1.08);
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
