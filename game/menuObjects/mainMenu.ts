import { Menu } from "../library/menu/Menu.js"

export function makeMainMenu(play, edit) {
    return new Menu({
        MENU: {
            hide:false,
            items: [
                {
                    name: 'PLAY',
                    color: "#4010BB",
                    func: play
                },
                {
                    name: "EDIT",
                    func: edit
                },
                {
                    name: "SUBMENU",
                    menu: "SUBMENU"
                }
            ]
        },
        SUBMENU: {
            items: [
                {
                    name: "BACK",
                    menu: 'MENU'
                }
            ]
        }
    })
}