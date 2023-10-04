// import { Vec2 } from './lib.js'; // "./lib.js"; 

// TODO: Move to lib
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
    // this.initX = 0;
    // this.initY = 0;
    // this.finalX = 0;
    // this.finalY = 0;
    this.initial_position = new Vec2(0, 0);
    this.final_position = new Vec2(0, 0);
    this.is_clicked = false;
    this.interactor = interactor;

    // Developper les 3 fonctions gérant les événements
    this.press = function (evt) {
        // console.log("Pressed");
        var pos = getMousePosition(canvas, evt);
        // console.log(pos);
        this.initial_position = new Vec2(pos.x, pos.y);
        this.is_clicked = true;
        this.interactor.onInteractionStart(this);
    }.bind(this);

    this.move = function (evt) {
        if (this.is_clicked) {
            var pos = getMousePosition(canvas, evt);
            this.final_position = new Vec2(pos.x, pos.y);
            // console.log(pos);
            this.interactor.onInteractionUpdate(this);
        }
    }.bind(this);

    this.drop = function (evt) {
        // console.log("Dropped");
        var pos = getMousePosition(canvas, evt);
        this.final_position = new Vec2(pos.x, pos.y);
        this.is_clicked = false;
        // console.log(pos);
        this.interactor.onInteractionEnd(this);
    }.bind(this);

    // Associer les fonctions précédentes aux évènements du canvas.

    canvas.addEventListener('mousedown', this.press, false);
    canvas.addEventListener('mousemove', this.move, false);
    canvas.addEventListener('mouseup', this.drop, false);
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



