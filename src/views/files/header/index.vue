<template>
    <header class="files-header">
        <div class="files-header__search">
            <!-- @input="changeStyle('block', '.el-autocomplete-suggestion')"
        @keyup="changeStyle('block', '.el-autocomplete-suggestion')" -->
            <!-- :trigger-on-focus="false" -->
            <el-autocomplete
                v-model="$parent.search.keyword"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                :maxlength="16"
                @select="handleSelect"
                @keyup.enter.native="handleSubmit"
            ></el-autocomplete>
            <el-dropdown @command="changeChoosed">
                <span class="el-dropdown-link">
                    {{ choosed }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in downMenuList" :key="item.id" :command="item">
                        {{ item.value }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <i class="files-header__search-btn el-icon-search" @click="handleSubmit"></i>
        </div>

        <div class="files-header__filter">
            <ul class="files-header__filter-type">
                <li
                    v-for="(item, index) in types"
                    class="_click"
                    :class="[active === index ? 'activeColor' : false]"
                    :key="index"
                    @click="handleActive(index)"
                >
                    {{ item }}
                </li>
            </ul>
            <div class="active" :style="styleObject"></div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'filesHeader',
    data() {
        return {
            keyword: '',
            types: ['全部', '前端', '后端', '日常', '游戏', '其他'],
            restaurants: [],
            active: 0,
            styleObject: {
                transform: 'translateX(0)',
            },
            choosed: '发布时间',
            downMenuList: [
                {
                    id: '001',
                    value: '发布时间',
                },
                {
                    id: '002',
                    value: '浏览量',
                },
            ],
        };
    },
    // beforeMount() {
    // this.$store.dispatch("classify/getAll");
    // },
    mounted() {
        this.restaurants = this.loadAll();
    },
    methods: {
        changeChoosed(item) {
            if (typeof item !== 'object') {
                return;
            }
            this.choosed = item.value;
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString
                ? restaurants.filter(this.createFilter(queryString))
                : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return restaurant => {
                return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
            };
        },
        handleSelect(item) {
            console.log(item);
            this.$notify.info({
                title: '查询',
                message: '测试中，模拟数据~',
            });
        },
        // submit
        handleSubmit() {
            this.changeStyle('none', '.el-autocomplete-suggestion');
            this.$parent.page.currentPage = 1;
            this.$parent.search.type = this.choosed === '发布时间' ? 1 : 2;
            this.$bus.$emit('handleSelect', 1);
        },
        // 根据传进来的状态改变建议输入框的状态（展开|隐藏）
        changeStyle(status, className) {
            let dom = document.querySelectorAll(className);
            document.querySelector('.el-input__inner').blur();
            dom[0].style.display = status;
        },

        handleActive(index) {
            this.active = index;
            this.$parent.type = index;
            this.$parent.page.currentPage = 1;
            this.styleObject.transform = 'translateX(' + index * 144.1 + '%)';
            this.$bus.$emit('handleSelect', 0);
        },
        loadAll() {
            return [
                { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
                { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
                { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
                { value: '泷千家(天山西路店)', address: '天山西路438号' },
                {
                    value: '胖仙女纸杯蛋糕（上海凌空店）',
                    address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101',
                },
                { value: '贡茶', address: '上海市长宁区金钟路633号' },
                { value: '豪大大香鸡排超级奶爸', address: '上海市嘉定区曹安公路曹安路1685号' },
                { value: '茶芝兰（奶茶，手抓饼）', address: '上海市普陀区同普路1435号' },
                { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
                { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
                { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
                { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
                {
                    value: 'Monica摩托主题咖啡店',
                    address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F',
                },
                { value: '浮生若茶（凌空soho店）', address: '上海长宁区金钟路968号9号楼地下一层' },
                { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
                { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
                {
                    value: '快乐柠檬（神州智慧店）',
                    address: '上海市长宁区天山西路567号1层R117号店铺',
                },
                { value: 'Merci Paul cafe', address: '上海市普陀区光复西路丹巴路28弄6号楼819' },
                {
                    value: '猫山王（西郊百联店）',
                    address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306',
                },
                { value: '枪会山', address: '上海市普陀区棕榈路' },
                { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
                { value: '钱记', address: '上海市长宁区天山西路' },
                { value: '壹杯加', address: '上海市长宁区通协路' },
                {
                    value: '唦哇嘀咖',
                    address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元',
                },
                { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
                {
                    value: '爱茜茜里(近铁广场)',
                    address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺',
                },
                {
                    value: '鲜果榨汁（金沙江路和美广店）',
                    address: '普陀区金沙江路2239号金沙和美广场B1-10-6',
                },
                { value: '开心丽果（缤谷店）', address: '上海市长宁区威宁路天山路341号' },
                { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
                { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
                { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
                { value: '凡仔汉堡（老真北路店）', address: '上海市普陀区老真北路160号' },
                { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
                { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
                { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
                {
                    value: '饭典*新简餐（凌空SOHO店）',
                    address: '上海市长宁区金钟路968号9号楼地下一层9-83室',
                },
                { value: '焦耳·川式快餐（金钟路店）', address: '上海市金钟路633号地下一层甲部' },
                { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
                { value: '浏阳蒸菜', address: '天山西路430号' },
                { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
                { value: '樱花食堂（凌空店）', address: '上海市长宁区金钟路968号15楼15-105室' },
                { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
                {
                    value: '福荣祥烧腊（平溪路店）',
                    address: '上海市长宁区协和路福泉路255弄57-73号',
                },
                {
                    value: '速记黄焖鸡米饭',
                    address: '上海市长宁区北新泾街道金钟路180号1层01号摊位',
                },
                { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
                { value: '(小杨生煎)西郊百联餐厅', address: '长宁区仙霞西路88号百联2楼' },
                { value: '阳阳麻辣烫', address: '天山西路389号' },
                { value: '南拳妈妈龙虾盖浇饭', address: '普陀区金沙江路1699号鑫乐惠美食广场A13' },
            ];
        },
    },
};
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
}
</style>

<style scoped lang="scss">
.files-header {
    width: 100%;
    height: 280px;
    background: #c6dfdf;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    .files-header__search {
        position: relative;
        height: 55px;
        box-shadow: 0 4px 44px rgba(8, 217, 214, 0.2);
        display: flex;

        .files-header__search-btn {
            width: 55px;
            height: 55px;
            background: var(--blue-color);
            border-radius: 10px;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.25s;
            font-weight: 800;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;

            &:hover {
                box-shadow: 0 0 10px var(--blue-color);
            }
        }
    }
}

.files-header__filter {
    position: relative;
    padding: 20px 0;
    font-size: 18px;

    .files-header__filter-type {
        display: flex;
        gap: 32px;
        margin-bottom: 10px;

        li {
            display: flex;
            align-items: center;
            padding: 0 18px;
            height: 40px;
            cursor: pointer;
            color: #fff;
            user-select: none;
            transition: all 0.3s;
            box-sizing: border-box;
            z-index: 2;

            /* activeColor */
            &.activeColor {
                color: #08d9d6;
            }
        }

        .active {
            position: absolute;
            bottom: 30px;
            width: 72px;
            height: 40px;
            background: #fff;
            border-radius: 10px;
            transition: all 0.3s;
            z-index: 1;
        }
    }
}
</style>

<style>
/* input */
.files-header__search .el-autocomplete {
    /* Detail：https://www.ruanyifeng.com/blog/2015/07/flex-examples.html */
    flex: 1;
}

.files-header__search .el-autocomplete .el-input {
    height: 100%;
}

.files-header__search .el-autocomplete .el-input .el-input__inner {
    height: 100%;
    border-radius: 8px;
    font-size: 18px;
}

/* dropdown */
.files-header__search .el-dropdown {
    position: absolute;
    /* 顶 14px, 搜索按钮宽 55px */
    right: calc(55px + 14px);
    top: calc((55px - 16px) / 2);
    font-size: 16px;
    color: #bbb;
}

/* 屏幕大于 1440px 时应用该样式 */
@media screen and (min-width: 1440px) {
    .files-header__search,
    .files-header__filter {
        width: 1200px;
    }
}

/* 屏幕小于 1440px 时应用该样式 */
@media screen and (max-width: 1440px) {
    .files-header__search,
    .files-header__filter {
        width: 91.8%;
    }
}
</style>
