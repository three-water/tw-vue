import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Survey = resolve => require(['../components/user/Survey'], resolve)
const NewsList = resolve => require(['../components/news/NewsList'], resolve)
const NewsDetail = resolve => require(['../components/news/NewsDetail'], resolve)
const MeetingDetail = resolve => require(['../components/meeting/MeetingDetail'], resolve)
const NutritionStatistics = resolve => require(['../components/nutritionStatistics/nutritionStatistics'], resolve)
const ClinicalExam = resolve => require(['../components/nutritionStatistics/clinicalExam'], resolve)
const Lottery = resolve => require(['../components/lottery/lottery'], resolve)
const BindDoctor = resolve => require(['../components/patient/BindDoctor'], resolve)
const MealReview = resolve => require(['../components/meal/MealReview'], resolve)
const MealType = resolve => require(['../components/meal/MealType'], resolve)
const FoodList = resolve => require(['../components/meal/FoodList'], resolve)

const MyDoctor = resolve => require(['../components/doctor/MyDoctor'], resolve)
// 理想体重
const Gauge = resolve => require(['../components/gauge/gauge'], resolve)
const WeightResult = resolve => require(['../components/gauge/weightResult'], resolve)

const PrivacyPolicy = resolve => require(['../components/user/PrivacyPolicy'], resolve)
const VideoTerms = resolve => require(['../components/user/VideoTerms'], resolve)
const Help = resolve => require(['../components/user/Help'], resolve)
const PointRule = resolve => require(['../components/user/PointRule'], resolve)
const Oauth = resolve => require(['../components/user/Oauth'], resolve)

let routes = [
  { name: 'Survey', path: '/survey', component: Survey },
  { name: 'MeetingDetail', path: '/meeting-detail', component: MeetingDetail },
  { name: 'NewsList', path: '/news-list', component: NewsList },
  { name: 'NewsDetail', path: '/news-detail', component: NewsDetail },
  // 营养统计
  { name: 'NutritionStatistics', path: '/nutrition-statistics', component: NutritionStatistics },
  { name: 'ClinicalExam', path: '/clinical-exam', component: ClinicalExam },
  // 抽奖列表
  { name: 'Lottery', path: '/lottery', component: Lottery },
  // 填写信息
  { name: 'BindDoctor', path: '/bind-doctor', component: BindDoctor },
  // 膳食
  {name: 'MealReview', path: '/meal-review', component: MealReview},
  {name: 'MealType', path: '/meal-type', component: MealType},
  {name: 'FoodList', path: '/food-list', component: FoodList},
  // 我的医生
  { name: 'MyDoctor', path: '/my-doctor', component: MyDoctor },
  /**
   * 理想体重 /gauge/1
   * BMI /gauge/2
   * 微营养评定法（MNA-SF） 3
   * 微营养评定法（MNA）10
   * 成人营养不良通用筛查工具 MUST-SF 13
   * NUTRIC-Score 14
   * 病人营养状况主观评估表 PG-SGA 15
   * 营养不良的评估 16
   * 住院患者营养风险筛查NRS-2002 17
   * 总能量需求 18
   * 不同疾病能量需求 19
   * 不同手术或创伤时的全天能量消耗 20
   * 总蛋白需求 21
   * 不同疾病蛋白需求 22
   * 基础能量消耗 23
   * 膳食调查摄入能量及蛋白质计算 24
   */
  { name: 'Gauge', path: '/gauge/:id', component: Gauge },
  { name: 'WeightResult', path: '/weight-result', component: WeightResult },
  { name: 'PrivacyPolicy', path: '/privacy-policy', component: PrivacyPolicy },
  { name: 'VideoTerms', path: '/video-terms', component: VideoTerms },
  { name: 'Help', path: '/help', component: Help },
  { name: 'PointRule', path: '/point-rule', component: PointRule },
  { name: 'Oauth', path: '/', component: Oauth, query: { ignorerouter: '' } }
]

let router = new Router({
  routes: routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // 取出地址中的token，存储到本地
  if (to.query.token) {
    Vue.lsetItem(to.query.token, Vue.TOKEN_KEY)
  }

  // 将非授权回调页，存储于session，在登录授权时，做重定向
  if (to.path.indexOf('code') === -1) {
    Vue.lsetItem(to, Vue.REDIRECT_URL_KEY)
  }

  if (to.name === 'BindDoctor') {
    let userId = to.query.userId
    Vue.lsetItem(userId, 'userId')
    let openId = Vue.lgetItem(Vue.WECHAT_OPEN_ID_KEY)
    if (!openId) {
      router.push({name: 'Oauth'})
      return
    }
  }

  // 拦截需要医生的那几个页面
  let authRouters = ['FoodList', 'MealReview', 'MealType']
  if (authRouters.indexOf(to.name) !== -1) {
    // 没有医生信息，则提示绑定医生
    let doctorInfo = Vue.lgetItem(Vue.DOCTOR_INFO_KEY)
    if (!doctorInfo) {
      alert('请联系客服，先绑定医生，再进行下一步操作！')
    } else {
      // 如果有医生信息，则判断是否有openId，如果没有，则跳转到授权页
      let openId = Vue.lgetItem(Vue.WECHAT_OPEN_ID_KEY)
      console.log(11)
      if (!openId) {
        console.log(22)
        router.push({name: 'Oauth'})
      } else {
        console.log(33)
        next()
      }
    }
    console.log(39)
    return
  }

  // 其他页面则正常跳转
  next()
})

export default router
