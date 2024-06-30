//랜덤 번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췃습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번혹 > 유저 번호 Up!!
//Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다(더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.


let randomNumber=0;
let playButton=document.getElementById("play-button"); //버튼 아이디 값 가져오기
let userInput=document.getElementById("user-input"); //입력 칸 아이디 값 가져오기
let resultArea=document.getElementById("result-area");
let resetButton=document.getElementById("reset-button");
let chances= 10 ;
let gameOver=false;
let chanceArea=document.getElementById("chance-area");
let history=[];

//playButton에 즉, Go! 버튼을 누르면 발생하는 이벤트 추가. play가 실행
playButton.addEventListener("click",play); //click 말고 focus나 mouseover등등 더 다양하게 존재
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){
    userInput.value=""; //절대 userInput으로 하면 안되고, userInput.value로 해야지. 내용물이 ""로 바뀌는거지 userInput이 ""면 계속해서 맞췄습니다!로 나오지. 배열에 ""이 들어가니까 
});

function pickRandomNum(){ 
    randomNumber=Math.floor(Math.random()*100)+1; //랜덤 번호 지정 1~100
    console.log("정답:",randomNumber);
}

function play(){
    let userValue=userInput.value; //userInput 즉 사용자가 입력한 숫자를 가져온다.value로 가져오기
    
    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100 사이의 숫자를 입력해주세요.";
        return; //return이 없으면 이 경우에도 기회가 깎이기 때문에 return을 해줘서 그러지 않게 해주기!!
    }
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }

    chances--;
    chanceArea.textContent=`남은 기회: ${chances}번`;
    
    if(userValue<randomNumber){
        resultArea.textContent="Up!!!"; //resultArea가 결과를 알려주는 그 칸이니까 그 칸에다가 textContent를 사용해서 그 칸에 글귀를 입력해주는거지
    }else if(userValue>randomNumber){
        resultArea.textContent="Down!!!";
    }else{
        resultArea.textContent="맞추셨습니다!!!";
        gameOver=true; //정답을 맞추면 go! disable
    }

    history.push(userValue); //배열에 이미 입력한 숫자 삽입

    if(chances==0){
        gameOver=true;
    }

    if(gameOver==true){
        playButton.disabled = true;
    }

}

function reset(){
    //user input 창이 깨끗하게 정리되고
    userInput.value="";
    //새로운 번호가 생성되고
    pickRandomNum();
    playButton.disabled=false;

    resultArea.textContent="결과값이 여기 나옵니다!!";
}

pickRandomNum();