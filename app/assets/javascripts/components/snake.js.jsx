class Snake extends React.Component {
	constructor(props) {
		super(props)
		this.direction = {
			left:[0,-1],
			right:[0,1],
			up:[-1,0],
			down:[1,0]
		}
		
		this.state = {body: [[8,4],[7,4],[6,4]],
						current_direction: 'down',
						bait_position:[9,6]}
		this.onKeyDown = this.onKeyDown.bind(this)
		this.checkContact = this.checkContact.bind(this)
		this.placeBait = this.placeBait.bind(this)
	}
	componentDidMount() {
		
		$(document.body).on('keydown', this.onKeyDown)
		this.moveSnake()
	}

	onKeyDown(e)
	{
		
		if(e.keyCode == 37){
			this.setState({body: this.state.body, current_direction: 'left'})

		}
		else if(e.keyCode == 38){
			this.setState({body: this.state.body, current_direction: 'up'})
		}
		else if(e.keyCode == 40){
			this.setState({body: this.state.body, current_direction: 'down'})
		}
		else if(e.keyCode == 39){
			this.setState({body: this.state.body, current_direction: 'right'})
		}
	}
	placeBait() {
		this.setState({
			body: this.state.body,
			current_direction: this.state.current_direction,
			bait_position:[Math.floor(Math.random()*10),Math.floor(Math.random()*10)]
		})
	}



	moveSnake(){
		body = this.state.body
		head = body[0]

		new_head = [head[0] + this.direction[this.state.current_direction][0], head[1] + this.direction[this.state.current_direction][1]]
		if(new_head[0] == this.state.bait_position[0] && new_head[1] == this.state.bait_position[1])
		{	
			limit=body.length
			this.placeBait()
		}else{
			limit=body.length-1
		}

		for(i=limit; i>-1; i--){
			body[i] = body[i-1]
		}
		body[0] = new_head

		if(this.checkContact(new_head,body)){
			this.setState({body: body,
			   current_direction:this.state.current_direction,
			   bait_position: this.state.bait_position
			})
			setTimeout(function(){ this.moveSnake()}.bind(this), 400)
		}else{
		    
		    
			alert("Game over")
			this.setState({body: [[8,4],[7,4],[6,4]],
						current_direction: 'down',
						bait_position:[9,6]})
			setTimeout(function(){ this.moveSnake()}.bind(this), 400)
			
		}	
			
		
			

	}
	checkContact(new_head, body) {
		for(i=1; i< body.length; i++){
			if(new_head[0] == body[i][0] && new_head[1] == body[i][1])
				return(false)
		}
		return(new_head[0] < this.props.height && new_head[0] > -1 && new_head[1] < this.props.width && new_head[1] > -1)
	}

	render() {
		var board = []
		for(i=0; i< this.props.height; i++) {
			board[i] = []
			for(j=0; j< this.props.width; j++) {
				board[i][j] = <Block marked={ false } />
			}
			board[i][this.props.width]= <div className="clearfix" />
		}

		for(i=0; i< this.state.body.length; i++){
			body_segment = this.state.body[i]
			board[body_segment[0]][body_segment[1]] = <Block marked={ true } />
		}
		board[this.state.bait_position[0]][this.state.bait_position[1]] = <Block marked={ true } />

		return(
			<div className="snake">
			  {board}
			</div>
		)

	}
}