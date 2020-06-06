class ball extends eui.Component implements  eui.UIComponent {
	// 神棍按钮
	private btn_start:eui.Button;
	// 足球图片
	private img_ball:eui.Image;
	// Win图片
	private win_top:eui.Image;
	private win_bottom:eui.Image;

	public constructor() {
		super();
		// 加载皮肤
		this.skinName = "resource/eui_skins/ball.exml";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
	}

	//点击神棍,足球开始缓动
	private state:string = "ready";
	private onButtonClick(evt:egret.TouchEvent){
		switch(this.state){
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
				this.img_ball.anchorOffsetY = this.img_ball.height/2;
				this.img_ball.x = this.stage.width /2 ;
				this.img_ball.y = this.stage.height /2 ;
				this.state = "ready";
				this.btn_start.currentState = "up"				
			break;
		}
	}

	private tw:egret.Tween;
	private ballTween(){
		let random:number = Math.random();
		this.tw = egret.Tween.get(this.img_ball);
		if(random  < 0.5){			
			this.tw.to({y:1000},250).to({y:120},500).to({y:1000},500)
			.to({y:120},500).to({y:1000},500).to({y:120},500).call(()=> {	
				this.win_bottom.visible = true;
				this.btn_start.currentState = "reset";
				this.state = "ending";
			});
		}
		else{
			this.tw.to({y:1000},250).to({y:120},500).to({y:1000},500)
			.to({y:120},500).to({y:1000},500).call(()=> {
				this.win_top.visible = true;
				this.btn_start.currentState = "reset";
				this.state = "ending";
			});
		}
	}
	
}