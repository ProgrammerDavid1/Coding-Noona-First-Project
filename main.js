//랜덤 번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췃습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호 > 유저 번호 Up!!
//Reset 버튼을 누르면 게임이 리셋된다
// 10번의 기회를 다쓰면 게임이 끝난다(더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.
// 입력 칸에 마우스 커서를 가져다 대면 자동으로 숫자가 사라진다
// 정답을 맞추면 버튼이 disable된다

let computerPickRandomNumber=0;
let inputNumber=document.getElementById("input-area");
let chanceArea=document.getElementById("chance-area");
let chances=10;
let GoButton=document.getElementById("Go!"); //버튼 아이디 값 가져오기
let resetButton=document.getElementById("Reset!");
let history=[];
let resultArea=document.getElementById("result-area");
let gameStart=document.getElementById("gameStart");
let imageArea=document.querySelector(".main-img"); //자바스크립트 문법으로 이미지 첨가할거면 getid가 아니라 querySelector로 class를 선택해줘야함!!
let historyArea=document.getElementById("history-area");
GoButton.addEventListener("click",play); //playButton에 즉, Go! 버튼을 누르면 발생하는 이벤트 추가. play가 실행
resetButton.addEventListener("click",reset); //click 말고 focus나 mouseover등등 더 다양하게 존재
inputNumber.addEventListener("focus",remove);


function remove(){
    inputNumber.value=""; //절대 userInput으로 하면 안되고, userInput.value로 해야지. 내용물이 ""로 바뀌는거지 userInput이 ""면 계속해서 맞췄습니다!로 나오지. 배열에 ""이 들어가니까 
}

function reset(){
    imageArea.src = "맨시티 챔스 우승.gif"; //src도 함수가 아니라서 ()가 아니고 = 으로 접근
    chances=10;
    inputNumber.value="";  //inputNumber 창이 깨끗하게 정리되고
    RandomNumber(); //새로운 번호가 생성되고
    GoButton.disabled=false; // disabled 된 gobutton이 다시 활성화
    gameStart.textContent='자 그럼 게임을 다시 시작해볼까!!'; //textContent는 함수가 아니여서 () 하면 안되고 = 으로 접근해야함!
    resultArea.textContent= "";
    chanceArea.textContent=`남은 기회: ${chances}번`;
    historyArea.textContent = "";
    history=[];
}


function play(){
    console.log("정답은: ",computerPickRandomNumber);

    if(inputNumber.value<1 || inputNumber.value>100){ 
        //userInput 즉 사용자가 입력한 숫자를 가져온다.value로 가져오기
        resultArea.textContent="1~100 범위 내에 숫자를 입력해주세요.";
        return; //return이 없으면 이 경우에도 기회가 깎이기 때문에 return을 해줘서 그러지 않게 해주기!!
    }
    if(history.includes(inputNumber.value)){
        resultArea.textContent="이미 입력한 숫자입니다. 숫자를 다시 입력해주세요";
        return; //return이 없으면 이 경우에도 기회가 깎이기 때문에 return을 해줘서 그러지 않게 해주기!!
    }
    
    chances--;
    chanceArea.textContent=`남은 기회: ${chances}번`;
    if(inputNumber.value<computerPickRandomNumber){
        imageArea.src = 'up.jpg'; 
        imageArea.style.width = '500px'; // 최대 너비 설정
        imageArea.style.height = 'auto'; // 높이 자동 조정
        resultArea.textContent="Up!!"; //resultArea가 결과를 알려주는 그 칸이니까 그 칸에다가 textContent를 사용해서 그 칸에 글귀를 입력해주는거지
    }else if(inputNumber.value>computerPickRandomNumber){
        imageArea.src = 'down.jpg'; 
        imageArea.style.width = '500px'; // 최대 너비 설정
        imageArea.style.height = 'auto'; // 높이 자동 조정
        resultArea.textContent="Down!!";
    }else{
        imageArea.src = 'success.jpg';
        imageArea.style.width = '500px'; // 최대 너비 설정
        imageArea.style.height = 'auto'; // 높이 자동 조정 
        resultArea.textContent="맞췄습니다! 축하드립니다!!";
        GoButton.disabled=true; //disabled는 함수가 아니여서()하면 안되고 = 으로 접근해야함!
    }//정답을 맞추면 go! disable

    if(chances==0){
        resultArea.textContent=`기회가 모두 소진되었습니다. 정답은 ${computerPickRandomNumber}이였습니다. 재시작은 Reset 버튼을 눌러주세요!`;
        GoButton.disabled=true;
    }
    if(chances==0 && inputNumber.value==computerPickRandomNumber){
        resultArea.textContent=`맞췄습니다! 축하드립니다!!`;
        GoButton.disabled=true; //disabled는 함수가 아니여서()하면 안되고 = 으로 접근해야함!
    }
    
    history.push(inputNumber.value); //배열에 이미 입력한 숫자 삽입
    historyArea.textContent = `현재까지 입력한 숫자: ${history}`;  //현재까지 입력한 숫자 리스트
}


function RandomNumber(){
    computerPickRandomNumber=Math.floor(Math.random()*100)+1// //랜덤 번호 지정 1~100
}
RandomNumber();
