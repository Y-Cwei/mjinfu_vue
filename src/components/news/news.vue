<template>
  <div>
    请求的url链接为：<p class="url">news/<span>{{$route.params.id}}</span></p>
    <p class="content">{{content}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  created () {
    this.$http.get(`/news/${this.$route.params.id}`)
      .then(response => {
        if (response.body.status === '1') {
          const data = response.body.data
          this.content = data.content
        } else {
          alert('网络错误')
        }
      }, () => {
        alert('请求失败')
      })
  }
}
</script>
<style lang="less">
p.url{
  font-size: 0.4rem;
  color: #000;
  span{
    color: red;
  }
}
p.content{
  font-size: 0.3rem;
  color: #d2a36b;
  margin-top: 0.4rem;
}
</style>
