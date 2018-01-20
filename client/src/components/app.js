import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Container, Dimmer, Icon, Image, Transition, Button } from 'semantic-ui-react'
import { fetchAPOD } from '../actions/index'
import tz from 'timezone';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dimmerVisible: false,
      mediaLoaded: false,
      apodData: {}
    }
  }

  componentDidMount() {
    const today = tz(new Date(), '%Y-%m-%d');
    this.props.fetchAPOD(today);
    this.setState({
      dimmerVisible: true,
      loaderAnimation: 'tada',
    })
  }

  componentWillReceiveProps(nextProps) {
    const { apodData } = nextProps;
    this.setState({
      loading: false,
      apodData,
    })
  }

  reloadAnimation = () => {
    setTimeout(() => this.setState({
      dimmerVisible: !this.state.dimmerVisible,
      loaderAnimation: 'pulse',
    }), 1000)
  }

  mediaLoadSucess = () => {
    this.setState({
      mediaLoaded: true,
    })
  }

  prevAPOD = () => {
    const { apodData : { date: presentDate } } = this.state;
    const prevDay = tz(Date.parse(presentDate), '-1 day', '%Y-%m-%d')
    this.props.fetchAPOD(prevDay);
    this.setState({
      loading: true,
      dimmerVisible: true,
      loaderAnimation: 'tada',
      mediaLoaded: false,
    }, this.reloadAnimation)
  }

  nextAPOD = () => {
    const { apodData : { date: presentDate } } = this.state;
    const nextDay = tz(Date.parse(presentDate), '+1 day', '%Y-%m-%d')
    this.props.fetchAPOD(nextDay);
    this.setState({
      loading: true,
      dimmerVisible: true,
      loaderAnimation: 'tada',
      mediaLoaded: false,
    })
  }

  render() {
    return (
      <div>
        {this.renderDimmer()}
        {this.renderContent()}
      </div>
    )
  }

  renderVideo() {
    const { apodData: { url } } = this.state
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="ui video" src={url} frameBorder="0" onLoad={this.mediaLoadSucess} allow="autoplay; encrypted-media" allowFullScreen></iframe>
      </div>
    )
  }

  renderImage() {
    const { apodData: { hdurl='' } } = this.state;
    return (
      <Image src={hdurl} onLoad={this.mediaLoadSucess} />
    )
  }

  renderContent() {
    const { loading, apodData: { explanation, title, media_type: mediaType } } = this.state;
    if (!loading) {
      return (
        <Container>
          <Header as='h1'>
          Space Exploration
            <Header.Subheader>{title}</Header.Subheader>
          </Header>
          <p>{explanation}</p>
          {(mediaType === 'video') ? this.renderVideo() : this.renderImage()}
          {this.renderNavigationButtons()}
        </Container>)
    }
  }

  renderNavigationButtons() {
    const { mediaLoaded } = this.state;
    if(mediaLoaded) {
      return (
        <div>
          <Button onClick={this.prevAPOD} content='prev' />
          <Button onClick={this.nextAPOD} content='next' />
        </div>
      )
    }
  }

  renderDimmer() {
    const { loading, mediaLoaded, dimmerVisible, loaderAnimation } = this.state;
    if (loading || !mediaLoaded) {
      return (
        <Dimmer
          active={true}
          page>
          <Header inverted>
            <Transition animation={loaderAnimation} visible={dimmerVisible} mountOnShow={true} onComplete={this.reloadAnimation} >
              <h1>Loading...</h1>
            </Transition>
          </Header>
        </Dimmer>)
    }
  }
}

const mapStateToProps = ({ APODData={} }) => {
  return {
    apodData: APODData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchAPOD: fetchAPOD
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);