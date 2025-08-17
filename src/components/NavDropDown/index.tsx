// src/components/NavDropDown/index.tsx

import React from 'react'
import { AiFillLinkedin, AiOutlineMail } from 'react-icons/ai'
import { FaRocketchat } from "react-icons/fa"
import { DropDownContainer, DropDownIcon, DropDownItem, DropDownItemDesc, DropDownItemTitle, DropDownTextContainer } from './NavDropDown'

interface NavDropDownProps {
  isOpen?: boolean;
}

const NavDropDown: React.FC<NavDropDownProps> = (props) => (
  <DropDownContainer active={props.isOpen}>
    <DropDownItem href="mailto:mogah.vincent@hotmail.com" target="_blank" rel="noreferrer">
      <DropDownIcon><AiOutlineMail/></DropDownIcon>
      <DropDownTextContainer>
        <DropDownItemTitle>Email</DropDownItemTitle>
        <DropDownItemDesc>Send a message and I'll get back to you.</DropDownItemDesc>
      </DropDownTextContainer>
    </DropDownItem>
    <DropDownItem href="https://www.linkedin.com/in/vincent-mogah/" target="_blank" rel="noreferrer">
      <DropDownIcon><AiFillLinkedin/></DropDownIcon>
      <DropDownTextContainer>
        <DropDownItemTitle>LinkedIn</DropDownItemTitle>
        <DropDownItemDesc>Let's connect on a professional level.</DropDownItemDesc>
      </DropDownTextContainer>
    </DropDownItem>
    <DropDownItem href="#" target="_blank" rel="noreferrer">
      <DropDownIcon><FaRocketchat/></DropDownIcon>
      <DropDownTextContainer>
        <DropDownItemTitle>Rocket.Chat</DropDownItemTitle>
        <DropDownItemDesc>@vincent.mogah</DropDownItemDesc>
      </DropDownTextContainer>
    </DropDownItem>
  </DropDownContainer>
);

export default NavDropDown