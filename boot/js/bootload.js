const termText = document.getElementById("termText")

function termNewLn(text) {
    termText.insertAdjacentHTML("beforeend", "<br>" + text)
}
function delay(seconds, action) {
    setTimeout(() => {
        action();
    }, seconds * 1000)
}

function askYesNo(onYes, onNo) {
    termText.append(" [y/n]: ")

    const input = document.createElement("input")
    input.type = "text"
    input.maxLength = 1

    input.style.background = "transparent"
    input.style.color = "inherit"
    input.style.border = "none"
    input.style.outline = "none"
    input.style.fontFamily = "inherit";
    input.style.fontSize = "inherit";
    input.style.fontWeight = "inherit";

    termText.appendChild(input)
    input.focus()

    const autoFocus = () => input.focus()
    document.addEventListener("click", autoFocus);

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const answer = input.value.toLowerCase().trim();

             if (answer === "y" || answer === "n") {
                input.disabled = true;
                document.removeEventListener("click", autoFocus);
                
                if (answer === "y") onYes();
                if (answer === "n") onNo();
                
            } else {

            input.disabled = true;
            document.removeEventListener("click", autoFocus);
            termNewLn("Invalid selection.")
            delay(0.5, () => {
                    termNewLn("Do You Wish To Boot Into AuraTuffWebOS?");
                    askYesNo(onYes, onNo);
                });
        }
    }
    })
}


delay(0.25, () => {
    termNewLn("Initializing bootloader");

    let dots = 0;
    const interval = setInterval (() => {
        termText.append("•")
        dots++

        if (dots >= 9) clearInterval(interval);
    }, 100);

    delay (1.25, () => {
        termNewLn("Hello World!")


        delay (0.5, () => {
            termNewLn("Do You Wish To Boot Into AuraTuffWebOS?")


            askYesNo(
                () => {
                    termNewLn("Booting into AuraTuffWebOS...")
                },
                () => {
                    termNewLn("Wrong Answer Bud...")
                    delay(1, () => location.reload())
                }
            )
        })

        
    })
});
