
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColor = '#000000'; // '#FFFFFF';
    this.currentShape = 0;

    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
    new DnD(canvas, this);

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

    // TODO: LINE with `this.currEditingMode`

    this.onInteractionStart = function (dnd) {
        drawing.currentShape = new Rectangle();
        drawing.paint(ctx, canvas);
    }.bind(this);

    this.onInteractionUpdate = function (dnd) {
        // console.log('update')

        drawing.currentShape =
            new Rectangle(
                dnd.initial_position.x,
                dnd.initial_position.y,
                this.currColor,
                this.currLineWidth,
                dnd.final_position.x - dnd.initial_position.x,
                dnd.final_position.y - dnd.initial_position.y
            );
        drawing.paint(ctx, canvas);
    }.bind(this);

    this.onInteractionEnd = function (dnd) {
        drawing.shapeArray.set(
            Date.now(),
            new Rectangle(
                dnd.initial_position.x,
                dnd.initial_position.y,
                this.currColor,
                this.currLineWidth,
                dnd.final_position.x - dnd.initial_position.x,
                dnd.final_position.y - dnd.initial_position.y
            )
        );
        drawing.currentShape = undefined;
        drawing.paint(ctx, canvas);
    }.bind(this);
};


