/* =====================================
   NHANLINK V2
===================================== */

const input = document.getElementById("link");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const toast = document.getElementById("toast");

let affiliateLink = "";

/* ==============================
   Kiểm tra link Shopee
============================== */

function isShopeeLink(url) {

    const domains = [
        "shopee.vn",
        "shp.ee",
        "vn.shp.ee"
    ];

    return domains.some(domain => url.includes(domain));

}

/* ==============================
   Loading
============================== */

function showLoading() {

    loading.style.display = "block";

}

function hideLoading() {

    loading.style.display = "none";

}

/* ==============================
   Toast
============================== */

function showToast(message) {

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* ==============================
   Demo chuyển đổi
   Sau này chỉ sửa hàm này
============================== */

async function convertAffiliateLink(url) {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve(url);

        }, 1200);

    });

}

/* ==============================
   Chuyển đổi
============================== */

async function createLink() {

    const url = input.value.trim();

    if (url === "") {

        showToast("Vui lòng nhập link.");

        input.focus();

        return;

    }

    if (!isShopeeLink(url)) {

        showToast("Đây không phải link Shopee.");

        input.focus();

        return;

    }

    showLoading();

    affiliateLink = await convertAffiliateLink(url);

    hideLoading();

    result.value = affiliateLink;

    showToast("Chuyển đổi thành công.");

}

/* ==============================
   Copy
============================== */

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

/* ==============================
   Mở link
============================== */

function openLink() {

    if (result.value === "") {

        showToast("Chưa có link.");

        return;

    }

    window.open(result.value, "_blank");

}

/* ==============================
   Enter
============================== */

input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        createLink();

    }

});

/* ==============================
   Paste tự động
============================== */

input.addEventListener("paste", function () {

    setTimeout(() => {

        const value = input.value.trim();

        if (isShopeeLink(value)) {

            showToast("Đã nhận diện link Shopee.");

        }

    }, 200);

});

/* ==============================
   Auto resize textarea
============================== */

result.addEventListener("input", function () {

    this.style.height = "auto";

    this.style.height = this.scrollHeight + "px";

});

/* ==============================
   Khởi tạo
============================== */

window.onload = function () {

    hideLoading();

};