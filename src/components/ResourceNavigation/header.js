import './header.css'

export default function Header ({ children }) {
  return <div className='resource-navigation-header flex-none'>
    {children}
  </div>
}

Header.propTypes = {
  children: React.PropTypes.node.isRequired
}
