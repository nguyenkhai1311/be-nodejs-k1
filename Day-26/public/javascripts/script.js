function toggle(source) {
    checkboxes = document.getElementsByName("checkDelete");
    for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}
