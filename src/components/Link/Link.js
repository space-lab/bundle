import { Date } from 'components'
import './Link.css'

class Thumbnail extends React.Component {
  static propTypes = {
    image: React.PropTypes.string.isRequired
  }

  render () {
    let styles = { backgroundImage: `url(${this.props.image})` }

    return <div style={styles} className='link-thumbnail' />
  }
}

export default class Link extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired
  }

  urlDomain (str) {
    let url = document.createElement('a')
    url.href = str

    return url.hostname
  }

  render () {
    let { url, image, title, description, createdAt } = this.props

    return (
      <a href={url} target='_blank'>
        <div className='link-component'>
          <Thumbnail image={image} />

          <div className='link-content'>
            <span className='link-title'>{title}</span>
            <span className='link-description'>{description}</span>
            <span className='link-metadata'>
              <span>On {this.urlDomain(url)}</span>
              <span> ⋅ </span>
              <span>Added <Date type='fromNow'>{createdAt}</Date></span>
            </span>
          </div>
        </div>
      </a>
    )
  }
}
