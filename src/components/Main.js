import 'normalize.css/normalize.css';
import 'styles/main.scss';
import React from 'react';
import ImgFigure from './imgFigure'
import ControllerUnit from './controlUnit'
import ReactDOM from 'react-dom'
// 获取图片相关信息
let imageDatas = require('json!../data/imageDatas.json');
imageDatas=((ArrImageData) => {
	for (let i of ArrImageData){
		i.imageURL =require('../images/'+i.fileName)
	}
	return ArrImageData
})(imageDatas);

/*
*获取区间内的一个随机值
*/
let getRangeRandom=(low, high)=>{
	return Math.ceil(Math.random() * (high - low) + low);
}

/*
*获取 一个任意 0-30度的正负值
*/
let get30DegRandom = () =>{
	return ((Math.random() >0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

class GaComponent extends React.Component {
	constructor(props){
		super(props);
		this.Constant={
			centerPos:{
				left:0,
				right:0
			},
			hPosRange:{ //水平方向的取值范围
				leftSecX:[0, 0],
				rightSecX:[0, 0],
				y:[0,0]
			},
			vPosRange:{ //垂直方向的取值范围
				x:[0, 0],
				topY:[0, 0]
			}
		};
		this.state = {
			imgsArrangeArr:[]
		};
		this.inverse=this.inverse.bind(this);
	}

	/*
	*翻转图片
	*@param index 输入当前被执行inverse操作的图片对应的index值
	*@return function 是一个闭包函数，其内return一个真正待被执行的函数
	*/
	inverse(index){
		return () =>{
			let imgsArrangeArr =this.state.imgsArrangeArr;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr:imgsArrangeArr
			})
		}
	}



	/*
	* 重新布局所有图片
	* @param centerIndex 指定居中排布哪个图片
	*/
	reArrange(centerIndex) {
		let imgsArrangeArr = this.state.imgsArrangeArr;
		let Constant = this.Constant;
		let centerPos = Constant.centerPos;
		let hPosRange = Constant.hPosRange;
		let vPosRange = Constant.vPosRange;
		let hPosRangeLeftSecx = hPosRange.leftSecX;
		let hPosRangeRightSecX = hPosRange.rightSecX;
		let hPosRangeY = hPosRange.y;
		let vPosRangeTopY = vPosRange.topY;
		let vPosRangeX = vPosRange.x;

		let imgsArrangeTopArr = [];
		let topImgNum = Math.floor(Math.random() * 2); //取一个或者不取

		let topImgSpliceIndex = 0;
		let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

		imgsArrangeCenterArr[0] = {
			pos:centerPos,
			rotate: 0,
			isCenter:true
		}

		//取出要布局上侧的图片状态信息
		topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length-topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

		//布局上侧的图片
		imgsArrangeTopArr.forEach((value,index) => {
			imgsArrangeTopArr[index]={
				pos:{
					top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
					left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
				},
				rotate:get30DegRandom(),
				isCenter:false
				
			}
		});

		//布局左右两侧的图片
		for(let i=0,j=imgsArrangeArr.length,k=j/2; i<j; i++){
			let hPosRangeLORX = null;

			//前半部分布局左边，右半部分布局右边
			if(i<k){
				hPosRangeLORX = hPosRangeLeftSecx;
			}else{
				hPosRangeLORX = hPosRangeRightSecX;
			}

			imgsArrangeArr[i]= {
				pos:{
				top: getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
				left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])			
				},
				rotate:get30DegRandom(),
				isCenter:false
			};
		}

			if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
				imgsArrangeArr.splice(topImgSpliceIndex, 0 ,imgsArrangeTopArr[0]);
			}

			imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			})

	}

	/*
	* 利用rearrange函数，居中对应index的图片
	* @param index，需要被居中的图片对应的图片信心数组的index值
	*/
	center(index) {
		return (() => this.reArrange(index))
	}

	//组件加载以后，为每张图片计算其位置的范围
	componentDidMount() {

		//首先拿到舞台的大小
		let stageDom = ReactDOM.findDOMNode(this.refs.stage);
		let stageW = stageDom.scrollWidth;
		let stageH = stageDom.scrollHeight;
		let halfStageW = Math.ceil(stageW / 2);
		let halfStageH = Math.ceil(stageH / 2);

		//拿到一个imgFigure的大小
		let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0);
		let imgW = imgFigureDom.scrollWidth;
		let imgH = imgFigureDom.scrollHeight;
		let halfImgW = Math.ceil(imgW / 2);
		let halfImgH = Math.ceil(imgH / 2);

		//计算中心图片的位置点
		this.Constant.centerPos = {
			left:halfStageW - halfImgW,
			top:halfStageH - halfImgH
		}

		//计算左右侧图片的位置范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW -halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		//计算图片在上测的位置范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH -halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfStageW -imgW;
		this.Constant.vPosRange.x[1] = halfStageW;

		let num = Math.floor(Math.random() * 10);
		this.reArrange(num);
	}



  render() {
  	let controllerUnits=[];
  	let imgFigures=[];
  	imageDatas.forEach((value,index) => {
  		if(!this.state.imgsArrangeArr[index]){
  			this.state.imgsArrangeArr[index] = {
  				pos: {
  					left:0,
  					top:0
  				},
  				rotate: 0,
  				isInverse:false,
  				isCenter:false
  			}
  		}
  		imgFigures.push(<ImgFigure data= {value} key={index} ref={'imgFigure' + index}
  			arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
  			center={this.center(index)}/>);
  		controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
  		inverse={this.inverse(index)} center={this.center(index)}/>);
  	});
    return (
       <div className="stage" ref="stage">
      	<section className="img-sec">
      		{imgFigures}
      	</section>
      	<nav className="controller-nav">
      		{controllerUnits}
      	</nav>
      </div>
    );
  }
}

GaComponent.defaultProps = {
};

export default GaComponent;
