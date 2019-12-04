<script>
  export let searchHandler = () => {}
  export let value = ''
</script>

<style>
  .searchbar {
    display: flex;
    background: var(--light-color);
    box-shadow: 2px 2px 111px 1px rgba(186, 186, 186, 0.5);
  }
  .icon {
    height: 1.5rem;
    margin: 0.5rem;
  }
  .input {
    width: 100%;
    font-family: var(--display-font);
    color: var(--dark-color);
    font-size: 1.4rem;
    line-height: 1rem;
    border: none;
    margin-right: 0.5rem;
  }
  .input:focus {
    outline: none;
  }
  @media (min-width: 961px) {
    .searchbar {
      width: 90%;
      margin: auto;
    }
  }
</style>

<div class="searchbar">
  <img src="/search.svg" alt="search" class="icon" />
  <input
    type="text"
    class="input"
    placeholder="search word"
    {value}
    on:change={searchHandler} />
</div>
