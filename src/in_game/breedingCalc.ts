import { AppWindow } from "../AppWindow";
import { kWindowNames, kGamesFeatures, breedingCalcSendAndRecieveData } from "../consts";
import { eggMoveInterface, TemData, temDataAvailiable, temListInterface } from "../TemData";

import WindowState = overwolf.windows.WindowStateEx;

class breedingCalc extends AppWindow {

    private static temBreed1: HTMLElement;
    private static temBreed2: HTMLElement;
    private static temBreed3: HTMLElement;

    private static eggMoveDiv: HTMLElement;

    private static male: temListInterface; // temtem2
    private static female: temListInterface; // temtem1

    private stats: string[] = ['hp', 'sta', 'spd', 'atk', 'spatk', 'def', 'spdef'];
    private tem1: HTMLInputElement[] = new Array(this.stats.length);
    private tem2: HTMLInputElement[] = new Array(this.stats.length);
    private val1: HTMLElement[] = new Array(this.stats.length);
    private val2: HTMLElement[] = new Array(this.stats.length);
    private minavgmax: HTMLElement[][] = new Array(this.stats.length);
    private static temDataClass: TemData;

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


    private static _instance: breedingCalc;

    private min(x: number, y: number): number {
        return x < y ? x : y;
    }

    private max(x: number, y: number): number {
        return x > y ? x : y;
    }

    private avg(x: number, y: number): number {
        return Math.trunc((x + y) / 2);
    }

    private getColor(val: number) {
        if (val === 50) {
            return 'perfect';
        } else if (val > 37) {
            return 'green';
        } else if (val < 25) {
            return 'red';
        } else if (val >= 24 && val <= 37) {
            return 'yellow'
        }
    }
    private sendData(searchTem: temListInterface, windowId: number) {
        // female
        overwolf.windows.obtainDeclaredWindow('TemTemSelector', function (result: overwolf.windows.WindowResult) {
            overwolf.windows.restore(result.window.name);
        });

        let sendData: breedingCalcSendAndRecieveData = {
            windowId: windowId,
            searchTypes: searchTem === undefined || searchTem.isAvail === temDataAvailiable.no ? ['none'] : searchTem.types
        };
        //console.log(sendData);

        overwolf.windows.sendMessage(kWindowNames.TemTemSelector, kWindowNames.breedingCalc, sendData, () => { console.log('Msg Has been sent to TemTemSeelctor waiting for resposne.') }); // send msg to the temtemselector page need to move to where one of the portait pictures are clicked
    }

