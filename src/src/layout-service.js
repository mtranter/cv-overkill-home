export class LayoutService {
  menuVisible = false;
  get menuVisible() {
    return menuVisible;
  }
  toggleMenu(){
    menuVisible = false;
  }
}
