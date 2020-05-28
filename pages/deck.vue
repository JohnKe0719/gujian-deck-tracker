<template>
    <div id="deck">
        <v-row>
            <v-col col="4" sm="4" md="2" lg="2" :class="!$vuetify.breakpoint.smAndDown ? 'pl-12 card-combobox' : 'pl-6 card-combobox'">
                <v-combobox
                    v-model="select"
                    :items="cardsComboBox"
                    label="選擇一張卡片（或者點選下表任一卡片）"
                >
                </v-combobox>
            </v-col>
            <v-col col="1"  :class="!$vuetify.breakpoint.smAndDown ? 'pt-7 card-btn-1' : 'pt-7 card-btn-1'">
                <v-btn @click="playCard()">
                    打出
                </v-btn>
            </v-col>
            <v-col col="1"  :class="!$vuetify.breakpoint.smAndDown ? 'pt-7 card-btn-2' : 'pt-7 card-btn-2'">
                <v-btn @click="reset()">
                    重置
                </v-btn>
            </v-col>
        </v-row>
        <v-row :class="!$vuetify.breakpoint.smAndDown ? 'pl-12' : 'pl-6'">
            <table class="card-table" border="1">
                <h3 class="primary--text">卡牌池</h3>
                <v-tabs
                    v-model="active_tab"
                    background-color="transparent"
                    class="elevation-20"
                >
                    <v-tab v-for="tab in tabs" :key="tab.id" :class="tab.class" class="tab card-text">
                        {{ tab.name }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="active_tab">
                    <v-tab-item>
                        <v-card flat>
                            <tr v-for="i in 3" :key="i">
                                <td v-for="j in 7" :key="j">
                                    <v-btn text color="green" class="pa-0 card card-text" @click="clickCard(cardsComboBox[0][j+7*(i-1)-1])">
                                        {{ cardsComboBox[0][j+7*(i-1)-1] }}
                                    </v-btn>
                                </td>
                            </tr>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <tr v-for="i in 3" :key="i">
                                <td v-for="j in 7" :key="j">
                                    <v-btn text color="red" class="pa-0 card card-text" @click="clickCard(cardsComboBox[1][j+7*(i-1)-1])">
                                        {{ cardsComboBox[1][j+7*(i-1)-1] }}
                                    </v-btn>
                                </td>
                            </tr>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <tr v-for="i in 3" :key="i">
                                <td v-for="j in 7" :key="j">
                                    <v-btn text color="orange" class="pa-0 card card-text" @click="clickCard(cardsComboBox[2][j+7*(i-1)-1])">
                                        {{ cardsComboBox[2][j+7*(i-1)-1] }}
                                    </v-btn>
                                </td>
                            </tr>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <tr v-for="i in 3" :key="i">
                                <td v-for="j in 7" :key="j">
                                    <v-btn text color="blue" class="pa-0 card card-text" @click="clickCard(cardsComboBox[3][j+7*(i-1)-1])">
                                        {{ cardsComboBox[3][j+7*(i-1)-1] }}
                                    </v-btn>
                                </td>
                            </tr>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </table>
        </v-row>
         <v-row class="mb-6" v-for="i in 1" :key="i"/>
        <v-row class="mb-12" :class="!$vuetify.breakpoint.smAndDown ? 'pl-12' : 'pl-6'">
            <table class="recommend-deck-table" border="1">
                <tr>
                    <h3 class="primary--text">古劍牌組</h3>
                    <v-tabs
                        v-model="active_tab3"
                        background-color="transparent"
                        class="elevation-10"
                        show-arrows
                    >
                        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
                        <v-tab v-for="deck in recommendDecks" :key="deck" class="tab2 card-text">
                            {{ deck.name }}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="active_tab3">
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendDecks[0].cards"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :class="cards[card].color"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }}
                                        <span v-show="cards[card].isInDeck" class="circle">{{ circleText }}</span>
                                        ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                       <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendDecks[1].cards"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :class="cards[card].color"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }}
                                        <span v-show="cards[card].isInDeck" class="circle">{{ circleText }}</span>
                                        ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendDecks[2].cards"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :class="cards[card].color"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }}
                                        <span v-show="cards[card].isInDeck" class="circle">{{ circleText }}</span>
                                        ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendDecks[3].cards"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :class="cards[card].color"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }}
                                        <span v-show="cards[card].isInDeck" class="circle">{{ circleText }}</span>
                                        ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendDecks[4].cards"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :class="cards[card].color"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }}
                                        <span v-show="cards[card].isInDeck" class="circle">{{ circleText }}</span>
                                        ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendDecks[5].cards"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :class="cards[card].color"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }}
                                        <span v-show="cards[card].isInDeck" class="circle">{{ circleText }}</span>
                                        ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendDecks[6].cards"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :class="cards[card].color"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }}
                                        <span v-show="cards[card].isInDeck" class="circle">{{ circleText }}</span>
                                        ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </tr>
            </table>
        </v-row>
        <v-row class="mb-12" :class="!$vuetify.breakpoint.smAndDown ? 'pl-12' : 'pl-6'">
            <table class="recommend-card-table" border="1">
                <tr>
                    <h3 class="primary--text">當前推薦選牌</h3>
                    <v-tabs
                        v-model="active_tab2"
                        background-color="transparent"
                        class="elevation-10"
                    >
                        <v-tab v-for="tab in tabs" :key="tab.id" :class="tab.class" class="tab card-text">
                            {{ tab.name }}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="active_tab2">
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendCradsArray[0]"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :color="cardColor[0]"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }} ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendCradsArray[1]"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :color="cardColor[1]"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }} ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                        <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendCradsArray[2]"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :color="cardColor[2]"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }} ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                         <v-tab-item >
                                <v-card flat>
                                    <v-btn 
                                        v-for="card in recommendCradsArray[3]"
                                        :key="card"
                                        text 
                                        max-width="120px"
                                        max-height="35px"
                                        :color="cardColor[3]"
                                        class="pa-0 recommend-card-text" 
                                        @click="clickCard(card)"
                                    >
                                        {{ card }} ＞
                                    </v-btn>
                                </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </tr>
            </table>
        </v-row>
        <v-row class="pb-12" :class="!$vuetify.breakpoint.smAndDown ? 'pl-12 deck' : 'pl-6 deck'">
            <table :class="!$vuetify.breakpoint.smAndDown ? 'deck-table' : 'deck-table'" border="1">
                <tr>
                    <th v-for="item in headers" :key="item" >{{ item.text }} </th>
                </tr>
                <tr v-show="item.show" v-for="item in deckTable" :key="item">
                    <td>{{ item.name }}</td>
                    <td>{{ item.score }}</td>
                    <td>
                        <v-btn v-show="item.cards[0] !== ''" :class="item.cards[0] === '' ?'':cards[item.cards[0]].color" class="deck-text" text @click="clickCard(item.cards[0])">
                            {{ item.cards[0] }}
                        </v-btn>
                        <span v-show="item.cards[0] === '' ?false:cards[item.cards[0]].isInDeck" class="circle">{{ circleText }}</span>
                    </td>
                    <td>
                        <v-btn v-show="item.cards[1] !== ''" :class="item.cards[1] === '' ?'':cards[item.cards[1]].color" class="deck-text" text @click="clickCard(item.cards[1])">
                            {{ item.cards[1] }}
                        </v-btn>
                        <span v-show="item.cards[1] === '' ?false:cards[item.cards[1]].isInDeck" class="circle">{{ circleText }}</span>
                    </td>
                    <td>
                        <v-btn v-show="item.cards[2] !== ''" :class="item.cards[2] === '' ?'':cards[item.cards[2]].color" class="deck-text" text @click="clickCard(item.cards[2])">
                            {{ item.cards[2] }}
                        </v-btn>
                        <span v-show="item.cards[2] === '' ?false:cards[item.cards[2]].isInDeck" class="circle">{{ circleText }}</span>
                    </td>
                    <td>
                        <v-btn v-show="item.cards[3] !== ''" :class="item.cards[3] === '' ?'':cards[item.cards[3]].color" class="deck-text" text @click="clickCard(item.cards[3])">
                            {{ item.cards[3] }}
                        </v-btn>
                        <span v-show="item.cards[3] === '' ?false:cards[item.cards[3]].isInDeck" class="circle">{{ circleText }}</span>
                    </td>
                    <td>
                        <v-btn v-show="item.cards[4] !== ''" :class="item.cards[4] === '' ?'':cards[item.cards[4]].color" class="deck-text" text @click="clickCard(item.cards[4])">
                            {{ item.cards[4] }}
                        </v-btn>
                        <span v-show="item.cards[4] === '' ?false:cards[item.cards[4]].isInDeck" class="circle">{{ circleText }}</span>
                    </td>
                    <td>
                        <v-btn v-show="item.cards[5] !== ''" :class="item.cards[5] === '' ?'':cards[item.cards[5]].color" class="deck-text" text @click="clickCard(item.cards[5])">
                            {{ item.cards[5] }}
                        </v-btn>
                        <span v-show="item.cards[5] === '' ?false:cards[item.cards[5]].isInDeck" class="circle">{{ circleText }}</span>
                    </td>
                    <td>
                        <v-btn v-show="item.cards[6] !== ''" :class="item.cards[6] === '' ?'':cards[item.cards[6]].color" class="deck-text" text @click="clickCard(item.cards[6])">
                            {{ item.cards[6] }}
                        </v-btn>
                        <span v-show="item.cards[6] === '' ?false:cards[item.cards[6]].isInDeck" class="circle">{{ circleText }}</span>
                    </td>
                </tr>
            </table>
        </v-row>
    </div>
