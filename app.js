const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // 캔버스의 드로잉 컨텍스트를 반환 2d

ctx.strokeStyle = "#2c2c2c"; // 도형의 윤곽선 색을 설정
ctx.lineWIdth = 2.5; // 선 굵기 설정

let painting = false;

function stopPainting() { // 페인팅 멈추는 메소드
    paint = false;
}

function startPainting() { // 페인팅 시작하는 메소드
    paint = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) { // 캔버스위에서 누르지 않은 상태면 Path(길)을 만들고 x, y를 움직인다
        // 클릭하고 움직이면 이것은 작동하지 않음
        ctx.beginPath(); // 새로운 길 만듬
        ctx.moveTo(x, y); // x, y에서 길 시작
    } else {
        ctx.lineTo(x, y); // x, y에서 길 끝
        ctx.stroke(); // 주어진 경로로 획을 그음 
    }
}

function onMouseDown(event) { // 마우스 눌러서 패인팅 하는 걸 알려주는 메소드
    painting = true;
}


if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}