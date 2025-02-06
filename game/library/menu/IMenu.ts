
export interface IMenuPage {
    hide?: boolean;
    items: IMenuItem[];
}
export interface IMenuItem {
    name: string;
    color?: string;
    func?: () => void;
    menu?: string
}
export interface IMenu {
    [key: string]: IMenuPage;
}