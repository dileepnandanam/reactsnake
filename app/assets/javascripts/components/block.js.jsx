class Block extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		return(
			<div className="block" style={ this.props.marked  ? {background: "#000"} : {background: "#edd"} }/>
		)
	}
}