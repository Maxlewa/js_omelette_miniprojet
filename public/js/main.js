/** Créer un objet personne. Cette personne doit avoir des propriétés et des méthodes : 
* - nom(string)
* - lieu(string)
* - argent(number)
* - mainDroite(tableau)
* ( du coup main gauche(tableau))
* - seDeplacer(lieu)
* - payerArticle(article)
* - couper(ingredient, outil)
*/

let personne = {
    nom : "Dupont",
    lieu : "maison",
    argent : 100,
    mainDroite : [],
    mainGauche : [],
    seDeplacer(x) {
        this.lieu = x.nom
        console.log(personne.nom + " est actuellement à la " + personne.lieu)
    },
    payerArticle(x) {
        this.argent -= x.prix
        console.log(`Votre portefeuille contient ${this.argent}`);
    },
    couper(ingredient, outil) {
        if (ingredient.etat == "entier") {
            ingredient.etat = "coupé"
            console.log(`Le ${outil.nom} ${outil.action} le ${ingredient.nom}`);
        }
    },
}

/**
* Créer un lieu "maison" (un objet) avec comme propriété "nom: 'maison'" et "personnes = []" => qui sera un tableau de personnes présentes dans la maison :
*/

let maison = {
    nom : "maison",
    personnes : [],
}

/**
* Créer un outil (couteau) pour découper les ingrédients achetés
* propriétés : nom et action.
* action a comme valeur l'état "coupé" (qui sera mis aux légumes lorsqu'ils seront coupés avec le méthode de "personne".)
*/

let couteau = {
    nom : "couteau",
    action : "couper",
}

/**
 * Créer des produits (ingrédients) à mettre dans le magasin qui serviront à créer l'omelette (oignon, oeuf, epice, fromage, ...);
 * propriétés : nom, etats ( entier,coupé, moulu), prix
*/

// let ingredients = {
//     oignon = {
//         nom : "oignon",
//         etat : "coupé",
//         prix : 1,
//     },
//     oeuf = {
//         nom : "oeuf",
//         etat : "entier",
//         prix : 2,
//     },
//     epice = {
//         nom : "epice",
//         etat : "moulu",
//         prix : 3,
//     },
//     fromage = {
//         nom : "fromage",
//         etat : "coupé",
//         prix : 4,
//     },
// }

class Ingredients {
    constructor(nom, etat, prix) {
        this.nom = nom
        this.etat = etat
        this.prix = prix
    }
}

let oignon = new Ingredients ("oignon", "coupé", 1)
let oeuf = new Ingredients ("oeuf", "entier", 2)
let epice = new Ingredients ("epice", "moulu", 3)
let fromage = new Ingredients ("fromage", "coupé", 4)


// Créer un lieu "epicerie" qui a comme propriétés :
// nom, personnes = [], paniers (un tableau d'objets "panier" avec une propriété "type" égal à panier et le contenu du panier, égal à un tableau vide),
// Les "ingrédients" créés juste au dessus contenus dans un tableau.
/* */

let epicerie = {
    nom : "epicerie",
    personnes : [],
    paniers : {
        type : "panier",
        contenu : [],
    },
    ingredients : [oignon, oeuf, epice, fromage],
}

/* Créer un poele avec un tableau comme contenu. Et avec une méthode cuir() qui, après 4 secondes, met l'état 'cuit' à this.contenu[0]. On peut faire ça avec la fonction setTimeout(()=> {}, 4000)
*/

let poele = {
    contenu : [],
    cuir() {
        setTimeout(()=> {
            this.contenu[0].etat = "cuit"
            console.log(`Le ${poele.contenu[0].nom} est à l'état : ${poele.contenu[0].etat}`);
        }, 4000)
    }
}

// Créer un bol avec un tableau comme contenu
// ajouter une méthode melanger(nomMelange) qui va créer un nouvel objet "newMelange" avec comme nom la variable nomMelange passé en paramètre et avec 'pas cuit' en etat. cette méthode remplacera this.contenu par [l'obj newMelange]

let bol = {
    contenu : [],
    melanger(nomMelange) {
        let newMelange = {
            nom : nomMelange,
            etat : "pas cuit",
        }
        this.contenu = newMelange
    }
}


