import PropTypes from 'prop-types'
import React from 'react'
import kyle from '../images/kyle.jpg'
import kristin from '../images/kristin.jpg'

class Main extends React.Component {

	constructor() {
		super();
		this.state = {};
	}

	encode(data) {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			.join("&");
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target,
			data = this.encode({
				"form-name": form.getAttribute("name"),
				...this.state
			});

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: data
		}).then(() => this.setState({ submitted: true })).catch(error => alert(error));
	}

	render() {
		let close = (
			<div
				className="close"
				onClick={() => {
					this.props.onCloseArticle()
				}}
			></div>
		);

		return (
			<div
				ref={this.props.setWrapperRef}
				id="main"
				style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}
			>
				<article
					id="intro"
					className={`${this.props.article === 'intro' ? 'active wide' : ''} ${
						this.props.articleTimeout ? 'timeout' : ''
						}`}
					style={{ display: 'none' }}
				>
					<h2 className="major">About</h2>
					<div className="row">
						<div>
							<span className="image main">
								<img src={kyle} alt="" />
							</span>
							<h3>Kyle Karpack</h3>
							<h4>Front End Engineer</h4>
							<p>
								Kyle is a front end engineer with over {new Date().getFullYear() - new Date(2012, 1, 1).getFullYear()} years experience building professional web applications.
								He specializes in front-end development using JavaScript and CSS on React or Angular,
								but also builds services in NodeJS, .NET, and more.
							</p>
						</div>
						<div>
							<span className="image main">
								<img src={kristin} alt="" />
							</span>
							<h3>Kristin Karpack</h3>
							<h4>Mobile Engineer</h4>
							<p>
								Kristin is a mobile developer with {new Date().getFullYear() - new Date(2013, 2, 1).getFullYear()} years of experience.
								She develops the iOS application for Zillow, a Seattle-based company that helps consumers find houses.
							</p>
						</div>
					</div>
					{close}
				</article>

				<article
					id="contact"
					className={`${this.props.article === 'contact' ? 'active' : ''} ${
						this.props.articleTimeout ? 'timeout' : ''
						}`}
					style={{ display: 'none' }}
				>
					<h2 className="major">Contact</h2>
					<form name="contact" method="POST" data-netlify data-netlify-honeypot="bot-field" 
						onSubmit={this.handleSubmit} hidden={this.state.submitted}>
						<div className="field half first">
							<label htmlFor="name">Name</label>
							<input type="text" name="name" id="name" onChange={this.handleChange} />
						</div>
						<div className="field half">
							<label htmlFor="email">Email</label>
							<input type="text" name="email" id="email" required onChange={this.handleChange} />
						</div>
						<div className="field">
							<label htmlFor="message">Message</label>
							<textarea name="message" id="message" rows="4" required onChange={this.handleChange}></textarea>
						</div>
						<ul className="actions">
							<li>
								<input type="submit" value="Send Message" className="special" />
							</li>
							<li>
								<input type="reset" value="Reset" />
							</li>
						</ul>
					</form>

					<p hidden={!this.state.submitted}>
						Thank you for your submission. We will get back to you shortly.
					</p>

					<h3>Contact Kyle</h3>
					<ul className="icons">
						<li>
							<a href="https://www.linkedin.com/in/kylekarpack/" className="icon fa-linkedin">
								<span className="label">Kyle on LinkedIn</span>
							</a>
						</li>
						<li>
							<a
								href="https://github.com/kylekarpack"
								className="icon fa-github"
							>
								<span className="label">GitHub</span>
							</a>
						</li>
					</ul>

					<h3>Contact Kristin</h3>
					<ul className="icons">
						<li>
							<a href="https://www.linkedin.com/in/kristinkarpack/" className="icon fa-linkedin">
								<span className="label">Kristin on LinkedIn</span>
							</a>
						</li>
					</ul>
					{close}
				</article>
			</div>
		)
	}
}

Main.propTypes = {
	route: PropTypes.object,
	article: PropTypes.string,
	articleTimeout: PropTypes.bool,
	onCloseArticle: PropTypes.func,
	timeout: PropTypes.bool,
	setWrapperRef: PropTypes.func.isRequired,
}

export default Main
