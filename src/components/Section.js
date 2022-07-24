class Section {
  constructor ( { renderer }, containerSelector) {
    // this._renderedItems = Array.from(items);
    this._renderer = renderer;
    this._container = document.querySelector(`.${containerSelector}`);
  }

  // renderItems() {
  //   this._renderedItems.forEach( item =>  this.renderer(item));
  // }

  renderItems(items) {
    items.reverse().forEach((item) => {
      this.addItem(item);
    })
  };

  addItem(card) {
    this._container.prepend(this._renderer(card))
  };

//   addItem(element) {
//     this._container.append(element);
//   }

//   addNewItem(element) {
//     this._container.prepend(element);
//   }
}


export default Section;
