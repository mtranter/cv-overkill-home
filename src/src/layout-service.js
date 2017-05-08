export class LayoutService {
  _menuVisible = false;
  get menuVisible() {
    return this._menuVisible;
  }
  toggleMenu(){
    this._menuVisible = false;
  }
}
