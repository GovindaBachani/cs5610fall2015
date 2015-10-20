module.exports = function (name, width, height) {
    this.name = name;
    this.width = width;
    this.height = height;

    var api = {
        getWidth : getWidth,
        getName : getName
    };

    return api;

    function getName() {
        return this.name;
    }

    function getWidth() {
        return this.width;
    }
}