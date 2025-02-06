import { CreateImage } from "../library/MakeImage.js"

export class FacecamData {
    constructor(openMouthPath: string, closedMouthPath: string) {
        this.openMouth = CreateImage(openMouthPath);
        this.closedMouth = CreateImage(closedMouthPath);
    }
    private openMouth: HTMLImageElement;
    private closedMouth: HTMLImageElement;
    get open(){
        return this.openMouth;
    }
    get closed(){
        return this.closedMouth;
    }
}
export const sarahFacecamData = new FacecamData("game/images/sarahmouth_open.png","game/images/sarahmouth_closed.png")
export const jeffmFacecamData = new FacecamData("game/images/jeffm_mouthOpen.png","game/images/jeffm_mouthClosed.png")
export const benFacecamData = new FacecamData("game/images/ben_mouthOpen.png","game/images/ben_mouthClosed.png")
export const janetFacecamData = new FacecamData("game/images/janet_mouthOpen.png","game/images/janet_mouthClosed.png")
export const leoFacecamData = new FacecamData("game/images/leo_mouthOpen.png","game/images/leo_mouthClosed.png")
export const haleyFacecamData = new FacecamData("game/images/haley_mouthopen.png","game/images/haley_mouthclosed.png")