    private constructor() {
        super(kWindowNames.breedingCalc);


        const { temData } = overwolf.windows.getMainWindow();
        breedingCalc.temDataClass = temData;

        breedingCalc.temBreed1 = document.getElementById('temBreed1');
        breedingCalc.temBreed2 = document.getElementById('temBreed2');
        breedingCalc.temBreed3 = document.getElementById('temBreed3');

        breedingCalc.eggMoveDiv = document.getElementById('eggmoves');

        breedingCalc.temBreed1.addEventListener('click', () => {
            this.sendData(breedingCalc.male, 1); // sends for female
        });

        breedingCalc.temBreed2.addEventListener('click', () => {
            this.sendData(breedingCalc.female, 2); // sends for male

        });

        overwolf.windows.onMessageReceived.addListener(function (message) {
            //console.log("MSG RECIEVED: " + message.id);
            const msgContents: temListInterface = message.content;
            //console.log('msg contents: ' + msgContents.name + ' ID: ' + message.id);
            if (+message.id === 1) {
                breedingCalc.temBreed1.setAttribute('src', msgContents.portraitWikiUrl);
                breedingCalc.female = msgContents;
            } else if (+message.id === 2) {
                breedingCalc.temBreed2.setAttribute('src', msgContents.portraitWikiUrl);
                breedingCalc.male = msgContents;
            }
            //console.log('male: ' + breedingCalc.male + '\nfemale: ' + breedingCalc.female)
            if (breedingCalc.male != undefined && breedingCalc.female != undefined && breedingCalc.male.isAvail === temDataAvailiable.yes && breedingCalc.female.isAvail === temDataAvailiable.yes) {
                // both are ready
                breedingCalc.temBreed3.setAttribute('src', breedingCalc.female.portraitWikiUrl);
                console.log(breedingCalc.temDataClass.getTechniqueList());
                const eggMoves: eggMoveInterface[] = breedingCalc.temDataClass.getEggMoves(breedingCalc.male, breedingCalc.female);
                console.log('egg moves' + eggMoves);


                breedingCalc.eggMoveDiv.innerHTML = '';

                // start the creation of the egg move div
                //let colNumber:number = 0;
                eggMoves.forEach(element => {

                    // create the parentdiv
                    const parentDiv: HTMLElement = document.createElement('div');
                    parentDiv.setAttribute('class', 'temInheritMove movecolor');


                    // create the moves div
                    const movesParentDiv: HTMLElement = document.createElement('div');
                    movesParentDiv.setAttribute('class', 'moves');

                    // create the first child in the moves div and append it (always there)
                    const firstHold: HTMLElement = document.createElement('div');
                    firstHold.setAttribute('class', 'hold ' + element.type.toLowerCase() + 'color');


                    movesParentDiv.append(firstHold);
                    for (let counter = 0; counter < element.hold; counter++) {
                        const extraHolds: HTMLElement = document.createElement('div');
                        extraHolds.setAttribute('class', 'ehold ' + element.type.toLowerCase() + 'color');
                        movesParentDiv.append(extraHolds);
                    }

                    // append all movesdiv to the parent div
                    parentDiv.append(movesParentDiv);


                    // create the name div
                    const moveNameDiv: HTMLElement = document.createElement('div');
                    moveNameDiv.setAttribute('class', 'moveName');

                    //create the label and add it
                    const nameLabel: HTMLElement = document.createElement('label');
                    nameLabel.innerHTML = element.name;
                    moveNameDiv.append(nameLabel);

                    // add the nameDiv to the parentdiv
                    parentDiv.append(moveNameDiv);


                    // create the hpstaDivParent
                    const hpstaDiv: HTMLElement = document.createElement('div');
                    hpstaDiv.setAttribute('class', 'hpstaloc');

                    // create the hp div and the label
                    const hpDiv: HTMLElement = document.createElement('div');
                    const hpLabel: HTMLElement = document.createElement('label');
                    hpLabel.setAttribute('class', 'hpcolor');
                    hpLabel.innerHTML = element.damage + '';

                    // add the label to the hpdiv
                    hpDiv.append(hpLabel);

                    //add the hpdiv to the parent div
                    hpstaDiv.append(hpDiv);



                    // create the sta div and the label
                    const staDiv: HTMLElement = document.createElement('div');
                    const staLabel: HTMLElement = document.createElement('label');
                    staLabel.setAttribute('class', 'stacolor');
                    hpLabel.innerHTML = element.staminaCost + '';

                    // add the label to the sta
                    staDiv.append(staLabel);

                    //add the stadiv to the parent
                    hpstaDiv.append(staDiv);


                    //append the hpstadiv to the parentdiv
                    parentDiv.append(hpstaDiv);



                    breedingCalc.eggMoveDiv.append(parentDiv);
                });
            }

            //damageCalculator.setTableRow(message.content, +message.id, fields);

        });


        for (let counter = 0; counter < this.stats.length; counter++) {
            this.tem1[counter] = document.getElementById('tem1' + this.stats[counter]) as HTMLInputElement;
            this.tem2[counter] = document.getElementById('tem2' + this.stats[counter]) as HTMLInputElement;
            this.val1[counter] = document.getElementById(this.stats[counter] + 'val1');
            this.val2[counter] = document.getElementById(this.stats[counter] + 'val2');

            this.minavgmax[counter] = new Array(3);
            this.minavgmax[counter][0] = document.getElementById('min' + this.stats[counter]);
            this.minavgmax[counter][1] = document.getElementById('avg' + this.stats[counter]);
            this.minavgmax[counter][2] = document.getElementById('max' + this.stats[counter]);

            this.tem1[counter].addEventListener('input', () => {
                const slider1: HTMLInputElement = this.tem1[counter];
                const slider2: HTMLInputElement = this.tem2[counter];

                const min: HTMLElement = this.minavgmax[counter][0];
                const avg: HTMLElement = this.minavgmax[counter][1];
                const max: HTMLElement = this.minavgmax[counter][2];

                const curLabel: HTMLElement = this.val1[counter];

                const stat1: number = +slider1.value;
                const stat2: number = +slider2.value;

                //change the slider label
                curLabel.innerHTML = stat1 + '';

                const minVal: number = this.min(stat1, stat2);
                const avgVal: number = this.avg(stat1, stat2);
                const maxVal: number = this.max(stat1, stat2);


                min.innerHTML = minVal + '';
                avg.innerHTML = avgVal + '';
                max.innerHTML = maxVal + '';

                // change color based on number
                const minColor: string = this.getColor(minVal);
                const avgColor: string = this.getColor(avgVal);
                const maxColor: string = this.getColor(maxVal);

                min.setAttribute('class', minColor);
                avg.setAttribute('class', avgColor);
                max.setAttribute('class', maxColor);
            });

            this.tem2[counter].addEventListener('input', () => {
                const slider1: HTMLInputElement = this.tem1[counter];
                const slider2: HTMLInputElement = this.tem2[counter];

                const min: HTMLElement = this.minavgmax[counter][0];
                const avg: HTMLElement = this.minavgmax[counter][1];
                const max: HTMLElement = this.minavgmax[counter][2];

                const curLabel: HTMLElement = this.val2[counter];

                const stat1: number = +slider1.value;
                const stat2: number = +slider2.value;

                //change the slider label
                curLabel.innerHTML = stat2 + '';

                const minVal: number = this.min(stat1, stat2);
                const avgVal: number = this.avg(stat1, stat2);
                const maxVal: number = this.max(stat1, stat2);


                min.innerHTML = minVal + '';
                avg.innerHTML = avgVal + '';
                max.innerHTML = maxVal + '';

                // change color based on number
                const minColor: string = this.getColor(minVal);
                const avgColor: string = this.getColor(avgVal);
                const maxColor: string = this.getColor(maxVal);

                min.setAttribute('class', minColor);
                avg.setAttribute('class', avgColor);
                max.setAttribute('class', maxColor);
            });

        }

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
