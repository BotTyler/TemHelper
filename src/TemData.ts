import axios from 'axios';

export class TemData {
  static temtem: temListInterface;
  forEach(arg0: (element: any) => void) {
    throw new Error("Method not implemented.");
  }
    public temList:temListInterface[];
    public dmgTable:object;
    public temListErr:number = 0;
    public tableErr:number = 0;
  constructor() {

    if(this.temList === undefined || this.temListErr != 1 || this.dmgTable === undefined || this.tableErr != 1){
        this.temList = undefined;
        this.dmgTable = undefined;
        this.temListErr = 0;
        this.tableErr = 0;

        this.collectData();
        //console.log("Done");
        this.getTable();
    }
  }
  public static logTem(x:temListInterface){
      console.log("Number: " + x.number +"\tname: " + x.name +"\ttypes: " + x.types+"\ttraits: " + x.traits+"\ticon: " + x.portraitWikiUrl);
    

  }

  public static logTemBasicData(x:temListInterface[]){
    x.forEach(element => {
      console.log("Number: " + element.number +"\tname: " + element.name +"\ttypes: " + element.types+"\ttraits: " + element.traits+"\ticon: " + element.portraitWikiUrl + "\tcatchRate: " + element.catchRate);
    });

  }

  public static logTemLocation(x:temListInterface){
    console.log('pringing');
    x.locations.forEach((element, index) => {
      console.log('Location ' + (index+1) + '\tLocation: ' + element.location + '\tisland: ' + element.island + '\tfrequency: ' + element.frequency + '\tlevel: ' + element.level + '\n\t\t*********FreeTem**********\n\t\t' + 'minLevel: ' + element.freetem.minLevel + '\tmaxLevel: ' + element.freetem.maxLevel + '\tminPansuns: ' + element.freetem.minPansuns + '\tmaxPansuns: ' + element.freetem.maxPansuns);
    });
  }
  
  private formUrl(fields:string[]){
    var result = 'https://temtem-api.mael.tech/api/temtems?fields=';
    
    fields.forEach(element => {
      fields.push()
      result += element + ",";
    });
    result = result.substring(0,result.length-1);
    //console.log('https://temtem-api.mael.tech/api/temtems?fields=number,name,types,traits,icon,lumaIcon,portraitWikiUrl' === result);
    //console.log('result: ' + result);
    return result;
  }
  public async getTable(){
    let dmgUrl = "https://temtem-api.mael.tech/api/weaknesses";

    try{

      console.log("\n\n\n\nSTARTING SECOND DATA COLLECTION")
      const res = await axios.get(dmgUrl,{});
      this.dmgTable = JSON.parse(JSON.stringify(res.data));
      this.tableErr = 1; // change this to sephamores
    }catch(expection){
      console.log('Something has failed in the data collection');
      this.tableErr = -1;
    }
  }



  public async collectData(){
    let fields = ['number', 'name', 'types', 'traits' , 'portraitWikiUrl', 'locations', 'catchRate', 'stats'];
    let url = this.formUrl(fields);

    try{
      const {data, status} = await axios.get<temListInterface[]>(url,{});
      this.temList = data;
      this.temListErr = 1; // change this to sephamores
    }catch(expection){
      console.log('Something has failed in the data collection');
      this.temListErr = -1;
    }


    //console.log(this.temList);
  }



  private swap(arr:temListInterface[], i:number, j:number){
    let temp:temListInterface = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  private partition(arr:temListInterface[], low:number, high:number):number{

    let pivot = arr[high];

    let i:number = low-1;

    for(let j:number = low; j <= high-1; j++){
      if(arr[j].name < pivot.name){
        i++
        this.swap(arr,i,j);
      }
    }
    this.swap(arr,i+1, high);
    return i+1;
  }


  private quickSort(arr:temListInterface[], low:number, high:number){
    if(low < high){
      let pi:number = this.partition(arr, low, high);
      this.quickSort(arr, low, pi-1);
      this.quickSort(arr,pi+1,high);
    }
  }

  public sortList(){
    this.quickSort(this.temList, 0, this.temList.length-1);
    //this.cLogTemTemData(this.temList);
  }

}
export interface temListInterface{
  number:number;
  name:string;
  types:string[];
  traits:string[];
  portraitWikiUrl:string;
  locations:locationInterface[];
  catchRate:number;
  stats:statsInterface;
  //minPansuns:number; needs to take care of the location json obj
  
}
export interface statsInterface{
  hp:number;
  sta:number;
  spd:number;
  atk:number;
  def:number;
  spatk:number;
  spdef:number;
  total:number;
}
export interface locationInterface{
  location:string;
  island:string;
  frequency:string;
  level:string;
  freetem:freeTemInterface;
  
}

export interface freeTemInterface{
  minLevel:number;
  maxLevel:number;
  minPansuns:number;
  maxPansuns:number;
}

