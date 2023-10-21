
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.rect;
    this.currLineWidth = 5;
    this.currColor = '#000000'; // '#FFFFFF';
    this.currentShape = undefined;

    // Lier ici les widgets à la classe pour modifier les attributs présents ci-dessus.

    // BUG: The spinnerWidth and colour are always one input late...
    // ^^--- this err seems to happen only on firefox archlinux.
    document.getElementById('butRect').onclick = (_) => this.currEditingMode = editingMode.rect
    document.getElementById('butLine').onclick = (_) => this.currEditingMode = editingMode.line
    document.getElementById('spinnerWidth').onclick = (e) => this.currLineWidth = e.target.value
    document.getElementById('colour').onclick = (e) => this.currColor = e.target.value

    new DnD(canvas, this);

    // TODO: LINE with `this.currEditingMode`

    this.onInteractionStart = function (dnd) {
        if (this.currEditingMode == editingMode.rect) {
            this.currentShape = new Rectangle();
        } else {
            this.currentShape = new Line();
        }
        drawing.paint(ctx, canvas);
        this.currentShape.paint(ctx);
    }.bind(this);

    this.onInteractionUpdate = function (dnd) {
        // OPTIMIZE: is modifying instead of recreating better ? pbly
        if (this.currEditingMode == editingMode.rect) {
            this.currentShape =
                new Rectangle(
                    dnd.initial_position.x,
                    dnd.initial_position.y,
                    this.currLineWidth,
                    this.currColor,
                    dnd.final_position.x - dnd.initial_position.x,
                    dnd.final_position.y - dnd.initial_position.y
                );
        } else {
            this.currentShape =
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
        this.currentShape.paint(ctx);
    }.bind(this);

    this.onInteractionEnd = function (dnd) {
        drawing.shapeArray.set(
            Date.now(),
            this.currentShape
        );
        this.currentShape = undefined;
        drawing.paint(ctx, canvas);
    }.bind(this);
};


