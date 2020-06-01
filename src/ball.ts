class ball extends eui.Component implements  eui.UIComponent {
	// 神棍按钮
	private btn_start:eui.Button;
	// 足球图片
	private img_ball:eui.Image;
	// Win图片
	private win_top:eui.Image;
	private win_bottom:eui.Image;
	private i:number = 1;
	private tw:egret.Tween;
	// 用于判定输赢的0-1的随机数
	private random:number;

	public constructor() {
		super();
		// 加载皮肤
		this.skinName = "resource/gameSkins/ball.exml";
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
	private onButtonClick(e:egret.TouchEvent){			
		switch(this.i){
			case 1://开始游戏
				this.ballTween();
				this.i++;
				this.btn_start.currentState = "pause";
			break;
			case 2://暂停游戏
				this.tw.setPaused(true);
				this.btn_start.currentState = "resume";
				this.i++;
			break;
			case 3://继续游戏
				this.tw.setPaused(false);
				this.btn_start.currentState = "pause";
				this.i = 2;
			break;
			case 4://重新开始
				//将win图片设置为不可见
				this.win_top.visible = false;
				this.win_bottom.visible = false;
				//将足球图片位置居中
				this.img_ball.anchorOffsetX = this.img_ball.width/2;
				this.img_ball.anchorOffsetY = this.img_ball.height/2;
				this.img_ball.x = this.stage.width /2 ;
				this.img_ball.y = this.stage.height /2 ;
				this.i = 1;
				this.btn_start.currentState = "up"
			break;
		}
	}

	private ballTween(){
		this.random = Math.random();
		this.tw = egret.Tween.get(this.img_ball);
		if(this.random  < 0.5){			
			this.tw.to({y:1000},250).to({y:120},500).to({y:1000},500)
			.to({y:120},500).to({y:1000},500).to({y:120},500).call(()=> 
			{this.win_bottom.visible =true;this.btn_start.currentState
				 = "reset"; this.i = 4;
			});
		}
		else if(this.random > 0.5){
			this.tw.to({y:1000},250).to({y:120},500).to({y:1000},500)
			.to({y:120},500).to({y:1000},500).call(()=> {this.win_top.
				visible =true;this.btn_start.currentState = "reset";
				this.i = 4;
			});
		}
	}
	
}