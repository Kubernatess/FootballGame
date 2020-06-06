var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ball = (function (_super) {
    __extends(ball, _super);
    function ball() {
        var _this = _super.call(this) || this;
        //点击神棍,足球开始缓动
        _this.state = "ready";
        // 加载皮肤
        _this.skinName = "resource/eui_skins/ball.exml";
        return _this;
    }
    ball.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ball.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    ball.prototype.onButtonClick = function (evt) {
        switch (this.state) {
            case "ready"://开始游戏
                this.ballTween();
                this.state = "motion";
                this.btn_start.currentState = "pause";
                break;
            case "motion"://暂停游戏
                this.tw.setPaused(true);
                this.state = "pause";
                this.btn_start.currentState = "resume";
                break;
            case "pause"://继续游戏
                this.tw.setPaused(false);
                this.state = "motion";
                this.btn_start.currentState = "pause";
                break;
            case "ending"://重新开始
                this.win_top.visible = false;
                this.win_bottom.visible = false;
                //将足球图片位置居中
                this.img_ball.anchorOffsetY = this.img_ball.height / 2;
                this.img_ball.x = this.stage.width / 2;
                this.img_ball.y = this.stage.height / 2;
                this.state = "ready";
                this.btn_start.currentState = "up";
                break;
        }
    };
    ball.prototype.ballTween = function () {
        var _this = this;
        var random = Math.random();
        this.tw = egret.Tween.get(this.img_ball);
        if (random < 0.5) {
            this.tw.to({ y: 1000 }, 250).to({ y: 120 }, 500).to({ y: 1000 }, 500)
                .to({ y: 120 }, 500).to({ y: 1000 }, 500).to({ y: 120 }, 500).call(function () {
                _this.win_bottom.visible = true;
                _this.btn_start.currentState = "reset";
                _this.state = "ending";
            });
        }
        else {
            this.tw.to({ y: 1000 }, 250).to({ y: 120 }, 500).to({ y: 1000 }, 500)
                .to({ y: 120 }, 500).to({ y: 1000 }, 500).call(function () {
                _this.win_top.visible = true;
                _this.btn_start.currentState = "reset";
                _this.state = "ending";
            });
        }
    };
    return ball;
}(eui.Component));
__reflect(ball.prototype, "ball", ["eui.UIComponent", "egret.DisplayObject"]);
