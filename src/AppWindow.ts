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

    const header = document.getElementById('header');

    this.setDrag(header);
    if(windowName === kWindowNames.TemTemSelector){
      // only have the minimize btn

      const minbtn = document.getElementById('minButton');

      minbtn.addEventListener('click', () => {
        this.currWindow.minimize();
      });
    }else{
      const closeButton = document.getElementById('closeButton');

      closeButton.addEventListener('click', () => {
        this.currWindow.close();
      });
    }
    
  }

  public async getWindowState() {
    return await this.currWindow.getWindowState();
  }

  private async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }



  
}

