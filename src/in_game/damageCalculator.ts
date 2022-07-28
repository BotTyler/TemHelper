
  import { AppWindow } from "../AppWindow";
  import { kWindowNames, kGamesFeatures } from "../consts";
  import { TemData, temListInterface } from "../TemData";
  import WindowState = overwolf.windows.WindowStateEx;
  

  class damageCalculator extends AppWindow {
    private static _instance: damageCalculator;
    private static listTem:TemData
    private temtable:HTMLElement;
    private static table1:HTMLElement[] = new Array(12);
    private static table2:HTMLElement[] = new Array(12);

    private static temBtn1:HTMLElement;
    private static temBtn2:HTMLElement;


    private constructor() {
      super(kWindowNames.damageCalculator);
      
      const {temData}= overwolf.windows.getMainWindow();
      damageCalculator.listTem = temData;

      damageCalculator.temBtn1 = document.getElementById('temtem1');
      damageCalculator.temBtn2 = document.getElementById('temtem2');

      let fields:string[] = ['Neutral', 'Fire', 'Water', 'Nature', 'Electric', 'Earth', 'Mental', 'Wind', 'Digital', 'Melee', 'Crystal', 'Toxic'];

        
        fields.forEach(element => {
            
          damageCalculator.table1[element] = document.getElementById(element+'1');
        });

        fields.forEach(element => {
            
          damageCalculator.table2[element] = document.getElementById(element+'2');
        });


      damageCalculator.temBtn1.addEventListener('click', () => {
        overwolf.windows.obtainDeclaredWindow('TemTemSelector', function(result:overwolf.windows.WindowResult){
          overwolf.windows.restore(result.window.name);
        });

        overwolf.windows.sendMessage(kWindowNames.TemTemSelector, kWindowNames.damageCalculator, '1', ()=>{console.log('Msg Has been sent to TemTemSeelctor waiting for resposne.')}); // send msg to the temtemselector page need to move to where one of the portait pictures are clicked

      });
      damageCalculator.temBtn2.addEventListener('click', () => {
        overwolf.windows.obtainDeclaredWindow('TemTemSelector', function(result:overwolf.windows.WindowResult){
          overwolf.windows.restore(result.window.name);
        });
        overwolf.windows.sendMessage(kWindowNames.TemTemSelector, kWindowNames.damageCalculator, '2', ()=>{console.log('Msg Has been sent to TemTemSeelctor waiting for resposne.')}); // send msg to the temtemselector page need to move to where one of the portait pictures are clicked

      });

      overwolf.windows.onMessageReceived.addListener(function(message){
        //console.log("MSG RECIEVED: " + message.id);
        damageCalculator.setTableRow(message.content, +message.id, fields);

      });

    }

    public static setTableRow(data:temListInterface, location:number, fields:string[]){
      const dmgtable = this.listTem.getDmgTable();
      if(location===1){
        this.temBtn1.setAttribute('src', data.portraitWikiUrl);

        fields.forEach(element => {

          var total:number = 1;
          data.types.forEach(type=>{

            //total *= damageCalculator.listTem.dmgTable[element][type];
            total *= dmgtable[element][type];
          });
          damageCalculator.table1[element].innerHTML = total + '';
        });



      }else if(location === 2){
        this.temBtn2.setAttribute('src', data.portraitWikiUrl);

        fields.forEach(element => {
          var total:number = 1;

          data.types.forEach(type=>{
            //total *= damageCalculator.listTem.dmgTable[element][type];
            total *= dmgtable[element][type];
          });
          damageCalculator.table2[element].innerHTML = total + '';

        });


      }

    }
    public static instance() {
      if (!this._instance) {
        this._instance = new damageCalculator();
      }
      return this._instance;
    }
  
    public async run() {
    }

  
  }
  damageCalculator.instance().run();
  