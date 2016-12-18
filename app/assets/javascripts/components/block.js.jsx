class Block extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		var blockClass = 'block'
		if(this.props.bait){
			blockClass = blockClass + ' ' + 'bait'
		}
		if(this.props.marked){
			blockClass = blockClass + ' ' + 'marked'
		}

		return(
			<div className={blockClass} />
		)
	}
}