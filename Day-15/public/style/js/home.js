window.addEventListener("load", function () {
    const formInput = document.querySelector(".form-input");
    formInput.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            e.preventDefault();
            formInput.submit();
        }
    });
    const question = document.querySelector(".question");
    question.addEventListener("click", function () {
        window.location.href = "/tutorial";
    });
});
