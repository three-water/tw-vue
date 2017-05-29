# nutrition-app


提供的页面：

- 新闻详情, id为新闻id  
> ${host}/#/news-detail?id=16 

-  新闻列表
> ${host}/#/news-list

- 营养参数统计 
> ${host}/#/nutrition-statistics

- 临床医学统计
> ${host}/#/clinical-exam?patientId=3&clinicalResearchId=1

- 获奖名单
> ${host}/#/lottery

- 会议详情
> ${host}/#/meeting-detail

- 填写信息
> #/info-step1    #/info-step2 

- 我的医生
> #/my-doctor

- 量表

> 理想体重 /gauge/1
> BMI /gauge/2
> 微营养评定法（MNA-SF） 3
> 微营养评定法（MNA）10
> 成人营养不良通用筛查工具 MUST-SF 13
> NUTRIC-Score 14
> 病人营养状况主观评估表 PG-SGA 15
> 营养不良的评估 16
> 住院患者营养风险筛查NRS-2002 17
> 总能量需求 18
> 不同疾病能量需求 19
> 不同手术或创伤时的全天能量消耗 20
> 总蛋白需求 21
> 不同疾病蛋白需求 22
> 基础能量消耗 23
> 膳食调查摄入能量及蛋白质计算 24


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
