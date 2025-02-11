/* chiamata per salvare il messagio nella text area */
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector(".submit-button");
  const textarea = document.querySelector("textarea");

  submitButton.addEventListener("click", async () => {
    const textValue = textarea.value.trim();

    if (textValue === "") {
      alert("Il campo non può essere vuoto!");
      return;
    }

    try {
      const response = await fetch("https://ncsf-sitoweb-production.up.railway.app/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textarea: textValue }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Opinione salvata con successo!");
        textarea.value = "";
      } else {
        alert("Errore: " + data.message);
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      alert("Errore di connessione al server.");
    }
  });
});


/* scroll della pagina man mano che si completa il form */
document.addEventListener("DOMContentLoaded", function () {
    const btnSiList = document.querySelectorAll(".btn-si");
    const sections = document.querySelectorAll("section");
    const textarea = document.querySelector("textarea");
    const submitButton = document.querySelector(".submit-button");
    let currentIndex = 0;

    // Inizializza la visibilità delle sezioni
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.style.display = "none";
        }
    });

    btnSiList.forEach(button => {
        button.addEventListener("click", function () {
            // Se il pulsante è il submit della textarea, verifica il contenuto
            if (button === submitButton) {
                if (textarea.value.trim() === "") {
                    alert("Il campo non può essere vuoto!");
                    return;
                }
            }

            if (currentIndex < sections.length - 1) {
                const currentSection = sections[currentIndex];
                const nextSection = sections[currentIndex + 1];

                // Nasconde la sezione attuale e mostra la successiva
                currentSection.style.display = "none";
                nextSection.style.display = "block";

                // Aggiorna l'indice della sezione attuale
                currentIndex++;

                // Scorrimento verso la nuova sezione con offset di 100px
                window.scrollTo({
                    top: nextSection.offsetTop - 100,
                    behavior: "smooth"
                });
            }
        });
    });
});







/* uscita dal sito */
document.addEventListener("DOMContentLoaded", function () {
    // Creazione della modale
    const modal = document.createElement("div");
    modal.id = "exitModal";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.width = "300px";
    modal.style.padding = "20px";
    modal.style.background = "white";
    modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    modal.style.display = "none";
    modal.style.textAlign = "center";
    modal.style.borderRadius = "10px";
    modal.style.backgroundColor = "#3643b3";
    
    modal.innerHTML = `
        <div class="row">
            <div class="col-12">
                <p class="color">Sei sicuro di voler uscire dal sito?</p>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <img src="../assets/PNG/NSCF-Mondo@4x.png" alt="mondo" height="100px" width="100px" />
            </div>
        </div>
        <div class="row ">
            <div class="col-6">
                <button id="confirmExit" style="margin: 10px; padding: 5px 10px; background: red; color: white; border: none; cursor: pointer;">Sì, esci</button>
            </div>
            <div class="col-6">
                <button id="cancelExit" style="margin: 10px; padding: 5px 10px; background: gray; color: white; border: none; cursor: pointer;">No, resta qui</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Mostra la modale quando si clicca su un pulsante con id "exitPop"
    document.querySelectorAll("#exitPop").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Previene l'azione predefinita del bottone
            modal.style.display = "block";
        });
    });

    // Chiude la modale se si clicca su "No, resta qui"
    document.getElementById("cancelExit").addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Reindirizza l'utente fuori dal sito se clicca su "Sì, esci"
    document.getElementById("confirmExit").addEventListener("click", function () {
        window.location.href = "https://www.google.com"; // Cambia con l'URL di destinazione desiderato
    });
});


/* collegamento ad instagram in due versioni */
document.addEventListener("DOMContentLoaded", function() {
    const instagramLink = document.getElementById("instagram");

    if (instagramLink) {
        instagramLink.addEventListener("click", function(event) {
            event.preventDefault(); // Evita il comportamento predefinito del link
            
            const mobileURL = "instagram://user?username=ciri.ts"; // URL per aprire l'app Instagram
            const desktopURL = "https://www.instagram.com/ciri.ts/"; // URL per la versione web
            
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = mobileURL;
                setTimeout(() => {
                    window.location.href = desktopURL; // Se l'app non è installata, va al web
                }, 2000);
            } else {
                window.location.href = desktopURL;
            }
        });
    }
});