/**** DEBUT DE L'OMELETTE ****/
// Pour dire que le personnage est à la maison :

// Avec l'objet personnage, utiliser la method seDeplacer et de passer en paramètre l'objet maison
// Afficher un message tel que :

// console.log(personnage.nom + " est actuellement à la " + personnage.lieu);

personne.seDeplacer(maison);

// Pour aller à l'épicerie acheter les ingrédients pour l'omelette, je répète la première étape en changeant le parametre de la method seDeplacer par l'epicerie

personne.seDeplacer(epicerie);

// Mon personnage prend un des paniers dans l'épicerie (il récupère le panier dans les objets de l'épicerie et le met dans sa main droite.)

personne.mainDroite.push(epicerie.paniers);
console.log(personne.mainDroite);

console.log(personne);

// Il doit y avoir un objet dans la main droite de personnage et un panier en moins. Vérifier avec des console.log() ensuite afficher un message du type : 

// console.log(`${personnage.nom} a pris un ${type du panier}`);

console.log(`${personne.nom} a pris un ${epicerie.paniers.type}`)

// Je créer une boucle qui va prendre chaque élément (ingrédient) du contenu de l'épicerie (1 à 1) et en faire une COPIE dans le panier du personnage

epicerie.ingredients.forEach(element => {
    personne.mainDroite[0].contenu.push(element);
    console.log(`${personne.nom} a pris ${element.nom}`);
});

// Afficher un message à chaque ingrédient pris

console.log(personne);

// Payer chaque ingrédient récupéré dans le panier. Avec une boucle aussi, on va les passer 1 à 1 dans la fonction payerArticle()

// Afficher un message de ce qu'il reste d'argent sur le personnage.

personne.mainDroite[0].contenu.forEach(element => {
    personne.payerArticle(element)
});

console.log(`Il reste ${personne.argent} euros`);

// rentrer à la maison (comme ça on pourra cuisiner)

personne.seDeplacer(maison);

// mettre chaque ingrédient dans le bol (1 à 1 donc avec une boucle)
// Afficher un petit message de chaque ingrédient qu'on met dans le bol.

personne.mainDroite[0].contenu.forEach(element => {
    bol.contenu.push(element);
    console.log(`Tu as rajouté ${element.nom} dans le bol`);
});


// Vérifier que les ingrédients ne se trouvent plus dans le panier (oups ! on a oublié de le rapporter x)

personne.mainDroite[0].contenu.splice(0)


console.log("___MON PANIER___");
console.log(personne.mainDroite[0].contenu);
console.log("___MON BOL___");
console.log(bol);

// Retourner à l'épicerie pour rapporter le panier. (donc seDeplacer puis enlever le panier de la main droite et le remetre dans les paniers de l'épicerie.)

personne.seDeplacer(epicerie);
personne.mainDroite.splice(0);

console.log(personne);

// Afficher un petit message

console.log(`La main droite contient ${personne.mainDroite.length} objets`);

// Retourner à la maison pour continuer l'omelette
// Afficher un petit message

personne.seDeplacer(maison);

// Vérifier chaque ingrédient dans le bol et le couper seulement s'il est entier ! Pour ça on utilise la méthode couper de personnage

console.log("___MON BOL___");
console.log(bol);

personne.mainGauche.push(couteau);
console.log("___MAIN GAUCHE___")
console.log(personne.mainGauche);

bol.contenu.forEach(element => {
    personne.couper(element, couteau)
})

// Mélanger le contenu du bol avec la méthode melanger. on va nommer ce mélange une 'omelette' (à passer en param).

// Afficher un message avec le nouveau mélange

bol.melanger("omelette");
console.log(bol.contenu);

console.log(`Le bol contient : ${bol.contenu.nom}`);

// vider le contenu du bol dans la poele. Il ne doit plus rien avoir dans le bol et y avoir juste l'omelette pas cuite.

poele.contenu.push(bol.contenu);
console.log("___MA POELE___");
console.log(poele);

// Cuire l'omelette avec la méthode de la poele 
// Afficher un message final, notre omelette est cuite :)

console.log(`Le ${poele.contenu[0].nom} est à l'état : ${poele.contenu[0].etat}`)
poele.cuir(poele.contenu);
