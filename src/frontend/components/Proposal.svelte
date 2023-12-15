<script>
  export let post;
  
  const getSafeProperty = (obj, key) => obj && obj.hasOwnProperty(key) ? obj[key] : 'Unknown';
  
  console.log(post); 
</script>

<div class="post-preview">
  <h2>{post[0]}</h2>
  <p>Creator: {getSafeProperty(post[1], 'creator')}</p>
  <p>Change website text to: {getSafeProperty(post[1], 'manifest')}</p>
  <p>
    Yes: {post[1].voteYes}, No: {post[1].voteNo} 
  </p>
  Total Vote: {post[1].voteYes+ post[1].voteNo}
</div>

<style>
  .post-preview {
    border: 1px solid white;
    border-radius: 10px;
    margin-bottom: 2vmin;
    padding: 2vmin;
  }
  h2 {
    color: black;
  }

  p {
    color: black;
  }
</style>