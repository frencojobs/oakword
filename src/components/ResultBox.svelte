<script>
  import { tts } from '../helpers'
  let data = {
    word: '',
    type: '',
    def: ''
  }
  export let item = data
</script>

<style>
  .result-box {
    background: var(--light-color);
    padding: 1rem;
  }
  .result-box--bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .result-box--word {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .result-box--type {
    display: block;
    margin-bottom: 1rem;
  }
  .volume-icon--wrapper {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
  }
  .volume-icon--wrapper:hover {
    background: var(--primary-color);
  }
  .volume-icon {
    width: 2rem;
  }
  @media (min-width: 961px) {
    .result-box {
      background: var(--primary-color);
    }
    .volume-icon--wrapper:hover {
      background: var(--light-color);
    }
  }
</style>

<div class="result-box">
  <div class="result-box--bar">
    <span class="result-box--word">{item.word}</span>
    <div
      class="volume-icon--wrapper"
      on:click={() => {
        tts(item.word)
      }}>
      <img src="/volume.svg" alt="volume" class="volume-icon" />
    </div>
  </div>
  <span class="result-box--type">{item.type}</span>
  <span>{item.def}</span>
</div>
