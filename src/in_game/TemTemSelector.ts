
import { AppWindow } from "../AppWindow";
import { kWindowNames, kGamesFeatures, breedingCalcSendAndRecieveData } from "../consts";
import { TemData, temDataAvailiable, temListInterface } from "../TemData";


import WindowState = overwolf.windows.WindowStateEx;

class TemTemSelector extends AppWindow {
  private static _instance: TemTemSelector;
  private listTem: TemData;
  private temtable: HTMLElement;

  private static windowName = undefined;
  private static num: string = "-1";

  private static breedingCalcInfo: breedingCalcSendAndRecieveData = undefined;


  private undefinedElement: temListInterface = {
    number: undefined,
    name: undefined,
    types: undefined,
    traits: undefined,
    portraitWikiUrl: undefined,
    locations: undefined,
    catchRate: undefined,
    stats: undefined,
    techniques: undefined,
    breedingMoves: undefined,
    isAvail: temDataAvailiable.no
  }


  private constructor() {
    super(kWindowNames.TemTemSelector);
    const { temData } = overwolf.windows.getMainWindow();
    this.listTem = temData;
    this.populatePage();

    const searchEl = document.getElementById("search") as HTMLInputElement;
    const list = document.querySelectorAll('.temtemlist');









    overwolf.windows.onMessageReceived.addListener(function (message) {

      // may need to make the following better
      searchEl.value = '';
      // list.forEach(element => {
      //   (<HTMLElement>element).style.display = 'block';

      // });


      if (message.id === kWindowNames.damageCalculator || message.id == kWindowNames.freeTem) {
        TemTemSelector.windowName = message.id;
        TemTemSelector.num = message.content;

      } else if (message.id === kWindowNames.breedingCalc) {
        // seperate this from the rest of the windows.
        // we need to sort the list by type removing any that do not match the temtem
        // if the others are then activated we need to remove this search
        const contents: breedingCalcSendAndRecieveData = message.content;
        TemTemSelector.windowName = message.id;
        TemTemSelector.num = contents.windowId + '';
        TemTemSelector.breedingCalcInfo = contents;

        list.forEach(element => {
          if (TemTemSelector.keepSearchQuery(<HTMLElement>element) == true) {
            (<HTMLElement>element).style.display = 'block';
          } else {
            (<HTMLElement>element).style.display = 'none';

          }
        });


      }

    });









    searchEl.addEventListener('keyup', function (e) {
      list.forEach(element => {
        const name = element.querySelector('.labelName').innerHTML;

        if (name.toLowerCase().includes(searchEl.value) || name.toLowerCase() === 'none') {
          //match found
          if (kWindowNames.breedingCalc === TemTemSelector.windowName) {
            if (TemTemSelector.keepSearchQuery(<HTMLElement>element) === true) {
              (<HTMLElement>element).style.display = 'block';
            } else {
              (<HTMLElement>element).style.display = 'none';

            }
          } else {
            (<HTMLElement>element).style.display = 'block';
          }
        } else {
          (<HTMLElement>element).style.display = 'none';
        }
      });
    });

  }













  private static keepSearchQuery(element: HTMLElement): boolean {
    var rVal: boolean = false;

    if (TemTemSelector.breedingCalcInfo === undefined) {
      return rVal;
    } else {
      TemTemSelector.breedingCalcInfo.searchTypes.forEach(type => {
        if (type === 'none') {
          rVal = true;
        } else {
          // ready to check the types
          const internalTypes: string[] = element.getElementsByClassName('elements')[0].innerHTML.split(' ');
          for (let counter = 0; counter < internalTypes.length; counter++) {
            if (type === internalTypes[counter] || internalTypes[counter] === 'noneKeep') {
              rVal = true;
              break;
            }
          }
        }

      });
    }

    return rVal; // default case if it does not match it should not show
  }










