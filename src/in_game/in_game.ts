import {
  OWGames,
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";

import { AppWindow } from "../AppWindow";
import { kWindowNames, kGamesFeatures } from "../consts";

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
  private catchrate: HTMLElement;

  private constructor() {
    super(kWindowNames.inGame);
    this.dmgCalc = document.getElementById('dmgcalc');
    this.team = document.getElementById('team');
    this.freetem = document.getElementById('freetem');
    this.catchrate = document.getElementById('catchrate');



  
    this.dmgCalc.addEventListener('click', function(){
      overwolf.windows.obtainDeclaredWindow('damageCalculator', function(result:overwolf.windows.WindowResult){
          overwolf.windows.restore(result.window.name);
      });
    });

    this.team.addEventListener('click', function(){
      overwolf.windows.obtainDeclaredWindow('TemTemSelector', function(result:overwolf.windows.WindowResult){
          //overwolf.windows.restore(result.window.name);
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

    //console.log('game features: ' + gameFeatures);
/*
    overwolf.windows.onMessageReceived.addListener(function(message){
      console.log("MSG RECIEVED: " + message.id);
      if(message.id ===  '1'){
        //this.listTem = message.content;
        //console.log('Message received', message.content);
        console.log(message.content);
      }
    });
*/
  }

  private async getCurrentGameClassId(): Promise<number | null> {
    const info = await OWGames.getRunningGameInfo();

    return (info && info.isRunning && info.classId) ? info.classId : null;
  }

}
InGame.instance().run();
