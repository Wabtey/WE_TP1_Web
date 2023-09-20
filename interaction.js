// import { Vec2 } from './lib.js'; // "./lib.js"; 

class Vec2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.initial_position = new Vec2(0, 0);
    this.final_position = new Vec2(0, 0);

    // Developper les 3 fonctions gérant les événements
    this.press = function (evt) {
        console.log("Pressed");
        var [x, y] = getMousePosition(this.canvas, evt);
        this.initial_position = new Vec2(x, y);
    }

    // ???
    this.move = function (evt) {
        var [x, y] = getMousePosition(this.canvas, evt);
        this.final_position = new Vec2(x, y);
    }

    this.drop = function (evt) {
        console.log("Dropped");
        var [x, y] = getMousePosition(this.canvas, evt);
        this.final_position = new Vec2(x, y);
    }

    // Associer les fonctions précédentes aux évènements du canvas.
}

// DnD.move = function (evt) { }

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};

// class DnD {
//     constructor(canvas, interactor) {
//         // Définir ici les attributs de la 'classe'
//         this.initial_position = new Vec2(0, 0);
//         this.final_position = new Vec2(0, 0);

//         // Developper les 3 fonctions gérant les événements
//         // Associer les fonctions précédentes aux évènements du canvas.
//     }

//     /* -------------------------------------------------------------------------- */
//     /*                                   Methods                                  */
//     /* -------------------------------------------------------------------------- */

//     pressed() {}
//     hovered() {}
//     dropped() {}
// };



