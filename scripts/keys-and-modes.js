const noteLookup = require('./note-lookup');
const NoteLookup = noteLookup.NoteLookup;

class ModeLookup{
    constructor(){
        this.modes = {};
        this.modeNames = ["ionian","dorian","phrygian","lydian","mixolydian","aeolian","locrian"];
        this.generateModes();
    }

    generateModes(){
        let rootMode = [2,2,1,2,2,2,1];
        let _modes = this.modeNames.slice();

        while (_modes.length > 0){
            this.modes[_modes.shift()] = rootMode.slice();
            let first = rootMode.shift();
            rootMode.push(first);
        }
    }

    getMode(rootNote, modeName){
        let notes = [];
        let tones = [];
        let lastNote = NoteLookup.getToneForNoteName(rootNote + " 0");

        this.modes[modeName].forEach((interval) => {
            notes.push(NoteLookup.getNoteName(lastNote));
            tones.push(lastNote%12);
            lastNote += interval;
        })

        return {mode: modeName, root : rootNote, notes : notes, tones : tones};
    }
}

module.exports.ModeLookup = new ModeLookup();
