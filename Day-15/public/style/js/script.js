window.addEventListener("load", function () {
    renderSweetAlert();
    const btnStarted = document.querySelector(".btn-started");
    btnStarted.addEventListener("click", function () {
        window.location.href = "/tutorial";
    });

    const btnApp = document.querySelector(".btn-action");
    btnApp.addEventListener("click", function () {
        window.location.href = "/home";
    });

    function renderSweetAlert() {
        const template = `<div class="notification">
        <i
            class="fa-solid fa-circle-check check"
            style="color: #1ef65f"
        ></i>
        <p class="desc">Hello my friend, let use Todo App!</p>
        <i class="fa-solid fa-xmark exit" style="color: #ffffff"></i>
    </div>`;
        document.body.insertAdjacentHTML("beforeend", template);
    }
    const notifi = document.querySelector(".notification");
    setTimeout(function () {
        notifi.parentElement.removeChild(notifi);
    }, 2000);
});
