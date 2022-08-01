import { ajax } from 'rxjs/ajax';
import { forkJoin } from 'rxjs';

export class TemData {
  static temtem: temListInterface;

  private static temList: temListInterface[];
  private static dmgTable: object;
  private static techniques: eggMoveInterface[];
  private static dataCollected: boolean = false;
  //public static fetchErr:number = 0;

  //public static temp:number = 0;
  /*
  public temListErr:number = 0;
  public tableErr:number = 0;
  public techniqueErr:number = 0;
  */










  constructor() {
    console.log('data collected: ' + TemData.dataCollected);
    if (TemData.dataCollected === false) {
      console.log('constructor called');
      TemData.temList = undefined;
      TemData.dmgTable = undefined;
      TemData.techniques = undefined;
      this.startCollecting();
    }


  }

  public startCollecting() {

    const temtemUrl = "https://temtem-api.mael.tech/api/temtems";
    const tableUrl = "https://temtem-api.mael.tech/api/weaknesses";
    const techniqueUrl = "https://temtem-api.mael.tech/api/techniques";



    forkJoin(
      {

        temLists: ajax.getJSON<temListInterface[]>(temtemUrl),
        tableList: ajax.getJSON<object>(tableUrl),
        techniqueList: ajax.getJSON<eggMoveInterface[]>(techniqueUrl)

      }
    ).subscribe(function (val) {
      //console.log('asdfasdfasdf1:'+val.temLists + '\n2:'+ val.techniqueList + '\n3:' + val.tableList);

      TemData.temList = val.temLists;
      TemData.temList.forEach(element => {
        element.isAvail = temDataAvailiable.yes;
      });

      TemData.techniques = val.techniqueList;
      TemData.dmgTable = val.tableList;
      TemData.sortList();
      TemData.dataCollected = true;
    });

  }






  private static swap(arr, i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  private static partition(arr: temListInterface[], low: number, high: number, compareFunc): number {

    let pivot = arr[high];

    let i: number = low - 1;

    for (let j: number = low; j <= high - 1; j++) {
      //if(arr[j].name < pivot.name){
      if (compareFunc(arr[j], pivot)) {
        i++
        this.swap(arr, i, j);
      }
    }
    this.swap(arr, i + 1, high);
    return i + 1;
  }


  private static quickSort(arr, low: number, high: number, compareFunc) {
    if (low < high) {
      let pi: number = this.partition(arr, low, high, compareFunc);
      this.quickSort(arr, low, pi - 1, compareFunc);
      this.quickSort(arr, pi + 1, high, compareFunc);
    }
  }

  public static sortList() {
    this.quickSort(TemData.temList, 0, TemData.temList.length - 1, this.compareNames);
    //this.cLogTemTemData(this.temList);
    this.extractBreedingMoves(TemData.temList);
    this.quickSort(TemData.techniques, 0, TemData.techniques.length - 1, this.techniqueSort);
    console.log('techniques' + TemData.techniques);
  }

  private static compareNames(tem1: temListInterface, tem2: temListInterface): boolean {
    return tem1.name < tem2.name;
  }

  private static techniqueSort(move1: eggMoveInterface, move2: eggMoveInterface): boolean {
    return move1.name < move2.name;
  }


  private static extractBreedingMoves(arr: temListInterface[]) {
    //console.log('first');
    arr.forEach(element => {
      var breedingMoves: techniqueInterface[] = new Array();
      //console.log('first2: ' + element.name + ' ' + element.number + ' : ' + element.techniques);
      element.techniques.forEach(ele => {
        if (ele.source === 'Breeding') {
          //console.log('adding eggmove at index: ' + breedingMoves.length);
          breedingMoves[breedingMoves.length] = ele;
        }
      });
      element.breedingMoves = breedingMoves;
    });

  }








  // gets the eggmoves of a certain breeding (maybe i can make it more efficient by making base cases in the matching)
  public getEggMoves(male: temListInterface, female: temListInterface): eggMoveInterface[] {
    var eggMoves: eggMoveInterface[] = new Array();

    male.techniques.forEach(maleMove => {
      female.breedingMoves.forEach(femaleMove => {
        if (femaleMove.name === maleMove.name) {
          // potential egg move
          console.log('looking up: ' + femaleMove.name);
          const a = this.lookupeggmove(femaleMove.name);
          console.log('Lookup: ' + a);
          eggMoves[eggMoves.length] = a;
        }

      });
    });

    return eggMoves;

  }


  // will return the technique that is being searched for
  private lookupeggmove(name: string): eggMoveInterface {
    let bottom: number = 0;
    let top: number = TemData.techniques.length - 1;

    while (bottom <= top) {
      let mid: number = Math.floor((bottom + (top - 1)) / 2);
      console.log('mid: ' + mid);
      let val = TemData.techniques[mid];
      if (val.name === name) {
        console.log('Found move: ' + val.name);
        return val;
      } else if (val.name > name) {
        console.log('val greater than name: ' + val.name);
        top = mid - 1;
      } else {
        console.log('val less than name: ' + val.name);
        bottom = mid + 1;
      }
    }
    console.log('never should get here!!!!!!!!!!!');
    return null;
  }


  public getTemList(): temListInterface[] {
    return TemData.temList;
  }

  public getDmgTable(): Object {
    return TemData.dmgTable;
  }
  public getTechniqueList() {
    return TemData.techniques;
  }

  public isDataAvailable() {
    return TemData.dataCollected;
  }

}

export interface eggMoveInterface {
  name: string;
  type: string;
  class: string;
  damage: number;
  staminaCost: number;
  hold: number;
  priority: string;
  synergy: string; // this value can contain the value none which is the same as null
  synergyEffects: synergyInterface[];
  effectText: string;

}

export interface synergyInterface {
  damage: number;
  type: string;
  effect: string;
}


export interface temListInterface {
  number: number;
  name: string;
  types: string[];
  traits: string[];
  portraitWikiUrl: string;
  locations: locationInterface[];
  catchRate: number;
  stats: statsInterface;
  techniques: techniqueInterface[];
  //minPansuns:number; needs to take care of the location json obj
  breedingMoves: techniqueInterface[];
  isAvail: temDataAvailiable;

}
export interface statsInterface {
  hp: number;
  sta: number;
  spd: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  total: number;
}
export interface locationInterface {
  location: string;
  island: string;
  frequency: string;
  level: string;
  freetem: freeTemInterface;

}

export interface freeTemInterface {
  minLevel: number;
  maxLevel: number;
  minPansuns: number;
  maxPansuns: number;
}

export interface techniqueInterface {
  name: string;
  source: string;
  levels: number;
}

export enum temDataAvailiable {
  yes, no, inProgress
}
