<template>
    <div class="codepen" @mousemove="handle3DPopup">
        <div class="mutual-cards" ref="cards" id="cards">
            <div class="card" v-for="(item, index) in 3" :key="index">
                <div
                    class="card__bg"
                    :style="`background-image: url(${bgs[index]})`"
                    ref="card_bg"
                ></div>
                <img class="card__img" ref="card_img" v-lazy="imgs[index]" />
                <div class="card__text">
                    <p id="p2">{{ title[index] }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Codepen',
    props: ['scrollbar'],
    data() {
        return {
            bgs: [
                // 'https://api.adicw.cn/uploads/DfImg/81660302_p0.jpg',
                'https://img.wwery.com/wanghaibo/Pd9A7err.jpg',
                // 'https://api.adicw.cn/uploads/DfImg/62462796_p0.jpg',
                'https://img.wwery.com/wanghaibo/KXDEZM9a.jpg',
                // 'https://api.adicw.cn/uploads/DfImg/52853677_p0.jpg',
                'https://img.wwery.com/wanghaibo/9D4vHt06.jpg',
            ],
            imgs: [
                // 'https://api.adicw.cn/static/vectorgraph/AisakaTaiga.png',
                'https://img.wwery.com/wanghaibo/AX1P5S0f.png',
                // 'https://api.adicw.cn/static/vectorgraph/Isla.png',
                'https://img.wwery.com/wanghaibo/cJzvDBus.png',
                // 'https://api.adicw.cn/static/vectorgraph/TenmaGabrielWhite.png',
                'https://img.wwery.com/wanghaibo/3X9X6iTB.png',
            ],
            title: ['龙与虎 - 逢坂大河', '可塑性记忆 - 艾拉', '珈百璃的堕落 - 珈百璃'],
            loading: true,
        };
    },
    // mounted() {
    //   this.$nextTick(() => this.loading = false);
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 555);
    // },
    methods: {
        handle3DPopup(event) {
            let moveForce = 30; // max popup movement in pixels
            let rotateForce = 20; // max popup rotation in deg
            let docX = document.body.clientWidth;
            let docY = document.body.clientWidth;

            let moveX = ((event.pageX - docX / 2) / (docX / 2)) * -moveForce;
            let moveY = ((event.pageY - docY / 2) / (docY / 2)) * -moveForce;

            let rotateY = (event.pageX / docX) * rotateForce * 2 - rotateForce;
            let rotateX = -((event.pageY / docY) * rotateForce * 2 - rotateForce);

            //   this.$refs.cards.style.left = moveX + "px";
            //   this.$refs.cards.style.top = moveY + "px";
            this.$refs.cards.style.transform =
                'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

            for (let i = 0; i < 3; i++) {
                this.$refs.card_img[i].style.transform =
                    'translateX(' + rotateY + 'px) translateY(' + rotateX + 'px)';
                this.$refs.card_bg[i].style.backgroundPosition =
                    moveX / 3 + 'px' + ' ' + moveY / 3 + 'px';
            }
        },
    },
};
</script>

<style scoped>
.codepen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    user-select: none;
    background-color: #333131;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    overflow: hidden;
}

.codepen .mutual-cards {
    position: relative;
    background: #fff;
    border-radius: 15px;
    display: inline-block;
    padding: 40px;
    box-shadow: 0 10px 20px 20px rgb(0 0 0 / 17%);
    perspective: 1800px;
    /* 设置旋转元素的基点位置 */
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    transform: rotateX(11deg) rotateY(16.5deg);
    min-width: 595px;
}

.mutual-cards .card {
    position: relative;
    margin-right: 30px;
    border-radius: 15px;
    display: inline-block;
    width: 20vw;
    height: 30vw;
    overflow: hidden;
    box-shadow: 5px 5px 20px -5px rgba(0, 0, 0, 0.6);
    perspective: 1200px;
    transform-style: preserve-3d;
    transform: translatez(35px);
    transition: transform 0.2s ease-out;
    text-align: center;
    z-index: 1;
}

.card .card__bg {
    background: center/cover no-repeat;
    position: absolute;
    left: -50px;
    bottom: -50px;
    top: -50px;
    right: -50px;
    transform-origin: 50% 50%;
    transform: translateZ(-50px);
    z-index: 0;
}

.card img {
    position: relative;
    top: 14px;
    right: -10px;
    height: 110%;
}

.card .card__text {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    /* linear-gradient() 函数把线性渐变设置为背景图像。 */
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.55) 100%);
    z-index: 2;
}

.card .card__text p {
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 3px;
}
</style>
