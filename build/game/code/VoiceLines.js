import { randomInt } from "../library/AssortedFuctions.js";
import { Audio } from "./Audio.js";
const DEATH = 1;
const WIN = 2;
const START = 3;
export class VoiceLine {
    constructor(character, filename, type, limit) {
        this.character = '';
        this.audio = null;
        this.type = null;
        this.timesRun = 0;
        this.limit = 1;
        this.type = type;
        this.character = character;
        this.audio = new Audio("game/sound/" + filename);
        if (limit) {
            this.limit = limit;
        }
    }
}
export class VoiceLines {
    constructor() {
        this.lines = [];
        this.addLine("ben", "Ben_ClipThatTwitch.mp3", WIN);
        this.addLine("ben", "ben_fuckyeah.mp3", WIN);
        this.addLine("ben", "Ben_heresthechallenge.mp3", START);
        // this.addLine("ben", "Ben_imstillfrandresser.mp3", WIN);
        this.addLine("ben", "Ben_ohmygod.mp3", DEATH);
        this.addLine("ben", "Ben_ohshoot.mp3", DEATH);
        this.addLine("ben", "ben_ooohbabymama.mp3", WIN);
        this.addLine("ben", "Ben_really.mp3", DEATH);
        this.addLine("ben", "Ben_thisiswinning.mp3", WIN);
        this.addLine("ben", "ben_wah.mp3", DEATH);
        this.addLine("ben", "Ben_WAIL.mp3", DEATH);
        // this.addLine("ben", "Ben_welcometominnmax.mp3", START);
        this.addLine("ben", "Ben_whatwouldaplanentail.mp3", DEATH);
        this.addLine("ben", "ben_whostheboomernow.mp3", WIN);
        this.addLine("janet", "Janet_Idontknowwhatimlookingat.mp3", DEATH);
        this.addLine("janet", "Janet_itlookssocomplicated.mp3", START);
        this.addLine("janet", "Janet_wedidit.mp3", WIN);
        this.addLine("jeffm", "Jeffm_Ohman.mp3", DEATH);
        this.addLine("leo", "leo_hemethisend.mp3", DEATH);
        this.addLine("leo", "Leo_sorryigotyourfirendkilled.mp3", DEATH);
        this.addLine("leo", "leo_sorryIkilledyourfriend.mp3", DEATH);
        this.addLine("ben", "Ronnie-sand.mp3", DEATH); //Todo: This should be ronnie
        this.addLine("sarah", "Sarah_chatdonthelphim.mp3", DEATH);
        this.addLine("sarah", "Sarah_didueventry.mp3", DEATH);
        this.addLine("sarah", "sarah_godIlovetotalkshit.mp3", DEATH);
        // this.addLine("sarah", "Sarah_hohohobitches.mp3", START);
        this.addLine("sarah", "sarah_FUCK.mp3", DEATH);
        this.addLine("sarah", "Sarah_imadumbass.mp3", WIN);
        this.addLine("sarah", "sarah_thanksforwhateverthatwas.mp3", DEATH);
        this.addLine("sarah", "sarah_thiskidsadumbass.mp3", DEATH);
        this.addLine("haley", 'haley_ohno.mp3', DEATH);
        // this.addLine("sarah", "", START);
    }
    addLine(character, filename, type) {
        this.lines.push(new VoiceLine(character, filename, type));
    }
    getDeath() {
        return this.getLineOfType(DEATH);
    }
    getWin() {
        return this.getLineOfType(WIN);
    }
    getStart() {
        return this.getLineOfType(START);
    }
    /**
     * returns a voiceline object. Only returns lines that have been played the least
     * @param type The type of line to get
     * @returns
     *
     */
    getLineOfType(type) {
        let filteredLines = this.lines.filter((line) => line.type === type);
        let minTimesRun = filteredLines.reduce((prev, current) => current.timesRun < prev ? current.timesRun : prev, 100);
        console.log("MIN TIMES RUN", minTimesRun);
        filteredLines = filteredLines.filter((line) => line.timesRun === minTimesRun);
        console.log("NUM LINES", filteredLines.length);
        let selectedLine = filteredLines[randomInt(filteredLines.length)];
        selectedLine.timesRun++;
        return selectedLine;
    }
}
