// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Rectangle.prototype.paint = function (ctx) {
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.thickness
    ctx.strokeRect(this.startX, this.startY, this.width, this.height)
};

Line.prototype.paint = function (ctx) {
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.thickness
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY)
    ctx.lineTo(this.endX, this.endY)
    ctx.stroke();
};

Drawing.prototype.paint = function (ctx, canvas) {
    // console.log(this.getForms());
    ctx.fillStyle = '#F0F0F0'; // Background Color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // `this.getForms().` ...
    this.shapeArray.forEach(element => element.paint(ctx))

    // painting the currentShape is managed in the Pencil
    // if (this.currentShape !== undefined) {
    //     this.currentShape.paint(ctx)
    // }
};

function updateShapeList(index, shape) {
    document.getElementById('shapeList').insertAdjacentHTML('beforeend', toDom(shape, index))
}

function toDom(shape, index) {
    if (shape && typeof (shape === 'object')) {
        let innerHtml = `<li id="liRemove${index}">`
        if (shape.constructor === Rectangle)
            innerHtml += `<span style="color:` + shape.color + `">□</span> Rectangle`
        else if (shape.constructor === Line)
            innerHtml += `<span style="color:` + shape.color + `">/</span> Line`

        innerHtml += `
                <button type="button" classe="btn btn-default remove" id="remove${index}">
                    <span class="glyphicon glyphicon-remove-sign"></span>
                </button>`
        return innerHtml + '</li>'
    }
}
