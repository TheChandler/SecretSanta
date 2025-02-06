export function Audio(src) {

    let copies = [];
    
    for (let i = 0; i < 5; i++) {
        let sound = document.createElement("audio");
        sound.src = src;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        // document.body.appendChild(sound);
        copies.push(sound);
    }

    let pointer = 0;
    this.play = function (callback) {
        copies[pointer].addEventListener('ended', (event) => {
            event.target.removeEventListener('ended', this)
            if (callback){
                callback();
            }
        })

        copies[pointer].play();
        let duration = copies[pointer].duration;
        pointer = (pointer + 1) % 5;
        console.log(copies[pointer].duration)
        return duration
    }
}