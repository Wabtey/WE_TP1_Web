
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.rect;
    this.currLineWidth = 5;
    this.currColor = '#000000'; // '#FFFFFF';
    // NOTE: Why this attribute exist ?
    this.currentShape = undefined;

    // Lier ici les widgets à la classe pour modifier les attributs présents ci-dessus.

    // FIXME: The reactivness with the spinnerWidth and colour are always one input late...
    document.getElementById('butRect').onclick = (_) => this.currEditingMode = editingMode.rect
    document.getElementById('butLine').onclick = (_) => this.currEditingMode = editingMode.line
    document.getElementById('spinnerWidth').onclick = (e) => this.currLineWidth = e.target.value
    document.getElementById('colour').onclick = (e) => this.currColor = e.target.value

    new DnD(canvas, this);

    // TODO: LINE with `this.currEditingMode`

    this.onInteractionStart = function (dnd) {
        if (this.currEditingMode == editingMode.rect) {
            drawing.currentShape = new Rectangle();
        } else {
            drawing.currentShape = new Line();
        }
        drawing.paint(ctx, canvas);
    }.bind(this);

    this.onInteractionUpdate = function (dnd) {
        // OPTIMIZE: is modifying instead of recreating better ? pbly
        if (this.currEditingMode == editingMode.rect) {
            drawing.currentShape =
                new Rectangle(
                    dnd.initial_position.x,
                    dnd.initial_position.y,
                    this.currLineWidth,
                    this.currColor,
                    dnd.final_position.x - dnd.initial_position.x,
                    dnd.final_position.y - dnd.initial_position.y
                );
        } else {
            drawing.currentShape =
                new Line(
                    dnd.initial_position.x,
                    dnd.initial_position.y,
                    this.currLineWidth,
                    this.currColor,
                    dnd.final_position.x,
                    dnd.final_position.y
                );
        }

        drawing.paint(ctx, canvas);
    }.bind(this);

    this.onInteractionEnd = function (dnd) {
        drawing.shapeArray.set(
            Date.now(),
            drawing.currentShape
        );
        drawing.currentShape = undefined;
        drawing.paint(ctx, canvas);
    }.bind(this);
};


