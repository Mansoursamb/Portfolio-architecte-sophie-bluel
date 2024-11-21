const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const msgErreur = document.querySelector(".login p");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userEmail = email.value;
  const userPwd = password.value;

  async function loginUser() {
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail, // Utiliser les bons noms de champs
          password: userPwd,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Si la connexion est réussie
        localStorage.setItem("token", data.token);
        console.log("Utilisateur connecté :", data);
        // Par exemple, rediriger vers une autre page
        window.location.href = "index.html";
        window.sessionStorage.logged = true;
      } else {
        // Si la réponse est une erreur, afficher un message à l'utilisateur
        msgErreur.textContent =
          "Erreur : " + data.message || "Échec de la connexion";
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      msgErreur.textContent =
        "Une erreur est survenue. Veuillez réessayer plus tard.";
    }
  }

  loginUser();
});
