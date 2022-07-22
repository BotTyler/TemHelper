  import { AppWindow } from "../AppWindow";
  import { kWindowNames, kGamesFeatures } from "../consts";
import { TemData, temListInterface } from "../TemData";
  
  import WindowState = overwolf.windows.WindowStateEx;
  
  class breedingCalc extends AppWindow {

    private static temBreed1:HTMLElement;
    private static temBreed2:HTMLElement;
    private static temBreed3:HTMLElement;

    private static tem1hp:HTMLInputElement;
    private static tem1sta:HTMLInputElement;
    private static tem1spd:HTMLInputElement;
    private static tem1atk:HTMLInputElement;
    private static tem1spatk:HTMLInputElement;
    private static tem1def:HTMLInputElement;
    private static tem1spdef:HTMLInputElement;

    private static hpval1:HTMLElement;
    private static staval1:HTMLElement;
    private static spdval1:HTMLElement;
    private static atkval1:HTMLElement;
    private static spatkval1:HTMLElement;
    private static defval1:HTMLElement;
    private static spdefval1:HTMLElement;

    


    private static tem2hp:HTMLInputElement;
    private static tem2sta:HTMLInputElement;
    private static tem2spd:HTMLInputElement;
    private static tem2atk:HTMLInputElement;
    private static tem2spatk:HTMLInputElement;
    private static tem2def:HTMLInputElement;
    private static tem2spdef:HTMLInputElement;

    
    private static hpval2:HTMLElement;
    private static staval2:HTMLElement;
    private static spdval2:HTMLElement;
    private static atkval2:HTMLElement;
    private static spatkval2:HTMLElement;
    private static defval2:HTMLElement;
    private static spdefval2:HTMLElement;

    private static minhp:HTMLElement;
    private static avghp:HTMLElement;
    private static maxhp:HTMLElement;
    
    private static minsta:HTMLElement;
    private static avgsta:HTMLElement;
    private static maxsta:HTMLElement;    
    
    private static minspd:HTMLElement;
    private static avgspd:HTMLElement;
    private static maxspd:HTMLElement;    
    
    private static minatk:HTMLElement;
    private static avgatk:HTMLElement;
    private static maxatk:HTMLElement;    
    
    private static minspatk:HTMLElement;
    private static avgspatk:HTMLElement;
    private static maxspatk:HTMLElement;    
    
    private static mindef:HTMLElement;
    private static avgdef:HTMLElement;
    private static maxdef:HTMLElement;    
    
    private static minspdef:HTMLElement;
    private static avgspdef:HTMLElement;
    private static maxspdef:HTMLElement;
    
    private static _instance: breedingCalc;

    private min(x:number, y:number):number{
        return x<y?x:y;
    }

    private max(x:number, y:number):number{
        return x>y?x:y;
    }
    
    private avg(x:number, y:number):number{
        return Math.trunc((x+y)/2);
    }

    private getColor(val:number){
        if(val === 50){
            return 'perfect';
        }else if(val > 37){
            return 'green';
        }else if(val < 25){
            return 'red';
        }else if(val >= 24 && val <= 37){
            return 'yellow'
        }
    }
    private constructor() {
        super(kWindowNames.breedingCalc);


        breedingCalc.temBreed1 = document.getElementById('temBreed1');
        breedingCalc.temBreed2 = document.getElementById('temBreed2');
        breedingCalc.temBreed3 = document.getElementById('temBreed3');

        breedingCalc.temBreed1.addEventListener('click', () => {
            overwolf.windows.obtainDeclaredWindow('TemTemSelector', function(result:overwolf.windows.WindowResult){
              overwolf.windows.restore(result.window.name);
            });
    
            overwolf.windows.sendMessage(kWindowNames.breedingCalc, kWindowNames.breedingCalc, '1', ()=>{console.log('Msg Has been sent to TemTemSeelctor waiting for resposne.')}); // send msg to the temtemselector page need to move to where one of the portait pictures are clicked
    
        });

        breedingCalc.temBreed2.addEventListener('click', () => {
            overwolf.windows.obtainDeclaredWindow('TemTemSelector', function(result:overwolf.windows.WindowResult){
              overwolf.windows.restore(result.window.name);
            });
    
            overwolf.windows.sendMessage(kWindowNames.breedingCalc, kWindowNames.breedingCalc, '1', ()=>{console.log('Msg Has been sent to TemTemSeelctor waiting for resposne.')}); // send msg to the temtemselector page need to move to where one of the portait pictures are clicked
    
        });


        
      overwolf.windows.onMessageReceived.addListener(function(message){
        //console.log("MSG RECIEVED: " + message.id);
        const msgContents:temListInterface = message.content;
        if(+message.id === 1){
            // female temtem
            breedingCalc.temBreed1.setAttribute('src', msgContents.portraitWikiUrl);
            breedingCalc.temBreed3.setAttribute('src', msgContents.portraitWikiUrl);
        }else if(+message.id === 2){
            breedingCalc.temBreed2.setAttribute('src', msgContents.portraitWikiUrl);
        }

        //damageCalculator.setTableRow(message.content, +message.id, fields);

      });



        breedingCalc.tem1hp = document.getElementById('tem1hp') as HTMLInputElement;
        breedingCalc.tem1sta = document.getElementById('tem1sta') as HTMLInputElement;
        breedingCalc.tem1spd = document.getElementById('tem1spd') as HTMLInputElement;
        breedingCalc.tem1atk = document.getElementById('tem1atk') as HTMLInputElement;
        breedingCalc.tem1spatk = document.getElementById('tem1spatk') as HTMLInputElement;
        breedingCalc.tem1def = document.getElementById('tem1def') as HTMLInputElement;
        breedingCalc.tem1spdef = document.getElementById('tem1spdef') as HTMLInputElement;

        breedingCalc.hpval1 = document.getElementById('hpval1');
        breedingCalc.staval1 = document.getElementById('staval1');
        breedingCalc.spdval1 = document.getElementById('spdval1');
        breedingCalc.atkval1 = document.getElementById('atkval1');
        breedingCalc.spatkval1 = document.getElementById('spatkval1');
        breedingCalc.defval1 = document.getElementById('defval1');
        breedingCalc.spdefval1 = document.getElementById('spdefval1');



        breedingCalc.tem2hp = document.getElementById('tem2hp') as HTMLInputElement;
        breedingCalc.tem2sta = document.getElementById('tem2sta') as HTMLInputElement;
        breedingCalc.tem2spd = document.getElementById('tem2spd') as HTMLInputElement;
        breedingCalc.tem2atk = document.getElementById('tem2atk') as HTMLInputElement;
        breedingCalc.tem2spatk = document.getElementById('tem2spatk') as HTMLInputElement;
        breedingCalc.tem2def = document.getElementById('tem2def') as HTMLInputElement;
        breedingCalc.tem2spdef = document.getElementById('tem2spdef') as HTMLInputElement;

        breedingCalc.hpval2 = document.getElementById('hpval2');
        breedingCalc.staval2 = document.getElementById('staval2');
        breedingCalc.spdval2 = document.getElementById('spdval2');
        breedingCalc.atkval2 = document.getElementById('atkval2');
        breedingCalc.spatkval2 = document.getElementById('spatkval2');
        breedingCalc.defval2 = document.getElementById('defval2');
        breedingCalc.spdefval2 = document.getElementById('spdefval2');



        breedingCalc.minhp = document.getElementById('minhp');
        breedingCalc.avghp = document.getElementById('avghp');
        breedingCalc.maxhp = document.getElementById('maxhp');

        breedingCalc.minsta = document.getElementById('minsta');
        breedingCalc.avgsta = document.getElementById('avgsta');
        breedingCalc.maxsta = document.getElementById('maxsta');

        breedingCalc.minspd = document.getElementById('minspd');
        breedingCalc.avgspd = document.getElementById('avgspd');
        breedingCalc.maxspd = document.getElementById('maxspd');

        breedingCalc.minatk = document.getElementById('minatk');
        breedingCalc.avgatk = document.getElementById('avgatk');
        breedingCalc.maxatk = document.getElementById('maxatk');

        breedingCalc.minspatk = document.getElementById('minspatk');
        breedingCalc.avgspatk = document.getElementById('avgspatk');
        breedingCalc.maxspatk = document.getElementById('maxspatk');

        breedingCalc.mindef = document.getElementById('mindef');
        breedingCalc.avgdef = document.getElementById('avgdef');
        breedingCalc.maxdef = document.getElementById('maxdef');

        breedingCalc.minspdef = document.getElementById('minspdef');
        breedingCalc.avgspdef = document.getElementById('avgspdef');
        breedingCalc.maxspdef = document.getElementById('maxspdef');




        
        breedingCalc.tem1hp.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1hp;
            const slider2:HTMLInputElement = breedingCalc.tem2hp;

            const min:HTMLElement = breedingCalc.minhp;
            const avg:HTMLElement = breedingCalc.avghp;
            const max:HTMLElement = breedingCalc.maxhp;

            const curLabel:HTMLElement = breedingCalc.hpval1;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat1 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });

        breedingCalc.tem2hp.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1hp;
            const slider2:HTMLInputElement = breedingCalc.tem2hp;

            const min:HTMLElement = breedingCalc.minhp;
            const avg:HTMLElement = breedingCalc.avghp;
            const max:HTMLElement = breedingCalc.maxhp;

            const curLabel:HTMLElement = breedingCalc.hpval2;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat2 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });


        
        breedingCalc.tem1sta.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1sta;
            const slider2:HTMLInputElement = breedingCalc.tem2sta;

            const min:HTMLElement = breedingCalc.minsta;
            const avg:HTMLElement = breedingCalc.avgsta;
            const max:HTMLElement = breedingCalc.maxsta;

            const curLabel:HTMLElement = breedingCalc.staval1;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat1 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });

        breedingCalc.tem2sta.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1sta;
            const slider2:HTMLInputElement = breedingCalc.tem2sta;

            const min:HTMLElement = breedingCalc.minsta;
            const avg:HTMLElement = breedingCalc.avgsta;
            const max:HTMLElement = breedingCalc.maxsta;

            const curLabel:HTMLElement = breedingCalc.staval2;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat2 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });


        
        breedingCalc.tem1spd.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1spd;
            const slider2:HTMLInputElement = breedingCalc.tem2spd;

            const min:HTMLElement = breedingCalc.minspd;
            const avg:HTMLElement = breedingCalc.avgspd;
            const max:HTMLElement = breedingCalc.maxspd;

            const curLabel:HTMLElement = breedingCalc.spdval1;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat1 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });

        breedingCalc.tem2spd.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1spd;
            const slider2:HTMLInputElement = breedingCalc.tem2spd;

            const min:HTMLElement = breedingCalc.minspd;
            const avg:HTMLElement = breedingCalc.avgspd;
            const max:HTMLElement = breedingCalc.maxspd;

            const curLabel:HTMLElement = breedingCalc.spdval2;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat2 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });


        
        breedingCalc.tem1atk.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1atk;
            const slider2:HTMLInputElement = breedingCalc.tem2atk;

            const min:HTMLElement = breedingCalc.minatk;
            const avg:HTMLElement = breedingCalc.avgatk;
            const max:HTMLElement = breedingCalc.maxatk;

            const curLabel:HTMLElement = breedingCalc.atkval1;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat1 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });

        breedingCalc.tem2atk.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1atk;
            const slider2:HTMLInputElement = breedingCalc.tem2atk;

            const min:HTMLElement = breedingCalc.minatk;
            const avg:HTMLElement = breedingCalc.avgatk;
            const max:HTMLElement = breedingCalc.maxatk;

            const curLabel:HTMLElement = breedingCalc.atkval2;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat2 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });


        
        breedingCalc.tem1spatk.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1spatk;
            const slider2:HTMLInputElement = breedingCalc.tem2spatk;

            const min:HTMLElement = breedingCalc.minspatk;
            const avg:HTMLElement = breedingCalc.avgspatk;
            const max:HTMLElement = breedingCalc.maxspatk;

            const curLabel:HTMLElement = breedingCalc.spatkval1;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat1 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });

        breedingCalc.tem2spatk.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1spatk;
            const slider2:HTMLInputElement = breedingCalc.tem2spatk;

            const min:HTMLElement = breedingCalc.minspatk;
            const avg:HTMLElement = breedingCalc.avgspatk;
            const max:HTMLElement = breedingCalc.maxspatk;

            const curLabel:HTMLElement = breedingCalc.spatkval2;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat2 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });


        
        breedingCalc.tem1def.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1def;
            const slider2:HTMLInputElement = breedingCalc.tem2def;

            const min:HTMLElement = breedingCalc.mindef;
            const avg:HTMLElement = breedingCalc.avgdef;
            const max:HTMLElement = breedingCalc.maxdef;

            const curLabel:HTMLElement = breedingCalc.defval1;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat1 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });

        breedingCalc.tem2def.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1def;
            const slider2:HTMLInputElement = breedingCalc.tem2def;

            const min:HTMLElement = breedingCalc.mindef;
            const avg:HTMLElement = breedingCalc.avgdef;
            const max:HTMLElement = breedingCalc.maxdef;

            const curLabel:HTMLElement = breedingCalc.defval2;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat2 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });


        
        breedingCalc.tem1spdef.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1spdef;
            const slider2:HTMLInputElement = breedingCalc.tem2spdef;

            const min:HTMLElement = breedingCalc.minspdef;
            const avg:HTMLElement = breedingCalc.avgspdef;
            const max:HTMLElement = breedingCalc.maxspdef;

            const curLabel:HTMLElement = breedingCalc.spdefval1;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat1 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });

        breedingCalc.tem2spdef.addEventListener('input', () => {

            const slider1:HTMLInputElement = breedingCalc.tem1spdef;
            const slider2:HTMLInputElement = breedingCalc.tem2spdef;

            const min:HTMLElement = breedingCalc.minspdef;
            const avg:HTMLElement = breedingCalc.avgspdef;
            const max:HTMLElement = breedingCalc.maxspdef;

            const curLabel:HTMLElement = breedingCalc.spdefval2;

            const stat1:number = +slider1.value;
            const stat2:number = +slider2.value;

            //change the slider label
            curLabel.innerHTML = stat2 + '';

            const minVal:number = this.min(stat1, stat2);
            const avgVal:number = this.avg(stat1,stat2);
            const maxVal:number = this.max(stat1, stat2);
            

            min.innerHTML = minVal+'';
            avg.innerHTML = avgVal+'';
            max.innerHTML = maxVal+'';

            // change color based on number
            const minColor:string = this.getColor(minVal);
            const avgColor:string = this.getColor(avgVal);
            const maxColor:string = this.getColor(maxVal);

            min.setAttribute('class', minColor);
            avg.setAttribute('class', avgColor);
            max.setAttribute('class', maxColor);

        });




    }


    public static instance() {
      if (!this._instance) {
        this._instance = new breedingCalc();
      }
      return this._instance;
    }
  
    public async run() {
    }

  
  }
  breedingCalc.instance().run();
  