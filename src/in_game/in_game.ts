import {
  OWGames,
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";

import { AppWindow } from "../AppWindow";
import { kWindowNames, kGamesFeatures } from "../consts";
import { TemData } from "../TemData";

import WindowState = overwolf.windows.WindowStateEx;



// The window displayed in-game while a game is running.
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.
class InGame extends AppWindow {
  private static _instance: InGame;
  private _gameEventsListener: OWGamesEvents;
  private dmgCalc: HTMLElement;
  private team: HTMLElement;
  private freetem: HTMLElement;
  private breedingCalc: HTMLElement;

  private constructor() {
    super(kWindowNames.inGame);
    this.dmgCalc = document.getElementById('dmgcalc');
    this.team = document.getElementById('team');
    this.freetem = document.getElementById('freetem');
    this.breedingCalc = document.getElementById('breedingCalc');
    const {temData}= overwolf.windows.getMainWindow();


    

    this.team.addEventListener('click', function(){
    });
    this.dmgCalc.addEventListener('click', function(){
      if(temData.isDataAvailable()){
        overwolf.windows.obtainDeclaredWindow(kWindowNames.TemTemSelector, function(result:overwolf.windows.WindowResult){
          overwolf.windows.hide(result.window.name);
          //console.log('asdf');
      });
        overwolf.windows.obtainDeclaredWindow('damageCalculator', function(result:overwolf.windows.WindowResult){
          overwolf.windows.restore(result.window.name);
        });
      }

    });

    this.freetem.addEventListener('click', function(){
      if(temData.isDataAvailable()){
        overwolf.windows.obtainDeclaredWindow(kWindowNames.TemTemSelector, function(result:overwolf.windows.WindowResult){
          overwolf.windows.hide(result.window.name);
          //console.log('asdf');
      });
        overwolf.windows.obtainDeclaredWindow('freeTem', function(result:overwolf.windows.WindowResult){
          overwolf.windows.restore(result.window.name);
        });
      }

    });

    this.breedingCalc.addEventListener('click', function(){
      overwolf.windows.obtainDeclaredWindow(kWindowNames.TemTemSelector, function(result:overwolf.windows.WindowResult){
        overwolf.windows.hide(result.window.name);
        //console.log('asdf');
    });
        overwolf.windows.obtainDeclaredWindow('breedingCalc', function(result:overwolf.windows.WindowResult){
          overwolf.windows.restore(result.window.name);
      });
    });


    
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new InGame();
    }

    return this._instance;
  }

  public async run() {
    const gameClassId = await this.getCurrentGameClassId();
    const gameFeatures = kGamesFeatures.get(gameClassId);

  }

  private async getCurrentGameClassId(): Promise<number | null> {
    const info = await OWGames.getRunningGameInfo();

    return (info && info.isRunning && info.classId) ? info.classId : null;
  }

}
InGame.instance().run();
