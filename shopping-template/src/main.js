function loadList() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.list)
}

function displayList(list) {
  const container = document.querySelector(".list");

  container.innerHTML = list.map(item => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `<li>
      <img src="${item.image}" alt="${item.type}" class="imgItem">
      <span> ${item.gender}, ${item.size} size </span>
    </li>`
}

function onBtnClick(e, list) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayList(list.filter(item => item[key] === value));
}

function updateItems(list, key, value) {
  list.forEach(item => {
    if(item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}


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