const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // 캔버스의 드로잉 컨텍스트를 반환 2d
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c"; // 디폴트 색
const CAMVAS_SIZE = 700; // 캔버스 사이즈


canvas.width = CAMVAS_SIZE; // 캔버스의 실제 사이즈는 줘야하나봄 CSS로 지정했으니 똑같이 기본값은 300
canvas.height = CAMVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR; // 도형의 윤곽선 색을 설정
ctx.fillStyle = INITIAL_COLOR // 채우는 색 디폴트 설정
ctx.lineWidth = 2.5; // 선 굵기 설정

let painting = false; // 페인팅 기본값 false
let filling = false;


function stopPainting() { // 페인팅 멈추는 메소드
    painting = false;
}

function startPainting() { // 페인팅 시작하는 메소드
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) { // 캔버스위에서 누르지 않은 상태면 Path(길)을 만들고 x, y를 움직인다
        // 클릭하고 움직이면 이것은 작동하지 않음
        ctx.beginPath(); // 새로운 길 만듬
        ctx.moveTo(x, y); // x, y에서 길 시작 (Path(길) = line(라인))
    } else {
        ctx.lineTo(x, y); // x, y에서 길 끝, Path의 전 위치랑 연결 됌 그래서
        // 그래서 선을 그리는것처럼 보이는거임
        ctx.stroke(); // 주어진 경로로 획을 그음 
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor; // 이벤트가 일어나는 객체 배열에서
    // backgroundColor만 가져옴
    ctx.strokeStyle = color; // 선 색깔을 가져온 색으로 변경
    ctx.fillStyle = color; // 클릭하면 채우는 색깔도 가져온 색으로 변경;
}

function handleRangeChange(event) {
    const size = event.target.value; // 선의 사이즈값을 받아와서
    ctx.lineWidth = size; // 사이즈 변경
}


function handleModeCLick() { // filling 모드와 painting 모드의 변환 펑션
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasCLick() {
    if(filling) { // filling이 false일때는 실행하지 않음 handleModeClick함수와 밀접한 관련
        ctx.fillRect(0, 0, CAMVAS_SIZE, CAMVAS_SIZE); // 클릭시 0, 0 좌표에서 캔버스 사이즈만큼 색깔로 채운다. 
    }
}


if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직인다면 이 function은 실행중이다
    canvas.addEventListener("mousedown", startPainting); // 클릭하면 이 function 실행
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasCLick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
// Array.from으로 배열생성후 color배열을 익명 이벤트 리스너로 연결 click이벤트시 반응해서 handleColorClick 함수 실행

if(range) {
    range.addEventListener("input", handleRangeChange); // 굵기조절 input이벤트 발생시 감지하여 펑션 실행
}

if(mode) {
    mode.addEventListener("click", handleModeCLick); // 클릭시 fill과 paint의 모드 변경하는 펑셩 실행
}