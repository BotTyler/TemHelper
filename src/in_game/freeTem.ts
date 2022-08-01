
import { AppWindow } from "../AppWindow";
import { kWindowNames, kGamesFeatures } from "../consts";
import { TemData, temListInterface } from "../TemData";

import WindowState = overwolf.windows.WindowStateEx;


class FreeTem extends AppWindow {
  private static _instance: FreeTem;

  private static temSelectorBtn: HTMLElement;

  private static levelLabel: HTMLElement;
  private static healthLabel: HTMLElement;


  private static temLevelRange: HTMLInputElement;
  private static pansunRewardLabel: HTMLElement;
  private static HPSV1: HTMLElement;
  private static HPSV50: HTMLElement;
  private static FLC: HTMLInputElement;

  private static curTem: temListInterface;

  private static temCurHealthRange: HTMLInputElement;

  private static temCard: HTMLElement;
  private static temEffects1: HTMLElement;
  private static temEffects2: HTMLElement;

  private static listTable1: HTMLElement;
  private static listTable2: HTMLElement;
  private static listTable3: HTMLElement;

  private static TCB: number = 1;
  private static TSB1: number = 1;
  private static TSB2: number = 1;
  private static FLCB: number = 1;

  private static getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
  }

  private constructor() {
    super(kWindowNames.freeTem);
    FreeTem.temSelectorBtn = document.getElementById('temSelectorBtn');
    FreeTem.levelLabel = document.getElementById('levelLabel');
    FreeTem.healthLabel = document.getElementById('healthLabel');

    FreeTem.temLevelRange = document.getElementById('temLevelRange') as HTMLInputElement;
    FreeTem.pansunRewardLabel = document.getElementById('pansunRewardLabel');
    FreeTem.HPSV1 = document.getElementById('1HPSV');
    FreeTem.HPSV50 = document.getElementById('50HPSV');

    FreeTem.temCurHealthRange = document.getElementById('temCurHealthRange') as HTMLInputElement;
    FreeTem.temEffects1 = document.getElementById('temEffects1');
    FreeTem.temEffects2 = document.getElementById('temEffects2');
    FreeTem.temCard = document.getElementById('temCard');

    FreeTem.listTable1 = document.getElementById('listTable1');
    FreeTem.listTable2 = document.getElementById('listTable2');
    FreeTem.listTable3 = document.getElementById('listTable3');


    FreeTem.FLC = document.getElementById('FLCBInput') as HTMLInputElement;

    FreeTem.listTable1.addEventListener('click', function (e) {
      var target: HTMLImageElement = FreeTem.getEventTarget(e);
      if (!(+target.id > 0)) {
        return;
      }
      FreeTem.temCard.setAttribute('src', target.src);
      FreeTem.TCB = +target.id;
      FreeTem.calculateTemStatistics(+FreeTem.levelLabel.innerHTML);
    });
    FreeTem.listTable2.addEventListener('click', function (e) {
      var target: HTMLImageElement = FreeTem.getEventTarget(e);
      if (!(+target.id > 0)) {
        return;
      }
      FreeTem.temEffects1.setAttribute('src', target.src);
      FreeTem.TSB1 = +target.id;
      FreeTem.calculateTemStatistics(+FreeTem.levelLabel.innerHTML);
    });
    FreeTem.listTable3.addEventListener('click', function (e) {
      var target: HTMLImageElement = FreeTem.getEventTarget(e);
      if (!(+target.id > 0)) {
        return;
      }
      FreeTem.temEffects2.setAttribute('src', target.src);
      FreeTem.TSB2 = +target.id;
      FreeTem.calculateTemStatistics(+FreeTem.levelLabel.innerHTML);
    });


    FreeTem.temSelectorBtn.addEventListener('click', () => {
      overwolf.windows.obtainDeclaredWindow('TemTemSelector', function (result: overwolf.windows.WindowResult) {
        overwolf.windows.restore(result.window.name);
      });

      overwolf.windows.sendMessage(kWindowNames.TemTemSelector, kWindowNames.freeTem, 'freeTem', () => { console.log('Msg Has been sent to TemTemSeelctor waiting for resposne.') }); // send msg to the temtemselector page need to move to where one of the portait pictures are clicked

    });

    FreeTem.temLevelRange.addEventListener('input', () => {
      // change the level tag
      const level: number = +FreeTem.temLevelRange.value;
      FreeTem.levelLabel.innerHTML = level + '';
      FreeTem.calculateTemStatistics(level);
    });
    FreeTem.temCurHealthRange.addEventListener('input', () => {
      // change the level tag
      const hp: number = +FreeTem.temCurHealthRange.value;
      FreeTem.healthLabel.innerHTML = hp + '';
      FreeTem.calculateTemStatistics(+FreeTem.temLevelRange.value);
    });

    FreeTem.FLC.addEventListener('input', () => {
      FreeTem.FLCB = +FreeTem.FLC.checked ? 1.1 : 1;
      FreeTem.calculateTemStatistics(+FreeTem.temLevelRange.value);
    })


    overwolf.windows.onMessageReceived.addListener(function (message) {
      //console.log("MSG RECIEVED: " + message.id);
      //TemData.logTemLocation(message.content);

      if (message.id === 'freeTem') {
        FreeTem.curTem = <temListInterface>message.content;
        FreeTem.temSelectorBtn.setAttribute('src', FreeTem.curTem.portraitWikiUrl);
        FreeTem.calculateTemStatistics(+FreeTem.levelLabel.innerHTML);
      }


    });

  }

  private static calculateTemStatistics(level: number) {
    if (FreeTem.curTem != null) {
      // update teh pansunRewardLabel, HPSV1, and HPSV50 variables using the temLevelRange value
      this.pansunRewardLabel.innerHTML = 20 + Math.ceil((level / FreeTem.curTem.catchRate) * 270) + '';
      this.HPSV1.innerHTML = this.calculateCaptureChance(1, level) + '';
      this.HPSV50.innerHTML = this.calculateCaptureChance(50, level) + '';
    }
  }

  private static calculateCaptureChance(healthSV: number, level: number): number {
    const base = this.curTem.stats.hp;
    const catchRate = this.curTem.catchRate;
    const curHealthMult = +this.temCurHealthRange.value / 100;
    const hpMax = Math.floor(((((1.5 * base) + healthSV) * level) / 80) + ((healthSV * base * level) / 20000) + level + 15);
    const a = ((((4 * hpMax) - (3 * (hpMax * curHealthMult))) * catchRate * this.TCB) / ((2 * hpMax) + (10 * level)) * this.TSB1 * this.TSB2 * this.FLCB);
    const b = 14777 * Math.sqrt(Math.sqrt(a));
    const prob = b / 50000;

    return Math.floor(prob * prob * prob * prob * 100);
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new FreeTem();
    }
    return this._instance;
  }

  public async run() {
  }


}
FreeTem.instance().run();
