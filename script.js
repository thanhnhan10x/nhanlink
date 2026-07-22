/* ==========================================
   NHANLINK V3
========================================== */

const input = document.getElementById("link");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const toast = document.getElementById("toast");

let affiliateLink = "";

/* ==========================================
   Loading
========================================== */

function showLoading() {
    loading.classList.remove("d-none");
}

function hideLoading() {
    loading.classList.add("d-none");
}

/* ==========================================
   Toast
========================================== */

function showToast(message) {

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* ==========================================
   Kiểm tra link Shopee
========================================== */

function isShopeeLink(url) {

    const domains = [

        "shopee.vn",

        "shp.ee",

        "vn.shp.ee"

    ];

    return domains.some(domain => url.includes(domain));

}

/* ==========================================
   Demo API
   Sau này chỉ sửa hàm này
========================================== */

async function convertAffiliateLink(url) {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve(url);

        }, 1200);

    });

}

/* ==========================================
   Chuyển đổi
========================================== */

async function createLink() {

    const url = input.value.trim();

    if (url === "") {

        showToast("Vui lòng nhập link Shopee.");

        input.focus();

        return;

    }

    if (!isShopeeLink(url)) {

        showToast("Link không hợp lệ.");

        input.focus();

        return;

    }

    showLoading();

    try {

        affiliateLink = await convertAffiliateLink(url);

        result.value = affiliateLink;

        showToast("Tạo Affiliate Link thành công.");

    }

    catch (e) {

        showToast("Có lỗi xảy ra.");

    }

    finally {

        hideLoading();

    }

}

/* ==========================================
   Copy
========================================== */

async function copyLink() {

    if (result.value === "") {

        showToast("Chưa có link.");

        return;

    }

    try {

        await navigator.clipboard.writeText(result.value);

        showToast("Đã copy.");

    }

    catch {

        result.select();

        document.execCommand("copy");

        showToast("Đã copy.");

    }

}

/* ==========================================
   Mở link
========================================== */

function openLink() {

    if (result.value === "") {

        showToast("Chưa có link.");

        return;

    }

    window.open(result.value, "_blank");

}

/* ==========================================
   Enter
========================================== */

input.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        createLink();

    }

});

/* ==========================================
   Paste
========================================== */

input.addEventListener("paste",function(){

    setTimeout(()=>{

        if(isShopeeLink(input.value)){

            showToast("Đã nhận diện link Shopee.");

        }

    },200);

});

/* ==========================================
   Auto Height
========================================== */

result.addEventListener("input",function(){

    this.style.height="auto";

    this.style.height=this.scrollHeight+"px";

});

/* ==========================================
   Init
========================================== */

window.onload=function(){

    hideLoading();

};
const names = [
"Lan***",
"Nam***",
"Hùng***",
"Linh***",
"Minh***",
"Tuấn***",
"Hải***",
"Trang***",
"Thảo***",
"Vy***",
"An***",
"Đức***"
];

const times = [
"Vừa xong",
"10 giây trước",
"30 giây trước",
"1 phút trước",
"2 phút trước",
"5 phút trước"
];

function showNotify(){

    const box=document.getElementById("liveNotify");

    document.getElementById("notifyName").innerHTML=
        names[Math.floor(Math.random()*names.length)];

    document.getElementById("notifyTime").innerHTML=
        times[Math.floor(Math.random()*times.length)];

    box.classList.add("show");

    setTimeout(()=>{
        box.classList.remove("show");
    },4000);

}

showNotify();

setInterval(showNotify,7000);