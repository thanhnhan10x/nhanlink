const input = document.getElementById("link");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const toast = document.getElementById("toast");

async function createLink() {

    const link = input.value.trim();

    if (link === "") {
        showToast("Vui lòng nhập link Shopee");
        return;
    }

    if (!isShopeeLink(link)) {
        showToast("Đây không phải link Shopee");
        return;
    }

    loading.style.display = "flex";
    result.value = "Đang chuyển đổi...";

    const formData = new FormData();
    formData.append("link", link);

    try {

        const response = await fetch("api/create-link.php", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.status === "success") {
            result.value = data.affiliateLink;
            showToast("Chuyển đổi thành công");
        } else {
            result.value = "";
            showToast(data.message);
        }

    } catch (e) {
        result.value = "";
        showToast("Không thể kết nối máy chủ");
    }

    loading.style.display = "none";
}

function copyLink() {

    if (result.value.trim() === "") {
        showToast("Chưa có link để copy");
        return;
    }

    navigator.clipboard.writeText(result.value);
    showToast("Đã copy vào clipboard");
}

function openLink() {

    const link = result.value.trim();

    if (link === "") {
        showToast("Chưa có link để mở");
        return;
    }

    window.open(link, "_blank");
}

function isShopeeLink(link) {
    return link.includes("shopee.vn") || link.includes("s.shopee.vn");
}

function showToast(message) {

    toast.innerText = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        createLink();
    }
});