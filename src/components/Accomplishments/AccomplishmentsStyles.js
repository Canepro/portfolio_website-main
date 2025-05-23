import styled from "styled-components"

export const Boxes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 24px 0 40px;

  @media ${props => props.theme.breakpoints.md}{
    gap: 16px;
    margin: 20px 0 32px;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  @media ${props => props.theme.breakpoints.sm}{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    max-width: 500px;
    margin: 24px auto;
  }
`

export const Box = styled.div`
  background: #212D45;
  border-radius: 12px;
  height: 144px;
  padding: 24px;
  @media ${props => props.theme.breakpoints.lg} {
    height: 210px;

  }

  @media ${props => props.theme.breakpoints.md} {
    height: 135px;
    padding: 16px;
  }

  @media ${props => props.theme.breakpoints.sm} {
    height: 110px;
    padding: 12px;
    
    &:nth-child(2n){
      grid-row:2;
    }
  }
`
export const BoxNum = styled.h5`
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #F7F7F7;
  margin: 0 0 8px;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 28px;
    line-height: 34px;
  }

  @media ${props => props.theme.breakpoints.sm} {
    font-size: 24px;
    line-height: 30px;
  }
`

export const BoxText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #A7B2C4;
  margin: 0;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 14px;
    line-height: 22px;
  }

  @media ${props => props.theme.breakpoints.sm} {
    font-size: 12px;
    line-height: 20px;
  }
`
