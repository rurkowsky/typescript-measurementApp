interface Dane {
    data: Date,
    pomiar: number
    roznica: number
}


class Pomiary {

    protected lista: Array<Dane> = [];

    dodaj(data_: Date, pomiar_:number)
    {
        let roznica = 0;
        if(this.lista.length>0)
            roznica = pomiar_ - this.lista[this.lista.length-1].pomiar;
        this.lista.push({data:data_, pomiar:pomiar_, roznica:roznica});
    }

    ostPomiar(){
        return this.lista[this.lista.length-1]
    }

    roznica(dataStart: Date, dataKoniec: Date)
    {
        let pomStart = this.lista.filter( e => e.data.getTime() == dataStart.getTime() );
        let pomKoniec = this.lista.filter( e => e.data.getTime() == dataKoniec.getTime());
        

        if(dataKoniec.getTime() < dataStart.getTime() || pomStart.length == 0 || pomKoniec.length == 0)
                return -1;

        return pomKoniec[0].pomiar - pomStart[0].pomiar;        
    }

    srednieWOkresie(dataStart: Date, dataKoniec: Date){

        let dane = this.lista.filter( e => e.data.getTime() >= dataStart.getTime() && e.data.getTime() <= dataKoniec.getTime() );
        
        if(dane.length == 0) return -1;

        let stan0 = dane[0].pomiar;
        let suma = 0;
        dane.forEach( e => {
            suma += e.pomiar - stan0;
            stan0 = e.pomiar;

        })

        
        return suma / (dane.length-1);

    }

}

class PomiaryNew extends Pomiary {

    daneZak(dataStart:Date, dataKoniec:Date)
    {
        return this.lista.filter( e => e.data.getTime() >= dataStart.getTime() && e.data.getTime() <= dataKoniec.getTime() );
    }

    max(dataStart:Date, dataKoniec:Date){
        let dane = this.lista.filter( e => e.data.getTime() >= dataStart.getTime() && e.data.getTime() <= dataKoniec.getTime() );
        let tmp = {roznica:0};
        dane.forEach( e => {
            if(e.roznica > tmp.roznica ) tmp = e;
        })

        return tmp;
    }

    min(dataStart:Date, dataKoniec:Date){
        let dane = this.lista.filter( e => e.data.getTime() >= dataStart.getTime() && e.data.getTime() <= dataKoniec.getTime() );
        let tmp = this.max(dataStart, dataKoniec);
        dane.forEach( e => {
            if(e.roznica < tmp.roznica ) tmp = e;
        })

        return tmp;
    }

    avg(dataStart:Date, dataKoniec:Date)
    {
        let dane = this.daneZak(dataStart, dataKoniec);
        return dane.reduce((a,e) => a + e.roznica, 0)/dane.length;
    }

    statMonth(dataStart:Date, dataKoniec:Date)
    {
        let dane = this.daneZak(dataStart, dataKoniec);
        dane.forEach(e => {
            console.log(e.data);
        })
    }

}


let pom = new PomiaryNew();

let start = new Date('2022-01-01T00:00:00.000Z');
console.log(start);
let pomiar = 10;
for(let i=1; i<7; i++)
{//start.getHours()+1  //start.setHours(start.getHours()+1)
    pom.dodaj(start, pomiar+=Math.floor((Math.random()*4)));
    start.setDate( start.getDate()+1 );
  console.log(start);
  
}


let dataStart = new Date('2022-01-01T00:00:00.000Z');
let dataStop = new Date('2022-01-07T00:00:00.000Z');


console.log("max:", pom.max(dataStart, dataStop));
console.log("min:", pom.min(dataStart, dataStop));
console.log("avg:", pom.avg(dataStart, dataStop));