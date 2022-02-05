// JSON file에서 데이터를 받아오는 함수 (fetch 활용)
function loadList() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.list)
}

// list를 파라미터로 받아오기
// 받아온 list 데이터 중 item (각 항목) html>ul>li로 변환해주는 함수 (map / join 활용 )
// join: 배열의 모든 요소를 연결해 하나의 문자열로 만드는 APi
function displayList(list) {
  const container = document.querySelector(".list");

  container.innerHTML = list.map(item => createHTMLString(item)).join("");
}

// list의 배열의 각 원소(item)를 파라미터로 받아오기
// 받아온 itme을 li태그로 만들기 (template literal 활용)
function createHTMLString(item) {
  return `<li>
      <img src="${item.image}" alt="${item.type}" class="imgItem">
      <span> ${item.gender}, ${item.size} size </span>
    </li>`
}

// 이벤트 처리함수는 on~~ 파라미터로 e를 받음
// 1. 버튼을 클릭할 때 list를 필터하여 받은 item들을 새로운 배열로 만듦 (filter 활용 );
// 1. 1번 사용 시 클릭 할 때마다 요소들을 만들어서 innerHTML함수 업데이트 >> 전체가 업데이트 
// 2. 1번 개선하기 위해 전체리스트를 유지하면서 버튼과 item의 key와 value가 일치하는 항목의 display 속성만 변경.
// custom propery (dataset 활용)
// 해당 data가 없는 경우 아무 처리를 하지 않음.
function onBtnClick(e, list) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key === null || value === null) {
    return
  }

  displayList(list.filter(item => item[key] === value)); 
}

// list, key, value를 파라미터로 받음
// list의 key와 value가 일치하면 display 속성 변경
// visible 속성 사용할 시 배열의 값은 숨겨지면 index도 바뀌는 것인지?.. > console 찍어보셈
function updateItems(list, key, value) {
  
  
}

// list를 파라미터로 받아오기
// 로고와 버튼이 들어있는 컨테이너 자체에 함수 등록 (이벤트 위임, 하나씩 등록하는 것 보다 효율적)
// 로고 선택: 모든 item 전달하는 displayList 함수
// 버튼(컨테이너) 선택: 이벤트 인자 전달하는 onBtnClick 함수
function setEventListener(list) {
  const logo = document.querySelector(".logo");
  const btnGroup = document.querySelector(".btnGroup");

  logo.onclick = () => {
    displayList(list);
  }
  btnGroup.onclick = (e) => {
    onBtnClick(e, list)
  }
}

// main
loadList()
  //JSON file에 있는 데이터를 가져오는 것이기 때문에 promise return
  .then(list => {
    // 받아온 data를 HTML 화면 상 표시
      displayList(list);
    // 버튼 클릭 이벤트 시 필터링
      setEventListener(list);
    })
.catch(console.log("에러"))