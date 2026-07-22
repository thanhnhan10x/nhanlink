// ===============================
// NHẬP LINK
// ===============================

const input = document.getElementById("link");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const resultBox = document.getElementById("resultBox");
const toast = document.getElementById("toast");

// ===============================
// TẠO LINK
// ===============================

function createLink() {

    const link = input.value.trim();

    if (link === "") {

        showToast("Vui lòng nhập link Shopee");

        return;

    }

    loading.style.display = "block";

    resultBox.style.display = "none";

    setTimeout(() => {

        loading.style.display = "none";

        resultBox.style.display = "block";

        // Demo
        result.value = link;

        showToast("Chuyển đổi thành công");

    }, 1000);

}

// ===============================
// COPY
// ===============================

function copyLink() {

    if (result.value == "") {

        showToast("Chưa có link");

        return;

    }

    navigator.clipboard.writeText(result.value);

    showToast("Đã copy");

}

// ===============================
// MUA NGAY
// ===============================

function openLink() {

    if (result.value == "") {

        showToast("Chưa có link");

        return;

    }

    window.open(result.value, "_blank");

}

// ===============================
// PASTE
// ===============================

async function pasteClipboard(){

    try{

        const text = await navigator.clipboard.readText();

        input.value = text;

        showToast("Đã dán");

    }catch{

        showToast("Không đọc được Clipboard");

    }

}

// ===============================
// TOAST
// ===============================

function showToast(message){

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// ===============================
// GUIDE
// ===============================

function toggleGuide(){

    const body = document.getElementById("guideBody");

    const arrow = document.getElementById("guideArrow");

    if(body.style.display==="none"){

        body.style.display="block";

        arrow.innerHTML="▲";

    }else{

        body.style.display="none";

        arrow.innerHTML="▼";

    }

}

// ===============================
// LIVE NOTIFY
// ===============================

const users=[

"lon",

"han",

"thu",

"nhu",

"quy",

"kha",

"tua",

"tri",

"ngu",

"phu",

"dun",

"huy"

];

function liveNotify(){

    const box=document.getElementById("liveNotify");

    const name=document.getElementById("notifyName");

    const time=document.getElementById("notifyTime");

    const random=users[Math.floor(Math.random()*users.length)];

    const second=Math.floor(Math.random()*45)+5;

    name.innerHTML=random;

    time.innerHTML=second+" giây trước";

    box.classList.add("show");

    setTimeout(()=>{

        box.classList.remove("show");

    },4000);

}

setInterval(liveNotify,7000);

setTimeout(liveNotify,2000);