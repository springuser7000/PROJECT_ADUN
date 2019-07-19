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
let how_much_turn = 0;
let how_much_hard = 0;
let gamers_CDR = 0;
let my_hp, others_hp;
let my_choose = false;
let my_time;
let my_point = 0;
let others_point = 0;
const gamers_CDR_list = [{'name': '테세우스', 'hp': 200, 'defence': 3, 'point': 3}, {'name': '디오메데스', 'hp': 250, 'defence': 0, 'point': 3}];
const computer_level_list = [{'name':'인공지능(쉬움)', 'hp': 100, 'damage': 7, 'point': 3},{'name':'인공지능(보통)', 'hp': 250, 'damage': 12, 'point': 3},{'name':'인공지능(어려움)', 'hp': 390, 'damage': 16, 'point': 5}];


/////////////////////////////////// all 

var point_do = (a) => {
    if (a == true){
        my_point += gamers_CDR_list[gamers_CDR].point
    } else {
        others_point += computer_level_list[how_much_hard].point
    }
}


var pass_turn = () => {
    my_Record_screen.skill_detail = " 턴을 넘겼습니다 !"
    my_time = setTimeout(computer_turn, 2000);
    how_much_turn += 1
    point_do(true);
    single_turn = false
    print();
}

/////////////////////////////////// 새로운 캐릭터 정의하기 전에 !

/*

var 스킬명 = () => {
    if ((single_turn == true) && ( my_point >= 필요량 )){
        my_point -= 필요량
        others_hp -= 데미지
        print();
        my_Record_screen.skill_detail = Record_screen_UPDATE("스킬명", 데미지);
        my_time = setTimeout(computer_turn, 2000);
        how_much_turn += 1
        point_do(true)
        single_turn = false
    }
}

*/

/////////////////////////////////// knight
var knight1 = new Vue({
    el: "#knight",
    data: {
        seeen: false
    }
})

var glory_of_glory = () => {
    if ((single_turn == true)  && ( my_point >= 2 )){
        my_point -= 2
        others_hp -= 7
        print();
        my_Record_screen.skill_detail = Record_screen_UPDATE("영광의 일격", 7);
        my_time = setTimeout(computer_turn, 2000);
        how_much_turn += 1
        point_do(true)
        single_turn = false
        print();
    }
}
///////////////////////////////// diomedes

var diomedes = new Vue({
    el: "#diomedes",
    data: {
        seeen: false
    }
})



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
        print();
        my_hp -= (computer_level_list[how_much_hard].damage - gamers_CDR_list[gamers_CDR].defence);
        single_turn = true;
        another_Record_screen.skill_detail = Record_screen_UPDATE("10MV", computer_level_list[how_much_hard].damage);
        print();
        how_much_turn += 1
    }
}

var computer_attack_2 = () => {
    if (single_turn == false){
        print();
        my_hp -= (computer_level_list[how_much_hard].damage * 2 - gamers_CDR_list[gamers_CDR].defence);
        single_turn = true;
        another_Record_screen.skill_detail = Record_screen_UPDATE("과부화", computer_level_list[how_much_hard].damage * 2);
        print();
        how_much_turn += 1
    }
}

///////////////////////////////// game play

var turn_disp = new Vue({
    el: "#turn_display",
    data: {
        text: ""
    }
})

var point_disp = new Vue({
    el: '#point_display',
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
        knight1.seeen = true;
    } else if (gamers_CDR == 1){
        diomedes.seeen = true;
    }
    single_turn = Turn_make()
    is_fighting = true;
    my_hp = gamers_CDR_list[gamers_CDR].hp;
    others_hp = computer_level_list[how_much_hard].hp;
    print();
    my_point = 0;
    others_point = 0;
    point_do(true)
    print();
    if (single_turn == false){my_time = setTimeout(computer_turn, 2000);}
    print();
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
    point_disp.text = String(my_point)
    if (single_turn == true){
        turn_disp.text = gamers_CDR_list[gamers_CDR].name + " 님의 차례입니다."
    } else if (single_turn == false) {
        turn_disp.text = computer_level_list[how_much_hard].name + " 님의 차례입니다."
    }
    if(my_hp<=0 || others_hp<=0){        
        game_play_seen.seen = false;
        defult_menu_seen.seen = true;
        $('[data-toggle="tooltip"]').hide(); 
        $('[data-toggle="popover"]').hide(); 
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
    $('[data-toggle="tooltip"]').tooltip(); 
    $('.toast').toast('show');
    $("#p_button").click(function(){
        $('[data-toggle="tooltip"]').show(); 
        $('[data-toggle="popover"]').show(); 
        $('[data-toggle="tooltip"]').tooltip(); 
        $('.toast').toast('show');
        $('[data-toggle="popover"]').popover(); 
    });
    $("#q_button").click(function(){
        $('[data-toggle="tooltip"]').show(); 
        $('[data-toggle="popover"]').show(); 
        $('[data-toggle="tooltip"]').tooltip(); 
        $('.toast').toast('show');
        $('[data-toggle="popover"]').popover(); 
    });
    $("#w_button").click(function(){
        $('[data-toggle="tooltip"]').show(); 
        $('[data-toggle="popover"]').show(); 
        $('[data-toggle="tooltip"]').tooltip(); 
        $('.toast').toast('show');
        $('[data-toggle="popover"]').popover(); 
    });
  });

