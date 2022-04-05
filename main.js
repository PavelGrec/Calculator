`use strict`
const count = document.querySelector('.count');
const show = document.querySelector('.show');
const saveUl = document.querySelector('.saveUl');
const btnSave = document.querySelector('.save');
const operator =['+','-','*','/'];
const num = ['1','2','3','4','5','6','7','8','9','0']
let nowCount =''
let dataSave = []
let nowNumber =''
let local = localStorage.getItem('saveData')

function writer(x) {
    btnSave.style.display='none';
    console.log(x);
    if (operator.includes(x)) {
        if(operator.includes(count.textContent.slice(-1))){
            count.innerText = count.textContent.slice(0,-1)
        }
        if(count.innerText==''||count.innerText=='\xa0'){count.innerText=nowNumber}
    }
    if(x==='back') {back()}
    if(x==='='){resoult()}
    else{count.innerText +=x}
}

function back(){
    count.innerText = count.innerText.slice(0,-1)
}
function deleter(){
    count.innerText='\xa0';
    show.innerText ='\xa0';
    nowCount ='';
    nowNumber = '';
}
function keypress(x) {
    if(operator.includes(x)){writer(x)}
    if(num.includes(x)){writer(x)}
    if(x==="="){resoult()}
    if(x==="b"){back()}
    if(x==='w') {document.querySelector('.hide').classList.toggle('active');document.querySelector('.btnBack').classList.toggle('active')}
}


function resoult() {
    if (count.innerText==''){
        show.innerText='0'
    }
    else{
        nowNumber = eval(count.innerText);
        if(nowNumber === Infinity){nowNumber='error'};
        if(nowNumber === undefined){nowNumber='0'};
        nowCount =count.innerText
        count.innerText ='\xa0';
        show.innerText=nowNumber
        btnSave.style.display='block';
    }

}
function save() {
    let savePc ={
        id:dataSave.length,
        number:nowNumber,
        count:nowCount
    }
    dataSave.push(savePc);
    console.log(dataSave);
    actual()
}
function actual(){
    if(dataSave.length>12){dataSave.pop(dataSave[0])}
    saveUl.innerHTML='';
    dataSave.forEach(function actualone(dato) {
        let li = document.createElement('li')
        li.classList.add('liSave')
        saveUl.appendChild(li)
        li.setAttribute('onclick','fromSaveToCount(this)')
        li.innerHTML =
        `
        <p class="listp res">${dato.number}</p>
        <p class="listp calc">${dato.count}</p>
        `
        let btn = document.createElement('button')
        btn.classList.add('liCross')
        btn.innerText='x'
        li.appendChild(btn)
        li.addEventListener('click',()=>nowNumber=dato.number)
        btn.addEventListener('click',(dato)=>liPop(dato))

        // saveUl.innerHTML +=
        // `
        // <li class='theLi' onclick="fromSaveToCount(this)">
        //     <p class="listp res">${dato.number}</p>
        //     <p class="listp calc">${dato.count}</p>
        //     <button class="liCross">x</button>
        // </li>
        // `
    })
}
function showhide() {
    document.querySelector('.hide').classList.add('active')
    document.querySelector('.btnBack').classList.add('active')
}
function unhide(){
    document.querySelector('.hide').classList.remove('active')
    document.querySelector('.btnBack').classList.remove('active')
}
function fromSaveToCount(x){
    let  theNumber = x.firstElementChild.innerText
    console.log(theNumber);
    count.innerText =theNumber;
    show.innerText ='\xa0'
    unhide()
}
function liPop(x) {
    console.log(dataSave);
    dataSave.pop(x)
    actual()
}
function questionmark() {
    document.querySelector('.about').classList.toggle('active')  
}