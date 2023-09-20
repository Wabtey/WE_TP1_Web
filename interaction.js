
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.initial_position = new Vec2(0, 0);
    this.final_position = new Vec2(0, 0);
    // Developper les 3 fonctions gérant les événements
    // Associer les fonctions précédentes aux évènements du canvas.
}

// class DnD {
//     constructor() {
//         // Définir ici les attributs de la 'classe'
//         this.initial_position = new Vec2(0, 0);
//         this.final_position = new Vec2(0, 0);

//         // Developper les 3 fonctions gérant les événements
//         // Associer les fonctions précédentes aux évènements du canvas.
//     }
// };


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



