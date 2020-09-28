import { Animation2D, Color, TimerAdmin } from "../../../Effects/lwg";
import { OpenType, UIBase, UIMgr } from "../../Frame/Core";
import GameDataController from "../GameDataController";
import { ManData } from "../ManConfigData";
import UICollection from "./UICollection";
import UIDraw from "./UIDraw";

export default class UISure extends UIBase {

    _openType = OpenType.Attach;

    OkBtn: Laya.Image;
    CloseBtn: Laya.Image;
    paintingID: string;
    str = {};
    onInit() {
        this.OkBtn = this.vars("OkBtn");
        this.CloseBtn = this.vars("CloseBtn");

        this.btnEv("OkBtn", this.OkBtnClick)

        this.btnEv("CloseBtn", () => {
            this.hide();
        })
    }
    onShow():void{
        this.effects();
    };

    effects(): void {
        let num = 0;
        var func = () => {
            num++;
            Animation2D.fadeOut(this.vars('E2'), 0, 1, 100, 0, () => {
                Animation2D.fadeOut(this.vars('E2'), 1, 0, 100, 0, () => {
                    if (num > 2) {
                        return;
                    } else {
                        func();
                    }
                })
            })
        }
        func();
        TimerAdmin._frameNumLoop(5, 7, this, () => {
            Color._changeConstant(this.vars('E2'), [100, 100, 100], [255, 255, 255], 2);
        })
    }

    OkBtnClick() {

        this.paintingID = GameDataController.paint;
        this.str = GameDataController.ManStarRefresh;
        let man: ManData = GameDataController.man;
        let star = GameDataController.ManStarRefresh[man.ID];
        let level: number = 0;
        if (star <= 3) {
            level = star - 1;
        }
        else {
            level = 2;
        }
        if (man.Painting[level] == this.paintingID) {
            if (star <= 3) {
                console.log("成功了！！")
                this.str[man.ID] += 1;
                Laya.LocalStorage.setJSON("ManStar", this.str);
                // (UIMgr.get("UICollection") as UICollection).onRefresh;
                (UIMgr.get("UIDraw") as UIDraw).onHide();
                UIMgr.show("UIDateSucceed");
            }
            else {
                console.log("成功了！！");
                (UIMgr.get("UIDraw") as UIDraw).onHide();
                UIMgr.show("UIDateSucceed");
            }
        }
        else {
            console.log("失败了！！")
            UIMgr.show("UIDateFail");
        }

        this.hide();
    }
}