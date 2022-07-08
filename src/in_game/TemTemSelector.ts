
  import { AppWindow } from "../AppWindow";
  import { kWindowNames, kGamesFeatures } from "../consts";
  import { TemData } from "../TemData";


  import WindowState = overwolf.windows.WindowStateEx;
  
  class TemTemSelector extends AppWindow {
    private static _instance: TemTemSelector;
    private listTem:TemData;
    private temtable:HTMLElement;

    private static windowName = null;
    private static num:string = "-1";

    private constructor() {
      super(kWindowNames.TemTemSelector);
      const {temData}= overwolf.windows.getMainWindow();
      this.listTem = temData;
      this.populatePage();

      overwolf.windows.onMessageReceived.addListener(function(message){
        if(message.id ===  kWindowNames.damageCalculator || message.id == kWindowNames.freeTem){
          TemTemSelector.windowName = message.id;
          TemTemSelector.num = message.content;
        }
      
      });


      const searchEl = document.getElementById("search") as HTMLInputElement;
      const list = document.querySelectorAll('.temtemlist');

      searchEl.addEventListener('keyup', function(e){
        list.forEach(element => {
          const name = element.querySelector('.labelName').innerHTML;

          if(name.toLowerCase().includes(searchEl.value)){
            //match found
            (<HTMLElement>element).style.display = 'block';
          }else{
            (<HTMLElement>element).style.display = 'none';
          }
        });
      })

    }

    private async populatePage(){
      this.temtable = document.getElementById('listoftem');
      
      this.listTem.temList.forEach(element => {
        let temDiv:HTMLElement = document.createElement('div');

        let temPicDiv:HTMLElement = document.createElement('div');


        let temPic:HTMLElement = new Image();
        temPic.setAttribute('src', element.portraitWikiUrl);
        temPic.setAttribute('loading', 'lazy');
        temPic.setAttribute('class', 'imgBot');


        temPic.onclick = function() {
          overwolf.windows.obtainDeclaredWindow('TemTemSelector', function(result:overwolf.windows.WindowResult){
            overwolf.windows.hide(result.window.name);
        });
          overwolf.windows.sendMessage(TemTemSelector.windowName, TemTemSelector.num, element, ()=>{console.log('Msg has been sent to the '+ TemTemSelector.windowName+' page, location and the dataobj')});
        }

        temPicDiv.append(temPic);
        temPicDiv.setAttribute('class', 'parentOverlayDiv');

        let temName:HTMLElement = document.createElement('label');
        temName.append(element.name);
        temName.setAttribute('class', 'labelName');

        temPicDiv.append(temName);

        temDiv.append(temPicDiv);
        temDiv.setAttribute('class', 'temtemlist');
        this.temtable.append(temDiv);
      });
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
