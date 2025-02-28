document.addEventListener("DOMContentLoaded", function () {
    const dueDateToggles = document.querySelectorAll(".toggle-due-date");
    const alarmToggles = document.querySelectorAll(".toggle-alarm");

    dueDateToggles.forEach(toggle => {
        toggle.addEventListener("change", function () {
            const id = this.getAttribute("data-id");
            const dueDateContainer = document.getElementById(`due-date-${id}`);
            if (this.checked) {
                dueDateContainer.classList.remove("hidden");
            } else {
                dueDateContainer.classList.add("hidden");
            }
        });
    });

    alarmToggles.forEach(toggle => {
        toggle.addEventListener("change", function () {
            const id = this.getAttribute("data-id");
            const alarmContainer = document.getElementById(`alarm-${id}`);
            if (this.checked) {
                alarmContainer.classList.remove("hidden");
            } else {
                alarmContainer.classList.add("hidden");
            }
        });
    });
});
