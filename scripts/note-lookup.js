const _map = require('./bi-map');


const NoteLookup = {};

NoteLookup.nameToTone = new _map.BiMap();
NoteLookup.nameToTone.add("C",0);
NoteLookup.nameToTone.add("C#",1);
NoteLookup.nameToTone.add("D",2);
NoteLookup.nameToTone.add("D#",3);
NoteLookup.nameToTone.add("E",4);
NoteLookup.nameToTone.add("F",5);
NoteLookup.nameToTone.add("F#",6);
NoteLookup.nameToTone.add("G",7);
NoteLookup.nameToTone.add("G#",8);
NoteLookup.nameToTone.add("A",9);
NoteLookup.nameToTone.add("A#",10);
NoteLookup.nameToTone.add("B",11);

NoteLookup.getNormalizedTone = (toneValue) => toneValue%12;

NoteLookup.getNoteName = (toneValue,withOctave=false) => {
    if(!withOctave){
        return NoteLookup.nameToTone.getBackward(parseInt(toneValue%12));
    }

    else{
        let octave = Math.floor(parseInt(toneValue)/12)-1;
        return NoteLookup.nameToTone.getBackward(NoteLookup.getNormalizedTone(toneValue%12)) + " " + octave.toString();
    }   
}

NoteLookup.getNoteNameForFrequency = (frequency,withOctave=false) => {
    let tone = NoteLookup.getToneForFrequency(frequency);
    return NoteLookup.getNoteName(tone,withOctave)
}

NoteLookup.getToneForFrequency = (frequency) => {
    return parseInt(69 + 12*Math.log(frequency/440.0)/Math.log(2.0));
}

NoteLookup.getFrequencyForTone = (toneValue) => {
    return 440*Math.pow(2,(toneValue-69)/12);
}

NoteLookup.getFrequencyForNoteName = (noteName) => {
    let tone = NoteLookup.getToneForNoteName(noteName);
    return NoteLookup.getFrequencyForTone(tone);
}

NoteLookup.getToneForNoteName = (noteName) => {
    let nameSplit = noteName.split(" ");
    let noteLetter = nameSplit[0];
    let octave = nameSplit[1];

    let octaveVal = parseInt(octave);
    return NoteLookup.nameToTone.getForward(noteLetter) + ((octaveVal+1)*12);
}


module.exports.NoteLookup = NoteLookup;

