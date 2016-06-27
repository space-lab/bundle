import './Link.css'

export default class Link extends React.Component {
  static propTypes = {
    image: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  }

  render () {
    let { image, url } = this.props

    return (
      <div className='link-component'>
        <a href={url} target='_blank'>
          <Thumbnail image={image} />
        </a>
      </div>
    )
  }
}

class Thumbnail extends React.Component {
  static propTypes = {
    image: React.PropTypes.string.isRequired
  }

  render () {
    let styles = { backgroundImage: `url(${this.props.image})` }

    return <div style={styles} className='link-thumbnail' />
  }
}