  private async populatePage() {
    this.temtable = document.getElementById('listoftem');



    const noneDiv: HTMLElement = TemTemSelector.createNone();




    this.temtable.append(noneDiv);
    const tems = this.listTem.getTemList();
    tems.forEach(element => {
      let temDiv: HTMLElement = document.createElement('div');

      let temPicDiv: HTMLElement = document.createElement('div');


      let temPic: HTMLElement = new Image();
      temPic.setAttribute('src', element.portraitWikiUrl);
      temPic.setAttribute('loading', 'lazy');
      temPic.setAttribute('class', 'imgBot');


      temPic.onclick = function () {
        overwolf.windows.obtainDeclaredWindow('TemTemSelector', function (result: overwolf.windows.WindowResult) {
          overwolf.windows.hide(result.window.name);
        });
        element.isAvail = temDataAvailiable.yes;
        TemTemSelector.breedingCalcInfo = undefined;
        overwolf.windows.sendMessage(TemTemSelector.windowName, TemTemSelector.num, element, () => { /*('Msg has been sent to the ' + TemTemSelector.windowName + ' page, location and the dataobj')*/ });
      }

      temPicDiv.append(temPic);
      temPicDiv.setAttribute('class', 'parentOverlayDiv');

      let temName: HTMLElement = document.createElement('label');
      temName.append(element.name);
      temName.setAttribute('class', 'labelName');

      temPicDiv.append(temName);


      let temTypes: HTMLElement = document.createElement('div');
      temTypes.setAttribute('class', 'elements');
      var typesString: string = '';
      element.types.forEach(type => {
        typesString += type + ' ';
      });
      typesString = typesString.trim();
      temTypes.innerHTML = typesString;

      temDiv.append(temPicDiv);
      temDiv.append(temTypes);
      temDiv.setAttribute('class', 'temtemlist');
      this.temtable.append(temDiv);
    });
  }

  private static createNone(): HTMLElement {
    let temDiv: HTMLElement = document.createElement('div');

    let temPicDiv: HTMLElement = document.createElement('div');


    let temPic: HTMLElement = new Image();
    temPic.setAttribute('src', '../../temtypes/Plus.png');
    temPic.setAttribute('loading', 'lazy');
    temPic.setAttribute('class', 'imgBot');
    temPic.style.background = 'white';

    const element: temListInterface = {
      number: undefined,
      name: undefined,
      types: undefined,
      traits: undefined,
      portraitWikiUrl: temPic.getAttribute('src'),
      locations: undefined,
      catchRate: undefined,
      stats: undefined,
      techniques: undefined,
      breedingMoves: undefined,
      isAvail: temDataAvailiable.no
    }


    temPic.onclick = function () {
      overwolf.windows.obtainDeclaredWindow('TemTemSelector', function (result: overwolf.windows.WindowResult) {
        overwolf.windows.hide(result.window.name);
      });
      TemTemSelector.breedingCalcInfo = undefined;
      overwolf.windows.sendMessage(TemTemSelector.windowName, TemTemSelector.num, element, () => { console.log('Msg has been sent to the ' + TemTemSelector.windowName + ' page, location and the dataobj') });
    }

    temPicDiv.append(temPic);
    temPicDiv.setAttribute('class', 'parentOverlayDiv');

    let temName: HTMLElement = document.createElement('label');
    temName.append('None');
    temName.setAttribute('class', 'labelName');

    temPicDiv.append(temName);


    let temTypes: HTMLElement = document.createElement('div');
    temTypes.setAttribute('class', 'elements');
    var typesString: string = '';
    typesString += 'noneKeep';

    typesString = typesString.trim();
    temTypes.innerHTML = typesString;

    temDiv.append(temPicDiv);
    temDiv.append(temTypes);
    temDiv.setAttribute('class', 'temtemlist');
    return temDiv;
  }


  public static instance() {
    if (!this._instance) {
      this._instance = new TemTemSelector();
    }
    return this._instance;
  }

  public async run() {

  }



}

TemTemSelector.instance().run();
