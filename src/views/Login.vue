<script setup lang="ts">
  import { ref, reactive, onBeforeMount,onMounted, getCurrentInstance } from 'vue';
  import { GetToken } from '@/api/index';
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from "element-plus";
  import { useSendCode } from "@/utils/hooks";
  import { useUserStore} from '@/stores/store' // 引用 pinia 数据 
  import { useRouter } from 'vue-router';
  const store = useUserStore() // 定义 store 接收
  const router = useRouter();
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    mobile: '',
    checkPassword: '',
  })
  const { send, timer } = useSendCode();
  const submitForm = async (submitForm:object) => {
    const params = JSON.parse(JSON.stringify(submitForm));
    if(!params.mobile||!params.checkPassword){
      ElMessage.error(!params.mobile?'请输入账号':'请输入验证码');
      return;
    }
    const GetTokenParams = reactive({
      UserName:params.mobile.toString(),
      code: params.checkPassword.toString(),
    })
    console.log("submitForm");
    const res = await GetToken('/token/client',JSON.stringify(GetTokenParams));
    if(res.code==0){
      let token = `${res.data.tokenType} ${res.data.accessToken}`;
      // store.accessToken = token;// 调用 store actions 中方法 修改 变量值
      proxy.$operate.setCookie('accessToken',token,7)
      router.push({ path: "HomeView" });
    }
  }
  const getCode = async (mobile: any) => {
    if(!mobile){
      ElMessage({
        message: '请先输入手机号',
        type: 'warning',
      })
      return;
    }
    await send(mobile,'login')
  }
  const topics = ref([])
  const {proxy} = getCurrentInstance() as any;
  const handleLogin = async () => {
    const res = await proxy.$operate.formSex(0)
    console.log(res)
  }
  onBeforeMount(async() => {
  })
  
  onMounted(() => {
    
    
  })
  
</script>

<template>
    <div class="loginPage">
        <div class="login">
          <h2>二郎神后台管理系统</h2>
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              label-width="120px"
              class="demo-ruleForm"
            >
              <div class="table-row">
                <el-form-item label="用户登录" prop="mobile"
                  :rules="[
                    { type: 'number', message: '手机号必须是数字' },
                  ]"
                >
                  <div class="code">
                    <el-input v-model.number="ruleForm.mobile" type="text" autocomplete="off" class="username" />
                    <span class="getCode" @click="getCode(ruleForm.mobile)">{{ timer == 0 ? "发送验证码" : `(${timer})后发送验证码` }}</span>
                  </div>
                </el-form-item>
                <el-form-item label="验证码" prop="checkPassword"
                  :rules="[
                    { type: 'number', message: '验证码必须是数字' },
                  ]"
                >
                  <el-input v-model.number="ruleForm.checkPassword" type="text" autocomplete="off" class="codePassword" />
                </el-form-item>

                <el-form-item>  
                  <el-button type="primary" @click="submitForm(ruleForm)"
                    >立即登录</el-button
                  >
                </el-form-item>
              </div>
              
            </el-form>
          
        </div>
    </div>
</template>

<style scoped lang="less">
  .loginPage{
    background: #1183fb linear-gradient(-90deg, #0a48d1 0%, #1183fb 100%);
    background-color: #1183fb;
    height:100vh;
    display:flex;
    align-items: center;
    justify-content: center;
    .login{
      background: #fff;
      overflow: hidden;
      box-shadow: 0 0 20px 0 rgb(0 0 0 / 10%);
      border-radius: 3px;
      width:600px;
      // padding:20px;
      h2{
        padding: 20px;
        border-bottom: 1px #eee solid;
        font-size: 16px;
        font-weight:bold;
        margin: 0;
        line-height: 32px;
      }
      .table-row{
        width:100%;
        margin: 20px 0;
        display: table;
        table-layout: fixed;
        .code{
          display:flex;
          justify-items: flex-start;
          align-items: center;
          .username{
            width:300px;
          }
          .getCode{
            padding: 0;
            font-size: 15px;
            cursor: pointer;
            text-align: center;
            display:block;
            width:150px;
            // margin-left:10%;
          }
        }
        .codePassword{
          width:300px;
        }
      }
      
    }
  }
</style>