</template>

<script>
import cardData from '../assets/cards.js'
import deckData from '../assets/decks.js'

export default {
    components: {
    },
    data() {
        return {
            active_tab:0,
            active_tab2: 0,
            active_tab3: 0,
            circleText: '✔',
            select:'',
            select2:'',
            headers: [
                {
                    text: '名稱',
                    align: 'center',
                    sortable: false,
                    value: 'name'
                },
                { text: '分數', value: 'score' },
                { text: '卡片01', value: 'card1' },
                { text: '卡片02', value: 'card2' },
                { text: '卡片03', value: 'card3' },
                { text: '卡片04', value: 'card4' },
                { text: '卡片05', value: 'card5' },
                { text: '卡片06', value: 'card6' },
                { text: '卡片07', value: 'card7' }
            ],
            tabs: [
				{ id: 0, name: '春', class: 'green--text' },
				{ id: 1, name: '夏', class: 'red--text' },
                { id: 2, name: '秋', class: 'orange--text' },
                { id: 3, name: '冬', class: 'blue--text' },
            ],
            cardColor: [
                'green','red','orange','blue'
            ],
            cardsComboBox: [
                [   
                    '風晴雪','方蘭生','琴川','青玉司南佩','阿阮','昭明','露草',
                    '沈曦','巽芳','青丘塵中記','長安','饞雞','淨水湖','鳳來',
                    '原天柿','白夢澤','鄢陵','姬軒轅','劉兄','玉梳','桃花谷'
                ],
                [
                    '慳臾','天墉城','黑龍鱗片','古劍焚寂','蓬萊','襄鈴','紅葉湖',
                    '樂無異','謝衣','禺期','赤水','古劍紅玉','岑纓','畫板',
                    '嫘祖','司危','半魂蓮','陽平','巫山','百草谷','焦炭'
                ],
                [
                    '歐陽少恭','尹千殤','天鹿城','兔子抱枕','紫榕林','通天之器','紅玉',
                    '無名之劍','榣山','安陸','青玉壇','夢魂枝','清和真人','北洛',
                    '縉雲','有熊','天鹿','西陵','聞人羽','金麒麟','捐毒'
                ],
                [
                    '百里屠蘇','幽都','百勝刀','沈夜','流月城','忘川','古劍晗光',
                    '太華山','夏夷則','阿翔','華月','陵越','華月的箜篌','神女墓',
                    '雲無月','玄戈&霓商','太歲','鼎湖','巫炤','巫之國','無名之地'
                ]
            ],
            cards: {
                // green
                '風晴雪':{
                    color: 'green--text',
                    isInDeck: false
                },
                '方蘭生':{
                    color: 'green--text',
                    isInDeck: false
                },
                '琴川':{
                    color: 'green--text',
                    isInDeck: false
                },
                '青玉司南佩':{
                    color: 'green--text',
                    isInDeck: false
                },
                '阿阮':{
                    color: 'green--text',
                    isInDeck: false
                },
                '昭明':{
                    color: 'green--text',
                    isInDeck: false
                },
                '露草':{
                    color: 'green--text',
                    isInDeck: false
                },
                '沈曦':{
                    color: 'green--text',
                    isInDeck: false
                },
                '巽芳':{
                    color: 'green--text',
                    isInDeck: false
                },
                '青丘塵中記':{
                    color: 'green--text',
                    isInDeck: false
                },
                '長安':{
                    color: 'green--text',
                    isInDeck: false
                },
                '饞雞':{
                    color: 'green--text',
                    isInDeck: false
                },
                '淨水湖':{
                    color: 'green--text',
                    isInDeck: false
                },
                '鳳來':{
                    color: 'green--text',
                    isInDeck: false
                },
                '原天柿':{
                    color: 'green--text',
                    isInDeck: false
                },
                '白夢澤':{
                    color: 'green--text',
                    isInDeck: false
                },
                '鄢陵':{
                    color: 'green--text',
                    isInDeck: false
                },
                '姬軒轅':{
                    color: 'green--text',
                    isInDeck: false
                },
                '劉兄':{
                    color: 'green--text',
                    isInDeck: false
                },
                '玉梳':{
                    color: 'green--text',
                    isInDeck: false
                },
                '桃花谷':{
                    color: 'green--text',
                    isInDeck: false
                },
                // red
                '慳臾':{
                    color: 'red--text',
                    isInDeck: false
                },
                '天墉城':{
                    color: 'red--text',
                    isInDeck: false
                },
                '黑龍鱗片':{
                    color: 'red--text',
                    isInDeck: false
                },
                '古劍焚寂':{
                    color: 'red--text',
                    isInDeck: false
                },
                '蓬萊':{
                    color: 'red--text',
                    isInDeck: false
                },
                '襄鈴':{
                    color: 'red--text',
                    isInDeck: false
                },
                '紅葉湖':{
                    color: 'red--text',
                    isInDeck: false
                },
                '樂無異':{
                    color: 'red--text',
                    isInDeck: false
                },
                '謝衣':{
                    color: 'red--text',
                    isInDeck: false
                },
                '禺期':{
                    color: 'red--text',
                    isInDeck: false
                },
                '赤水':{
                    color: 'red--text',
                    isInDeck: false
                },
                '古劍紅玉':{
                    color: 'red--text',
                    isInDeck: false
                },
                '岑纓':{
                    color: 'red--text',
                    isInDeck: false
                },
                '畫板':{
                    color: 'red--text',
                    isInDeck: false
                },
                '嫘祖':{
                    color: 'red--text',
                    isInDeck: false
                },
                '司危':{
                    color: 'red--text',
                    isInDeck: false
                },
                '半魂蓮':{
                    color: 'red--text',
                    isInDeck: false
                },
                '陽平':{
                    color: 'red--text',
                    isInDeck: false
                },
                '巫山':{
                    color: 'red--text',
                    isInDeck: false
                },
                '百草谷':{
                    color: 'red--text',
                    isInDeck: false
                },
                '焦炭':{
                    color: 'red--text',
                    isInDeck: false
                },
                // orange
                '歐陽少恭':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '尹千殤':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '天鹿城':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '兔子抱枕':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '紫榕林':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '通天之器':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '紅玉':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '無名之劍':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '榣山':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '安陸':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '青玉壇':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '夢魂枝':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '清和真人':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '北洛':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '縉雲':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '有熊':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '天鹿':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '西陵':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '聞人羽':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '金麒麟':{
                    color: 'orange--text',
                    isInDeck: false
                },
                '捐毒':{
                    color: 'orange--text',
                    isInDeck: false
                },
                // blue
                '百里屠蘇':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '幽都':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '百勝刀':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '沈夜':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '流月城':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '忘川':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '古劍晗光':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '太華山':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '夏夷則':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '阿翔':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '華月':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '陵越':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '華月的箜篌':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '神女墓':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '雲無月':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '玄戈&霓商':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '太歲':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '鼎湖':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '巫炤':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '巫之國':{
                    color: 'blue--text',
                    isInDeck: false
                },
                '無名之地':{
                    color: 'blue--text',
                    isInDeck: false
                }
            },
            decks: [
                {
                    name: '與子成說',
                    score: 3,
                    cards: ['風晴雪','百里屠蘇','','','','','']
                },
                {
                    name: '乘龍歸',
                    score: 3,
                    cards: ['慳臾','百里屠蘇','','','','','']
                },
                {
                    name: '琴心劍魄',
                    score: 3,
                    cards: ['歐陽少恭','百里屠蘇','','','','','']
                },
                {
                    name: '雲湧崑崙',
                    score: 3,
                    cards: ['百里屠蘇','天墉城','','','','','']
                },
                {
                    name: '故友贈禮',
                    score: 3,
                    cards: ['百里屠蘇','黑龍鱗片','','','','','']
                },
                {
                    name: '焚焰血戮',
                    score: 3,
                    cards: ['百里屠蘇','古劍焚寂','','','','','']
                },
                {
                    name: '陌相逢',
                    score: 4,
                    cards: ['風晴雪','尹千殤','','','','','']
                },
                {
                    name: '幽都靈女',
                    score: 4,
                    cards: ['風晴雪','幽都','','','','','']
                },
                {
                    name: '荒魂述',
                    score: 4,
                    cards: ['風晴雪','天鹿城','','','','','']
                },
                {
                    name: '琴川友',
                    score: 4,
                    cards: ['方蘭生','歐陽少恭','','','','','']
                },
                {
                    name: '望鄉',
                    score: 4,
                    cards: ['方蘭生','琴川','','','','','']
                },
                {
                    name: '永相隨',
                    score: 4,
                    cards: ['方蘭生','青玉司南佩','','','','','']
                },
                {
                    name: '無情客',
                    score: 4,
                    cards: ['方蘭生','百勝刀','','','','','']
                },
                {
                    name: '芳草心',
                    score: 4,
                    cards: ['阿阮','昭明','','','','','']
                },
                {
                    name: '共株生',
                    score: 4,
                    cards: ['阿阮','露草','','','','','']
                },
                {
                    name: '三日遙',
                    score: 4,
                    cards: ['沈曦','沈夜','','','','','']
                },
                {
                    name: '月中生',
                    score: 4,
                    cards: ['沈曦','流月城','','','','','']
                },
                {
                    name: '伴長眠',
                    score: 4,
                    cards: ['沈曦','兔子抱枕','','','','','']
                },
                {
                    name: '仙山眷侶',
                    score: 4,
                    cards: ['巽芳','歐陽少恭','','','','','']
                },
                {
                    name: '蓬萊公主',
                    score: 4,
                    cards: ['巽芳','蓬萊','','','','','']
                },
                {
                    name: '故林棲',
                    score: 4,
                    cards: ['襄鈴','紫榕林','','','','','']
                },
                {
                    name: '青丘有狐',
                    score: 4,
                    cards: ['襄鈴','青丘塵中記','','','','','']
                },
                {
                    name: '清馨戲蝶',
                    score: 4,
                    cards: ['襄鈴','紅葉湖','','','','','']
                },
                {
                    name: '春風雨',
                    score: 4,
                    cards: ['樂無異','謝衣','','','','','']
                },
                {
                    name: '玉京遊',
                    score: 4,
                    cards: ['樂無異','長安','','','','','']
                },
                {
                    name: '滄海飛塵',
                    score: 4,
                    cards: ['樂無異','饞雞','','','','','']
                },
                {
                    name: '孤月寒燈',
                    score: 4,
                    cards: ['謝衣','沈夜','','','','','']
                },
                {
                    name: '胡不歸',
                    score: 4,
                    cards: ['謝衣','流月城','','','','','']
                },
                {
                    name: '空留憶',
                    score: 4,
                    cards: ['謝衣','通天之器','','','','','']
                },
                {
                    name: '別破軍',
                    score: 4,
                    cards: ['謝衣','忘川','','','','','']
                },
                {
                    name: '重山隱',
                    score: 4,
                    cards: ['謝衣','淨水湖','','','','','']
                },
                {
                    name: '古劍劍靈',
                    score: 4,
                    cards: ['禺期','紅玉','','','','','']
                },
                {
                    name: '鑄劍仙師',
                    score: 4,
                    cards: ['禺期','昭明','','','','','']
                },
                {
                    name: '歷劫重生',
                    score: 4,
                    cards: ['禺期','無名之劍','','','','','']
                },
                {
                    name: '未成之劍',
                    score: 4,
                    cards: ['禺期','古劍晗光','','','','','']
                },
                {
                    name: '榣山遺韻',
                    score: 4,
                    cards: ['慳臾','歐陽少恭','','','','','']
                },
                {
                    name: '水虺醉琴',
                    score: 4,
                    cards: ['慳臾','榣山','','','','','']
                },
                {
                    name: '應龍信物',
                    score: 4,
                    cards: ['慳臾','黑龍鱗片','','','','','']
                },
                {
                    name: '空徊',
                    score: 4,
                    cards: ['慳臾','赤水','','','','','']
                },
                {
                    name: '千古劍靈',
                    score: 4,
                    cards: ['紅玉','天墉城','','','','','']
                },
                {
                    name: '劍舞紅袖',
                    score: 4,
                    cards: ['紅玉','古劍紅玉','','','','','']
                },
                {
                    name: '明月青霜',
                    score: 4,
                    cards: ['紅玉','安陸','','','','','']
                },
                {
                    name: '醉夢江湖',
                    score: 4,
                    cards: ['尹千殤','歐陽少恭','','','','','']
                },
                {
                    name: '幽都巫咸',
                    score: 4,
                    cards: ['尹千殤','幽都','','','','','']
                },
                {
                    name: '棲身之所',
                    score: 4,
                    cards: ['歐陽少恭','蓬萊','','','','','']
                },
                {
                    name: '丹芷長老',
                    score: 4,
                    cards: ['歐陽少恭','青玉壇','','','','','']
                },
                {
                    name: '故地重回',
                    score: 4,
                    cards: ['歐陽少恭','榣山','','','','','']
                },
                {
                    name: '攬琴獨照',
                    score: 4,
                    cards: ['歐陽少恭','鳳來','','','','','']
                },
                {
                    name: '爛柯',
                    score: 4,
                    cards: ['歐陽少恭','夢魂枝','','','','','']
                },
                {
                    name: '太華山人',
                    score: 4,
                    cards: ['清和真人','太華山','','','','','']
                },
                {
                    name: '嚴師勝父',
                    score: 4,
                    cards: ['夏夷則','清和真人','','','','','']
                },
                {
                    name: '待佳期',
                    score: 4,
                    cards: ['夏夷則','露草','','','','','']
                },
                {
                    name: '飛羽凌殺',
                    score: 4,
                    cards: ['百里屠蘇','阿翔','','','','','']
                },
                {
                    name: '護孤城',
                    score: 4,
                    cards: ['沈夜','華月','','','','','']
                },
                {
                    name: '永夜寒沉',
                    score: 4,
                    cards: ['沈夜','流月城','','','','','']
                },
                {
                    name: '天墉掌門',
                    score: 4,
                    cards: ['陵越','天墉城','','','','','']
                },
                {
                    name: '月之殤',
                    score: 4,
                    cards: ['華月','流月城','','','','','']
                },
                {
                    name: '廉貞曲',
                    score: 4,
                    cards: ['華月','華月的箜篌','','','','','']
                },
                {
                    name: '神女靜眠',
                    score: 4,
                    cards: ['巫山','神女墓','','','','','']
                },
                {
                    name: '靜水流深',
                    score: 4,
                    cards: ['北洛','雲無月','','','','','']
                },
                {
                    name: '昨日影',
                    score: 4,
                    cards: ['北洛','縉雲','','','','','']
                },
                {
                    name: '參商交輝',
                    score: 4,
                    cards: ['北洛','玄戈&霓商','','','','','']
                },
                {
                    name: '來日可期',
                    score: 4,
                    cards: ['北洛','天鹿城','','','','','']
                },
                {
                    name: '殺伐之劍',
                    score: 4,
                    cards: ['北洛','太歲','','','','','']
                },
                {
                    name: '得力助手',
                    score: 4,
                    cards: ['北洛','原天柿','','','','','']
                },
                {
                    name: '獨歌',
                    score: 4,
                    cards: ['雲無月','白夢澤','','','','','']
                },
                {
                    name: '無夢之魘',
                    score: 4,
                    cards: ['雲無月','夢魂枝','','','','','']
                },
                {
                    name: '鴻雁于飛',
                    score: 4,
                    cards: ['岑纓','鄢陵','','','','','']
                },
                {
                    name: '一見喜',
                    score: 4,
                    cards: ['岑纓','原天柿','','','','','']
                },
                {
                    name: '澄心若璃',
                    score: 4,
                    cards: ['岑纓','畫板','','','','','']
                },
                {
                    name: '吾道不孤',
                    score: 4,
                    cards: ['姬軒轅','岑纓','','','','','']
                },
                {
                    name: '昔年之樂',
                    score: 4,
                    cards: ['姬軒轅','嫘祖','','','','','']
                },
                {
                    name: '軒轅氏',
                    score: 4,
                    cards: ['姬軒轅','有熊','','','','','']
                },
                {
                    name: '龍去鼎湖',
                    score: 4,
                    cards: ['姬軒轅','鼎湖','','','','','']
                },
                {
                    name: '雲本無心',
                    score: 4,
                    cards: ['縉雲','雲無月','','','','','']
                },
                {
                    name: '千鋒辟易',
                    score: 4,
                    cards: ['縉雲','太歲','','','','','']
                },
                {
                    name: '遂古遺幽',
                    score: 4,
                    cards: ['巫炤','司危','','','','','']
                },
                {
                    name: '恨生天地',
                    score: 4,
                    cards: ['巫炤','半魂蓮','','','','','']
                },
                {
                    name: '星墜',
                    score: 4,
                    cards: ['玄戈&霓商','天鹿城','','','','','']
                },
                {
                    name: '鎮厄',
                    score: 4,
                    cards: ['玄戈&霓商','天鹿','','','','','']
                },
                {
                    name: '烽煙鎖城',
                    score: 4,
                    cards: ['嫘祖','西陵','','','','','']
                },
                {
                    name: '妙筆退魔',
                    score: 4,
                    cards: ['劉兄','陽平','','','','','']
                },
                {
                    name: '神遊狐鄉',
                    score: 4,
                    cards: ['劉兄','青丘塵中記','','','','','']
                },
                {
                    name: '祛邪',
                    score: 4,
                    cards: ['天鹿城','天鹿','','','','','']
                },
                {
                    name: '人世星火',
                    score: 4,
                    cards: ['有熊','西陵','','','','','']
                },
                {
                    name: '天星盡搖',
                    score: 4,
                    cards: ['巫之國','半魂蓮','','','','','']
                },
                {
                    name: '黑蓮厄',
                    score: 4,
                    cards: ['陽平','半魂蓮','','','','','']
                },
                {
                    name: '蘇生之罪',
                    score: 4,
                    cards: ['無名之地','半魂蓮','','','','','']
                },
                {
                    name: '負青絲',
                    score: 4,
                    cards: ['玉梳','司危','','','','','']
                },
                {
                    name: '光逐影',
                    score: 5,
                    cards: ['阿阮','夏夷則','','','','','']
                },
                {
                    name: '山鬼',
                    score: 5,
                    cards: ['阿阮','巫山','','','','','']
                },
                {
                    name: '比肩行',
                    score: 5,
                    cards: ['樂無異','聞人羽','','','','','']
                },
                {
                    name: '家傳寶貝',
                    score: 5,
                    cards: ['樂無異','古劍晗光','','','','','']
                },
                {
                    name: '星海天罡',
                    score: 5,
                    cards: ['聞人羽','百草谷','','','','','']
                },
                {
                    name: '逸塵',
                    score: 5,
                    cards: ['夏夷則','太華山','','','','','']
                },
                {
                    name: '工夫廚房',
                    score: 10,
                    cards: ['風晴雪','謝衣','焦炭','','','','']
                },
                {
                    name: '幽夜蒼茫',
                    score: 10,
                    cards: ['風晴雪','尹千殤','幽都','','','','']
                },
                {
                    name: '桃花幻夢',
                    score: 10,
                    cards: ['風晴雪','百里屠蘇','桃花谷','','','','']
                },
                {
                    name: '露草流螢',
                    score: 10,
                    cards: ['阿阮','巫山','露草','','','','']
                },
                {
                    name: '芳華如夢',
                    score: 10,
                    cards: ['巽芳','歐陽少恭','蓬萊','','','','']
                },
                {
                    name: '尾巴尖兒',
                    score: 10,
                    cards: ['襄鈴','百里屠蘇','紅葉湖','','','','']
                },
                {
                    name: '劍主之誼',
                    score: 10,
                    cards: ['樂無異','禺期','古劍晗光','','','','']
                },
                {
                    name: '長相憶',
                    score: 10,
                    cards: ['樂無異','聞人羽','金麒麟','','','','']
                },
                {
                    name: '溫茶相待',
                    score: 10,
                    cards: ['清和真人','夏夷則','太華山','','','','']
                },
                {
                    name: '天墉舊事',
                    score: 10,
                    cards: ['百里屠蘇','陵越','天墉城','','','','']
                },
                {
                    name: '千年一器',
                    score: 10,
                    cards: ['昭明','無名之劍','古劍晗光','','','','']
                },
                {
                    name: '宿世秋',
                    score: 10,
                    cards: ['北洛','雲無月','白夢澤','','','','']
                },
                {
                    name: '玳之夢',
                    score: 10,
                    cards: ['北洛','劉兄','巫之國','','','','']
                },
                {
                    name: '以玉為戈',
                    score: 10,
                    cards: ['姬軒轅','縉雲','有熊','','','','']
                },
                {
                    name: '赤水遺珠',
                    score: 10,
                    cards: ['姬軒轅','嫘祖','赤水','','','','']
                },
                {
                    name: '刺荊心',
                    score: 10,
                    cards: ['縉雲','雲無月','白夢澤','','','','']
                },
                {
                    name: '生辰禮',
                    score: 10,
                    cards: ['嫘祖','司危','玉梳','','','','']
                },
                {
                    name: '巫之血',
                    score: 10,
                    cards: ['巫之國','無名之地','西陵','','','','']
                },
                {
                    name: '藍衫偃師記',
                    score: 20,
                    cards: ['阿阮','樂無異','聞人羽','夏夷則','','','']
                },
                {
                    name: '巫山神女',
                    score: 20,
                    cards: ['阿阮','巫山','露草','神女墓','','','']
                },
                {
                    name: '烈山遺族',
                    score: 20,
                    cards: ['沈曦','謝衣','沈夜','華月','','','']
                },
                {
                    name: '往事浮沙',
                    score: 20,
                    cards: ['謝衣','沈夜','樂無異','捐毒','','','']
                },
                {
                    name: '天地熔爐',
                    score: 20,
                    cards: ['禺期','昭明','無名之劍','古劍晗光','','','']
                },
                {
                    name: '首山夢時書',
                    score: 20,
                    cards: ['北洛','雲無月','岑纓','姬軒轅','','','']
                },
                {
                    name: '眠霜臥雪',
                    score: 20,
                    cards: ['姬軒轅','嫘祖','縉雲','鼎湖','','','']
                },
                {
                    name: '故夢',
                    score: 20,
                    cards: ['巫炤','縉雲','姬軒轅','嫘祖','','','']
                },
                {
                    name: '西陵曲',
                    score: 20,
                    cards: ['巫炤','司危','嫘祖','西陵','','','']
                },
                {
                    name: '紅月',
                    score: 40,
                    cards: ['沈曦','謝衣','沈夜','華月','流月城','','']
                },
                {
                    name: '黑衣少俠傳',
                    score: 60,
                    cards: ['風晴雪','方蘭生','襄鈴','紅玉','尹千殤','百里屠蘇','']
                },
                {
                    name: '攜寵同行',
                    score: 60,
                    cards: ['樂無異','饞雞','百里屠蘇','阿翔','北洛','原天柿','']
                },
                {
                    name: '古劍奇譚',
                    score: 80,
                    cards: ['昭明','古劍焚寂','古劍紅玉','無名之劍','古劍晗光','太歲','天鹿']
                }
            ],
            recommendCrads: null,
            recommendCradsArray: [{},{},{},{}],
            recommendDecks:[
                {
                    name:'百里屠蘇核心',
                    cards:[
                        '百里屠蘇','歐陽少恭','風晴雪','慳臾','襄鈴','天墉城','阿翔','桃花谷','黑龍鱗片','紅葉湖','陵越','古劍焚寂'
                    ]
                },
                {
                    name:'樂無異核心',
                    cards:[
                        '樂無異','禺期','謝衣','聞人羽','沈夜','古劍晗光','阿阮','夏夷則','金麒麟','長安','饞雞','捐毒'
                    ]
                },
                {
                    name:'歐陽少恭核心',
                    cards:[
                        '歐陽少恭','百里屠蘇','巽芳','蓬萊','鳳來','方蘭生','慳臾','尹千殤','夢魂枝','榣山','青玉壇'
                    ]
                },
                {
                    name:'沈夜沈曦謝衣核心',
                    cards:[
                        '謝衣','沈夜','沈曦','樂無異','華月','流月城','風晴雪','焦炭','捐毒','兔子抱枕','通天之器','忘川','淨水湖'
                    ]
                },
                {
                    name:'姬軒轅核心',
                    cards:[
                        '姬軒轅','岑纓','嫘祖','縉雲','有熊','西陵','巫炤','司危','赤水','鼎湖','玉梳','半魂蓮'
                    ]
                },
                {
                    name:'北洛雲無月核心',
                    cards:[
                        '北洛','雲無月','姬軒轅','岑纓','縉雲','白夢澤','天鹿城','玄戈&霓商','原天柿','夢魂枝','天鹿','有熊','太歲','鄢陵','畫板'
                    ]
                },
                {
                    name:'阿阮夏夷則核心',
                    cards:[
                        '夏夷則','樂無異','阿阮','聞人羽','清和真人','露草','巫山','神女墓','太華山','金麒麟','百草谷'
                    ]
                }
            ]
        }
    },
    computed: {
        deckTable() {
            let table = this.decks.slice(0)
            table.forEach(deck => {
                deck.show = false
                deck.cards.forEach(card => {
                    if (card !==''){
                        if (this.cards[card].isInDeck) {
                            deck.show = true
                        }
                    }
                });
            });
            return table
        },
        // recommendCradsArray() {
        //     if ( this.recommendCrads !== null && this.recommendCrads !== undefined ) {
        //         let cradsArray = this.recommendCrads.slice(0)
        //         for (let i=0; i<4; i++ ) {
        //             if ( cradsArray[i] !== null && cradsArray[i]!== undefined ) {
        //                 cradsArray[i] = this.sortRecommendCards(cradsArray[i])
        //             }
        //         }
        //         console.log('cradsArray',cradsArray)
        //         return cradsArray
        //     } else {
        //         console.log('cradsArray is null')
        //         return null
        //     }
        // }
        // pairComboBox() {
        //     let pairArray = new Array(this.cards.length)
        //     let i = 0
        //     let item
        //     for (item in this.cards ) {
        //         if (this.select !=='') {
        //             if ( this.cards[item].color === this.cards[this.select].color) {
        //                 pairArray[i] = item
        //                 i++
        //             }
        //         }
        //     }
        //     return pairArray
        // }
    },
    created() {
        this.initCardComboBox()
    },
    mounted() {},
    methods: {
        playCard() {
            this.cards[this.select].isInDeck = true
            this.setRecommendCards()
            setTimeout(this.setRecommendCradsArray(),1000)
            // this.cards[this.select2].isInDeck = true
        },
        clickCard(card) {
            this.cards[card].isInDeck = !this.cards[card].isInDeck
            this.setRecommendCards()
            setTimeout(this.setRecommendCradsArray(),1000)
        },
        // initCardComboBox() {
        //     let cardsArray = new Array(this.cards.length)
        //     let item
        //     for (item in this.cards ) {
        //         if (item.color === 'green--text') {
        //             cardsArray[0].push(item)
        //         } else if (item.color === 'red--text') {
        //             cardsArray[1].push(item)
        //         } else if (item.color === 'orange--text') {
        //             cardsArray[2].push(item)
        //         } else if (item.color === 'blue--text') {
        //             cardsArray[3].push(item)
        //         }
        //     }
        //     this.cardsComboBox = cardsArray
        // },
        setRecommendCards () {
            if (this.deckTable !== null && this.deckTable !== '' && this.deckTable !== undefined) {
                let cradsArray = [{},{},{},{}]
                let table = this.deckTable.slice(0)
                let score = 0
                table.forEach(deck => {
                    if (deck.show) {
                        if (deck.score === 80) {
                            score = 1
                        } else if(deck.score === 60) {
                            score = 2
                        } else if(deck.score === 40) {
                            score = 3
                        } else if(deck.score === 20) {
                            score = 4
                        } else if(deck.score === 10) {
                            score = 5
                        } else {
                            score = 6
                        }

                        deck.cards.forEach(card => {
                            if (card !=='') {
                                if (this.cards[card].isInDeck) {
                                    score += 1
                                }
                            }
                        });
                        deck.cards.forEach(card => {
                            if (card !=='') {
                                if (!this.cards[card].isInDeck) {
                                    if(this.cards[card].color === 'green--text') {
                                        try {
                                            cradsArray[0][card].score += 0
                                        } catch (error) {
                                            cradsArray[0][card] = {score: 0}
                                        } finally {
                                            cradsArray[0][card].score += score
                                        }
                                    } else if (this.cards[card].color === 'red--text') {
                                        try {
                                            cradsArray[1][card].score += 0
                                        } catch (error) {
                                            cradsArray[1][card] = {score: 0}
                                        } finally {
                                            cradsArray[1][card].score += score
                                        }
                                    } else if (this.cards[card].color === 'orange--text') {
                                        try {
                                            cradsArray[2][card].score += 0
                                        } catch (error) {
                                            cradsArray[2][card] = {score: 0}
                                        } finally {
                                            console.log(cradsArray[2][card].score)
                                            cradsArray[2][card].score += score
                                        }
                                    } else if (this.cards[card].color === 'blue--text') {
                                        try {
                                            cradsArray[3][card].score += 0
                                        } catch (error) {
                                            cradsArray[3][card] = {score: 0}
                                        } finally {
                                            cradsArray[3][card].score += score
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
                console.log('cradsArray',cradsArray)
                this.recommendCrads = cradsArray
            } else {
                console.log('deckTable is null')
            }
        },
        setRecommendCradsArray () {
            if ( this.recommendCrads !== null && this.recommendCrads !== undefined ) {
                let cradsArray = this.recommendCrads.slice(0)
                for (let i=0; i<4; i++ ) {
                    if ( cradsArray[i] !== null && cradsArray[i]!== undefined ) {
                        cradsArray[i] = this.sortRecommendCards(cradsArray[i])
                    }
                }
                console.log('cradsArray',cradsArray)
                this.recommendCradsArray = cradsArray
            } else {
                console.log('cradsArray is null')
            }
        },
        sortRecommendCards (cradList) {
            let sortedCradArray = []
            sortedCradArray = Object.keys(cradList).sort(function(a,b) {
                return cradList[a].score < cradList[b].score ? 1 : -1
            })
            return sortedCradArray
        },
        reset() {
            location.reload()
        }
    },
    // destroyed() {
    //     clearInterval(this.run)
    // }
}
</script>

<style lang="scss" scoped>
    // md 以上
    @media (min-width: 960px) {
        .deck {
            width: 1400px !important;
        }
        .deck-table {
            border-collapse: collapse;
            text-align: center;
            width: 1400px !important;	
            /*自動斷行*/
            // word-wrap: break-word;
            table-layout: fixed;
        }

        .card-table {
            border-collapse: collapse;
            text-align: center;
            width: 710px; 	
            /*自動斷行*/
            // word-wrap: break-word;
            table-layout: fixed;
        }

        .recommend-card-table {
            border-collapse: collapse;
            text-align: center;
            width: 600px; 	
            /*自動斷行*/
            // word-wrap: break-word;
            table-layout: fixed;
        }
        .recommend-deck-table {
            border-collapse: collapse;
            text-align: center;
            width: 800px; 	
            /*自動斷行*/
            // word-wrap: break-word;
            table-layout: fixed;
        }

        .card {
            max-width: 120px !important;
            min-width: 100px !important;
            max-height: 35px !important;
        }
        .card-combobox {
            min-width: 20%;
        }
        .card-btn {
            max-width: 5%;
        }
        .card-btn-1 {
            max-width: 5%;
        }
        .card-btn-2 {
            max-width: 5%;
        }
        .card-text {
            font-size: 16px;
        }
        .recommend-card-text {
            font-size: 16px;
            padding-top: 5px;
            padding-bottom: 5px;
        }

        .deck-text {
            font-size: 16px;
        }

        .circle {
            color: #C513B9;
            font-size: 20px;
            font-weight: bold;
        }

        .tab {
            width: calc(100%/4);
            border:0.5px #000000 solid;
        }
        .tab2 {
            width: auto;
            border:0.5px #000000 solid;
        }
    }

    @media all and (max-width: 960px) {
        .deck {
            width: 800px !important;
        }

        .deck-table {
            border-collapse: collapse;
            text-align: center;
            width: 800px !important;	
            /*自動斷行*/
            // word-wrap: break-word;
            table-layout: fixed;
        }

        .card-table {
            border-collapse: collapse;
            text-align: center;
            width: auto; 	
            /*自動斷行*/
            // word-wrap: break-word;
            table-layout: fixed;
        }

        .recommend-card-table {
            border-collapse: collapse;
            text-align: center;
            min-width: 750px !important;
            /*自動斷行*/
            // word-wrap: break-word;
            table-layout: fixed;
        }
        .recommend-deck-table {
            border-collapse: collapse;
            text-align: center;
            min-width: 750px !important;
            /*自動斷行*/
            // word-wrap: break-word;
            table-layout: fixed;
        }

        .card {
            max-width: 110px !important;
            min-width: 105px !important;
            min-height: 50px !important;
        }
        .card-combobox {
            min-width: 78%;
        }
        .card-btn {
            max-width: 5%;
        }
        .card-btn-1 {
            position: absolute;
            left: 370px;
        }
        .card-btn-2 {
            position: absolute;
            left: 450px;
        }
        .card-text {
            font-size: 18px;
        }
        .recommend-card-text {
            font-size: 18px;
            padding-top: 15px !important;
            padding-bottom: 15px !important;
            min-height: 50px !important;
        }

        .deck-text {
            font-size: 16px;
            padding-right: 1px !important;
            padding-left: 1px !important;
        }

        .circle {
            color: #C513B9;
            font-size: 20px;
            font-weight: bold;
        }

        .tab {
            width: calc(100%/4);
            border:0.5px #000000 solid;
        }
        .tab2 {
            width: auto;
            border:0.5px #000000 solid;
        }
    }
</style>
