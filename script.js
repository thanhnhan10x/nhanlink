// =====================================
// NHANLINK V1.0
// script.js
// =====================================

const input = document.getElementById("link");
const result = document.getElementById("result");
const convertBtn = document.querySelector(".convert-btn");
const toast = document.getElementById("toast");

/* ===========================
   TẠO LINK
=========================== */

async function createLink() {

    const link = input.value.trim();

    if (link === "") {

        showToast("Vui lòng nhập link Shopee");

        input.focus();

        return;

    }

    if (!isShopeeLink(link)) {

        showToast("Đây không phải link Shopee");

        return;

    }

    setLoading(true);

    let formData = new FormData();

    formData.append("link", link);

    try {

        const response = await fetch("api/create-link.php", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        if (data.status === "success") {

            result.value = data.affiliateLink;

            autoResize();

            showToast("Tạo link thành công");

        } else {

            result.value = "";

            showToast(data.message);

        }

    }

    catch (error) {

        console.log(error);

        showToast("Không thể kết nối máy chủ");

    }

    setLoading(false);

}

/* ===========================
   COPY
=========================== */

async function copyLink() {

    if (result.value.trim() === "") {

        showToast("Chưa có link để copy");

        return;

    }

    try {

        await navigator.clipboard.writeText(result.value);

        showToast("Đã copy thành công");

    }

    catch {

        result.select();

        document.execCommand("copy");

        showToast("Đã copy");

    }

}

/* ===========================
   DÁN TỪ CLIPBOARD
=========================== */

async function pasteClipboard() {

    try {

        const text = await navigator.clipboard.readText();

        input.value = text;

        input.focus();

        showToast("Đã dán");

    }

    catch {

        showToast("Trình duyệt không cho phép");

    }

}

/* ===========================
   KIỂM TRA LINK
=========================== */

function isShopeeLink(link) {

    return (

        link.includes("shopee.vn") ||

        link.includes("s.shopee.vn")

    );

}

/* ===========================
   LOADING
=========================== */

function setLoading(status) {

    if (status) {

        convertBtn.classList.add("loading");

        convertBtn.disabled = true;

        convertBtn.innerHTML = "";

    } else {

        convertBtn.classList.remove("loading");

        convertBtn.disabled = false;

        convertBtn.innerHTML = "CHUYỂN ĐỔI LINK";

    }

}

/* ===========================
   TOAST
=========================== */

function showToast(message) {

    toast.innerHTML = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}

/* ===========================
   TEXTAREA AUTO HEIGHT
=========================== */

function autoResize() {

    result.style.height = "auto";

    result.style.height = result.scrollHeight + "px";

}

/* ===========================
   ENTER
=========================== */

input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        createLink();

    }

});

/* ===========================
   DÁN TỰ ĐỘNG
=========================== */

window.addEventListener("paste", function (e) {

    if (document.activeElement === input) return;

    const text = e.clipboardData.getData("text");

    if (isShopeeLink(text)) {

        input.value = text;

    }

});

/* ===========================
   XÓA KẾT QUẢ KHI NHẬP MỚI
=========================== */

input.addEventListener("input", function () {

    result.value = "";

    autoResize();

});

/* ===========================
   FOCUS
=========================== */

window.onload = function () {

    input.focus();

};