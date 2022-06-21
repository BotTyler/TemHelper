import { OWWindow } from "@overwolf/overwolf-api-ts";
import { kWindowNames } from "./consts";
// A base class for the app's foreground windows.
// Sets the modal and drag behaviors, which are shared accross the desktop and in-game windows.
export class AppWindow {
  protected currWindow: OWWindow;
  protected mainWindow: OWWindow;
  protected maximized: boolean = false;

  constructor(windowName) {
    this.mainWindow = new OWWindow('background');
    this.currWindow = new OWWindow(windowName);
    if(windowName === kWindowNames.inGame){

      overwolf.windows.changePosition(windowName,0,0);
    }
    const closeButton = document.getElementById('closeButton');

    const header = document.getElementById('header');

    this.setDrag(header);

    closeButton.addEventListener('click', () => {
      this.mainWindow.close();
    });


    const json = '{"result":true, "count":42, "random":234}';
    let obj:myObj = JSON.parse(json);
    console.log(obj.result);
  }

  public async getWindowState() {
    return await this.currWindow.getWindowState();
  }

  private async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }


  
}
interface myObj{
    result:boolean;
    count: number;
}
