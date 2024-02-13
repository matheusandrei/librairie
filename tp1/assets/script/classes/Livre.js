import { Librairy } from "./Librairy.js";

export class Livre {
  constructor(donneeLivre, livreCourrant) {
    this._donneeLivre = donneeLivre;
    this._livreCourrant = livreCourrant;
    this.init();
  }

  // Initialise les comportements
  init() {
    this._livreCourrant.addEventListener(
      "click",
      this.renderPopup.bind(this)
    );
  }

  /**
   * Crée et affiche un popup de détails de livre dans le DOM, avec des informations telles que l'image, le titre, la description, l'auteur et le prix.
   */
  renderPopup() {
    const fond = document.createElement("div");
    fond.classList.add("fond");
    fond.id = "fond";

    const popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container");
    popupContainer.id = "popupContainer";

    popupContainer.innerHTML = `
            <span class="close-btn">X</span>
            <img src="${this._donneeLivre.image}" alt="${this._donneeLivre.titre}">
            <h2>${this._donneeLivre.titre}</h2>
            <p>${this._donneeLivre.description}</p>
            <p>${this._donneeLivre.auteur}</p>
            <p>$${this._donneeLivre.prix}</p>
        `;

    // Récupère la valeur de X et met un événement sur l'élément
    this._xPopup = popupContainer.querySelector(".close-btn");
    this._xPopup.addEventListener(
      "click",
      function () {
        this.fermerPopup();
      }.bind(this)
    );

    document.body.appendChild(fond);
    document.body.appendChild(popupContainer);
  }

  /**
   * Ferme le popup en supprimant les éléments du DOM
   */
  fermerPopup() {
    const fond = document.getElementById("fond");
    const popupContainer = document.getElementById("popupContainer");

    fond.remove();
    popupContainer.remove();
  }
}
