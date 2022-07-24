class Section {
  constructor ( {items, renderer}, containerSelector) {
    this._renderedItems = Array.from(items);
    this.renderer = renderer;

    this._container = document.querySelector(`.${containerSelector}`);
  }

  renderItems() {
    this._renderedItems.forEach( item =>  this.renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }

  addNewItem(element) {
    this._container.prepend(element);
  }
}


export default Section;
