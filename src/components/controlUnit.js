import React from 'react';

class ControllerUnit extends React.Component{
	constructor(props) {
    	super(props);
    	this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		//如果点击的是当前正在选中的按钮，就翻转图片，否则就将对应的图片居中
		if(this.props.arrange.isCenter) {
			this.props.inverse();
		} else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	}

	render() {
		let controllerUnitClassName = 'controller-unit';
		//如果是居中的图片，显示控制按钮的居中态
		if(this.props.arrange.isCenter) {
			controllerUnitClassName += ' is-center';
			//如果翻转图片，就显示按钮翻转态
			if(this.props.arrange.isInverse) {
				controllerUnitClassName += ' is-inverse';
			}
		}
		return (
			<span className={controllerUnitClassName} onClick={this.handleClick}></span>
		)
	}
}

export default ControllerUnit;