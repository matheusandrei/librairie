// Librairie.js
import { livres } from "../livres.js";
import { Livre } from "./Livre.js";

export class Librairy {
  constructor(el) {
    this._elHTML = el;
    this._books = livres;
    this._filters = document.querySelectorAll("[data-filtre]");
    
    this.init();
  }
/**
 * initialise les comportements
 */
  init() {
    this.afficherLivres()
    this._filters.forEach(
      function (filter) {
        filter.addEventListener(
          "click",
          function () {
            //recupere la valeur de de chaque champ au clik et atribue a une variable
            const filtrerType = filter.innerText;
            this.filtrerLivres(filtrerType);
          }.bind(this)
        );
      }.bind(this)
    );
  }
/**
 * la fonction "filtrerLivres" prend un parametre "filtrerType" et selon sa valeur filtre la liste de livres en fonction de la catégorie ou des nouveautés. 
 * @param {*} filtrerType 
 */
  filtrerLivres(filtrerType) {
    if (filtrerType === "Tous") {
        
      this.afficherLivres();
    } else {
      this._books = livres.filter(function (book) {
        return (
          book.categorie === filtrerType ||
          (filtrerType === "Nouveautés" && book.nouveaute)
        );
      });
    }

    this.afficherLivres();
  }


  /**
   * cree une carte utilise également une classe "Livre" pour effectuer certaines operations sur chaque livre.
   *
   */
  afficherLivres() {
    this._elHTML.innerHTML = "";
    this._books.forEach(function (book, index) {
      let dom = `<div class="carte" data-js-index=${index}>
                            <img class="livre" src="${book.image}" alt="livre">
                            <p>${book.categorie}</p>
                            <div class="row">
                                <p>${book.prix}$</p>
                                <button>Ajouter</button>
                            </div>
                        </div>`;

      this._elHTML.insertAdjacentHTML("beforeend", dom);

      const livreCourrant = this._elHTML.querySelector(
        `[data-js-index="${index}"]`
      );

      new Livre(book, livreCourrant);

      const addButton = livreCourrant.querySelector("button");
      addButton.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }, this);
  }
}
