//////////////////////////////////////////////////////
//             BY LEE SEO JUN; Springuser           //
//////////////////////////////////////////////////////
// YOU CAN SEE whole code at github; springuser7000 //
//////////////////////////////////////////////////////
//   서준님 제작; Github, Google: springuser700(0)   //
// Uno 개발 이후 오랜만에 다시 찾아뵙습니다.           //
// Uno에 다른 기능, 캠페인 등을 추가할려 했으나,       //
// 방학 이후 지속된 연기(미루기)로 결국 못했네요...    //
// 그래서 보답하고자 이렇게 새로운 게임으로 찾아뵙습니다//
// 열심히 준비한 작품이니 기대해주세요!                //
// 감사합니다 !                                      //
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// 탭 Vue ///////////////////////////
//////////////////////////////////////////////////////


// 게임 아닐 때도 사용하는 변수들 (예: 전체 플레이 횟수)
let How_much_played = 0;
var defult_menu_seen = new Vue({
    el: '#defult_menu',
    data: {
        seen: true
    }
})


var game_play_seen = new Vue({
    el: '#game_play',
    data: {
        seen: false
    }
})

//////////////////////////////////////////////////////
// 게임 중 사용하는 변수 & 함수들
//////////////////////////////////////////////////////

let is_fighting = false;
let single_turn;
let how_much_hard = 0;
let gamers_CDR = 0;
let my_hp, others_hp;
let my_choose = false;
let my_time;
const gamers_CDR_list = [{'name': '기본 캐릭터(기사)', 'hp': 200, 'defence': 3}, {}];
const computer_level_list = [{'name':'인공지능(쉬움)', 'hp': 100, 'damage': 7},{'name':'인공지능(보통)', 'hp': 250, 'damage': 12},{'name':'인공지능(어려움)', 'hp': 390, 'damage': 16}];

var turn_disp = new Vue({
    el: "#turn_display",
    data: {
        text: ""
    }
})

var game_play = () => {
    if (game_play_seen.seen === false){
        game_play_seen.seen = true;
        defult_menu_seen.seen = false;
    } 
    if (gamers_CDR == 0){
        knight.seen = true
    }
    single_turn = Turn_make()
    is_fighting = true;
    my_hp = gamers_CDR_list[gamers_CDR].hp
    others_hp = computer_level_list[how_much_hard].hp
    print();
    if (single_turn == false){my_time = setTimeout(computer_turn, 2000);}
}

var Turn_make = () => {
    let __turn__ = Math.floor(Math.random() * 2);
    if (__turn__ == 0){
        __turn__ = true;
    } else {
        __turn__ = false;
    }
    return __turn__;
}

var Record_screen_UPDATE = (a,b) => {
    return(a + " 를(을) 사용하여 " + b + " 의 피해를 주었다 !")
}



var print = () => {
    my_Record_screen.skill_name = gamers_CDR_list[gamers_CDR].name
    my_Record_screen.skiil_hp = my_hp
    another_Record_screen.skill_name = computer_level_list[how_much_hard].name
    another_Record_screen.skiil_hp = others_hp
    if (single_turn == true){
        turn_disp.text = gamers_CDR_list[gamers_CDR].name + " 님의 차례입니다."
    } else {
        turn_disp.text = computer_level_list[how_much_hard].name + " 님의 차례입니다."
    }
    if(my_hp<=0 || others_hp<=0){        
        game_play_seen.seen = false;
        defult_menu_seen.seen = true;

    }
}

var my_Record_screen = new Vue({
    el: "#my_screen",
    data: {
        skill_name: "",
        skiil_hp: 0,
        skill_detail: ""
    }
});

var another_Record_screen = new Vue({
    el: "#another_screen",
    data: {
        skill_name: "",
        skiil_hp: 0,
        skill_detail: ""
    },
});

/////////////////////////////////// knight
var knight = new Vue({
    el: "#knight",
    data: {
        seen: false
    }
})

var glory_of_glory = () => {
    if (single_turn == true){
        others_hp -= 7
        single_turn = false
        print();
        my_Record_screen.skill_detail = Record_screen_UPDATE("영광의 일격", 7);
        my_time = setTimeout(computer_turn, 2000);
    }
}



///////////////////////////////// computer
var computer_turn = () => {
    if (1 > Math.floor(Math.random() * 11)){
        computer_attack_2();
    } else {
        computer_attack_1();
    }
}
var computer_attack_1 = () => {
    if (single_turn == false){
        my_hp -= (computer_level_list[how_much_hard].damage - gamers_CDR_list[gamers_CDR].defence);
        single_turn = true;
        another_Record_screen.skill_detail = Record_screen_UPDATE("10MV", computer_level_list[how_much_hard].damage);
        print();
    }
}

var computer_attack_2 = () => {
    if (single_turn == false){
        my_hp -= (computer_level_list[how_much_hard].damage * 2 - gamers_CDR_list[gamers_CDR].defence);
        single_turn = true;
        another_Record_screen.skill_detail = Record_screen_UPDATE("과부화", computer_level_list[how_much_hard].damage * 1.3);
        print();
    }
}





/////////////////////////////////




/////////////////////////////////////////
//////////////// 컴포넌트 ////////////////
/////////////////////////////////////////
Vue.component('spinners_for_player', {
    template: '<div class="spinner-grow text-muted"></div>'
  })


//Skills
Vue.component('Sword', {
    template: '\
    <img src="https://img.icons8.com/color/48/000000/sword.png">\
    '
})
Vue.component('Shield', {
    template: '\
    <img src="https://img.icons8.com/color/48/000000/knight-shield.png"> \
    '
})





$(document).ready(function() {
    $('.toast').toast('show');
    $("#p_button").click(function(){
        $('.toast').toast('show');
        $('[data-toggle="popover"]').popover(); 
    });
    $("#q_button").click(function(){
        $('.toast').toast('show');
        $('[data-toggle="popover"]').popover(); 
    });
    $("#w_button").click(function(){
        $('.toast').toast('show');
        $('[data-toggle="popover"]').popover(); 
    });
  });

