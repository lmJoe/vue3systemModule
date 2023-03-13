<script setup lang="ts">
  import { GetModules } from '@/api';
import router from '@/router';
  import { onBeforeMount, onMounted, ref } from 'vue';
  let modelItems = ref([])
  const GetModule = async() => {
    // GetModules接口为项目后台类型数据
    const res = await GetModules('/SubSystem/GetModules');
    modelItems.value = res.data;
    console.log("res",modelItems)
  }
  const toLink = (id:number) => {
    console.log("1");
    switch (id) {
      case 17:
        const url = router.resolve({
          path: '/appSurvey',
        });
        // 打开新窗口
        window.open(url.href);
        break;
    
      default:
        break;
    }
  }
  onBeforeMount(async() => {
    await GetModule();
  })
  
  onMounted(async () => {
    
  })
</script>

<template>
  <div class="main">
    <!-- <div class="">
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="">
        liming 
      </div>
    </div> -->
    <ul class="modelList">
      <el-row :gutter="20">
        <el-col :span="6" class="model" v-for="item in modelItems" :key="item.id" @click="toLink(item.id)">
          <el-image :fit="fit" :src="'../public/'+item.moduleIcon"/>
          <div class="modelName">{{ item.moduleTitle }}</div>
        </el-col>
      </el-row>
    </ul>
  </div>
</template>
<style scoped lang="less">
  .main{
    width:100%;
    height:100%;
    background:url("../public/home.jpg") no-repeat center center;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .modelList{
      background:url("../public/listbg.png") no-repeat center center;
      background-size:100%;
      padding:15px;
      width:1254px;
      height:587px;
      display: flex;
      justify-content: center;
      align-items: center;
      .model{
        text-align: center;
        margin:25px 0;
        cursor:pointer;
        .modelName{
          font-size: 21px;
          color: #fff;
          margin-top:1px;
        }
        :hover{
          color: #FFCC00;
        }
      }
    }
  }
</style>
