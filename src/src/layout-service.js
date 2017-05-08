export class LayoutService {
  _menuVisible = false;
  get menuVisible() {
    return _menuVisible;
  }
  toggleMenu(){
    _menuVisible = false;
  }
}
