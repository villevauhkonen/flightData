import * as React from 'react'
import './Buttons.css'

interface IHeaderButtonProps {
  title: string
  onClick?: (e: Event) => void
}

const HeaderButton: React.FunctionComponent<IHeaderButtonProps> = (props) => {
  return (
    <div className="headerButton">
      {props.title}
    </div>
  )
};

export default HeaderButton;