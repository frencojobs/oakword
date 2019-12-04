<script>
  import { getParameterByName, changeURL } from './helpers'
  import ResultBox from './components/ResultBox.svelte'
  import Search from './components/Search.svelte'
  import ActivityIndicator from './components/ActivityIndicator.svelte'
  let data = []
  let default_val = ''

  async function getData(word) {
    const res = await fetch(`https://api.oakword.tech/word/${word}`)
    const json = await res.json()

    if (res.ok) {
      return json
    } else {
      throw new Error(json)
    }
  }
  function searchHandler(e) {
    let word = e.target.value
    data = getData(word)
    changeURL(word)
  }
  if (getParameterByName('q')) {
    searchHandler({ target: { value: getParameterByName('q') } })
    default_val = getParameterByName('q') || ''
  }
</script>

<style>
  .app {
    min-height: 100vh;
    background: var(--primary-color);
  }
  .main {
    padding: 1rem;
  }
  .title {
    color: var(--dark-color);
  }
  @media (min-width: 961px) {
    .main {
      display: flex;
    }
    .left,
    .right {
      width: 50%;
    }
    .title {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
    }
    .left {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      align-items: center;
    }
    .left > div {
      width: 90%;
      margin: auto;
    }
    .right {
      background: var(--light-color);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 1rem;
      overflow-y: scroll;
    }
  }
</style>

<div class="app">
  <div class="main">
    <div class="left">
      <div>
        <h1 class="title">Oakword Dictionary.</h1>
        <Search value={default_val} {searchHandler} />
        <br />
      </div>
    </div>
    <div class="right">
      {#await data}
        <ActivityIndicator />
      {:then data}
        {#each data as item}
          <ResultBox {item} />
          <br />
        {/each}
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </div>
  </div>
</div>
