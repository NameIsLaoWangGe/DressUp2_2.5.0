import { Animation2D, Color, Effects, TimerAdmin, Tools } from "../../../Effects/lwg";
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
    onShow(): void {
        this.effects();
    };

    effects(): void {
        Animation2D.fadeOut(this.vars('E2'), 0, 1, 150, 0, () => {
            Animation2D.fadeOut(this.vars('E2'), 1, 0, 100, 0, () => {
                Animation2D.fadeOut(this.vars('E2'), 0, 1, 150, 0, () => {
                    Animation2D.fadeOut(this.vars('E2'), 1, 0, 100, 0, () => {
                    })
                })
            })
        })

        TimerAdmin._loop(1100, this, () => {
            Animation2D.fadeOut(this.vars('E3'), 1, 0, 500, 0, () => {
                Animation2D.fadeOut(this.vars('E3'), 0, 1, 500, 0, () => {
                })
            })
        }, true)

        TimerAdmin._frameNumLoop(5, 7, this, () => {
            Color._changeConstant(this.vars('E2'), [100, 100, 100], [255, 255, 255], 2);
        })

        let E4 = this.vars('E4') as Laya.Image;
        TimerAdmin._frameRandomLoop(5, 30, this, () => {
            Effects._Particle._outsideBox(E4, new Laya.Point(E4.width / 2, E4.height / 2), [E4.width / 2, E4.height / 2], null, null, null, [Effects._SkinUrl.爱心3], [[80, 80, 80, 1], [255, 255, 255, 1]], 0, 90)
        })

        let E5 = this.vars('E5') as Laya.Image;
        let numE5 = 0;

        Effects._circulation._corner(E5, [[0, 0], [606, 0], [606, 266], [0, 266]], [Effects._SkinUrl.圆形发光1], null, [60 - numE5 * 5, 60 - numE5 * 5], null, null, true,);

        TimerAdmin._frameOnce(50, this, () => {
            Effects._circulation._corner(E5, [[0, 0], [606, 0], [606, 266], [0, 266]], [Effects._SkinUrl.圆形发光1], null, [60 - numE5 * 5, 60 - numE5 * 5], null, null, true,);
        })


    }
    onDisable(): void {
        Laya.timer.clearAll(this);
        Tools.node_RemoveAllChildren(this.vars('E5'));
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