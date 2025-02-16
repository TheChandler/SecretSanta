import { Facecam } from "./Facecam.js";
import { sarahFacecamData, jeffmFacecamData, benFacecamData, janetFacecamData, leoFacecamData, haleyFacecamData } from "./FacecamData.js";
import { VoiceLines } from "./VoiceLines.js";
export class CharacterHandler {
    constructor() {
        this.facecams = {};
        this.activeFacecam = '';
        this.voiceLines = new VoiceLines();
        this.facecams['sarah'] = new Facecam(sarahFacecamData);
        this.facecams['jeffm'] = new Facecam(jeffmFacecamData);
        this.facecams['ben'] = new Facecam(benFacecamData);
        this.facecams['janet'] = new Facecam(janetFacecamData);
        this.facecams['leo'] = new Facecam(leoFacecamData);
        this.facecams['haley'] = new Facecam(haleyFacecamData);
    }
    get facecam() {
        if (this.activeFacecam) {
            return this.facecams[this.activeFacecam];
        }
        return null;
    }
    die() {
        let voiceLine = this.voiceLines.getDeath();
        return this.speakLine(voiceLine);
    }
    win() {
        let voiceline = this.voiceLines.getWin();
        return this.speakLine(voiceline);
    }
    speakLine(voiceLine) {
        var _a;
        let duration = (_a = voiceLine.audio) === null || _a === void 0 ? void 0 : _a.play(() => {
            if (this.facecam) {
                this.facecam.stopTalking();
                setTimeout(() => {
                    this.activeFacecam = '';
                }, 500);
            }
        });
        this.activeFacecam = voiceLine.character;
        this.facecam.startTalking();
        return duration;
    }
    nextLevel() {
        this.voiceLines.getStart();
    }
}
