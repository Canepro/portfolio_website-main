import styled from 'styled-components'
import { CarouselMobileScrollNodeProps, CarouselItemProps, CarouselButtonProps, CarouselButtonDotProps } from '../../types/styled-components';

export const CarouselContainer = styled.ul`
  max-width: 1040px;
  background: transparent;
  padding: 0rem;
  list-style:none;
  display: flex;
  justify-content: space-between; 
  /* overflow-x: hidden; */
  gap: 16px;

  margin-left: 32px;
  &:first-of-type{
    margin-left: 0px;
  }

  margin-bottom: 80px;

  //remove scrollbar
  scrollbar-width: none;  
   &::-webkit-scrollbar {
     display: none;
   }

  @media ${props => props.theme.breakpoints.sm} {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    touch-action: pan-x;
    justify-content: initial;
    margin-bottom: 8px;
  }
`
export const CarouselMobileScrollNode = styled.div<CarouselMobileScrollNodeProps>`
  @media ${props => props.theme.breakpoints.sm} {
    display: flex;
    min-width: ${({ final }) => final ? `120%;` : `min-content`}
  }
`

export const CarouselItem = styled.div<CarouselItemProps>`
background: ${({ theme }) => theme.colors.card};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: 12px;
max-width: 220px;
padding: 16px;
transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
z-index: 0;

&:hover {
  background: ${({ theme }) => theme.colors.cardHover};
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  z-index: 1;
}

@media ${props => props.theme.breakpoints.lg} {
  margin-left: 16px;
  min-width: 160px;
  background: ${({ theme }) => theme.colors.card};
  padding: 12px;
  align-content: start;
  scroll-snap-align: start;
  border-radius: 12px;
  overflow: visible;
  position: relative;
  height: fit-content;
  }

  @media ${props => props.theme.breakpoints.md} {
    max-width: 180px;
    margin-left: 24px;

    &:first-of-type{
      margin-left: 0;
    }
  }

  @media ${props => props.theme.breakpoints.sm} {
    margin-left: 16px;
    min-width: 160px;
    background: ${({ theme }) => theme.colors.card};
    padding: 12px;
    align-content: start;
    scroll-snap-align: start;
    border-radius: 12px;
    overflow: visible;
    position: relative;
    height: fit-content;

    ${(props) => props.active === props.index ? `opacity: 1; box-shadow: 0 0 0 2px var(--color-accent); border-color: var(--color-accent);` : `opacity: 0.75`};
  }
`
export const CarouselItemTitle = styled.h4`
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.02em;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;

@media ${props => props.theme.breakpoints.lg} {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
}

@media ${props => props.theme.breakpoints.md} {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
}

  
  @media ${props => props.theme.breakpoints.sm} {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 8px;
  }
`
export const CarouselItemImg = styled.svg`
  margin-left: 21px;
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%);
  width: 100%;

@media ${props => props.theme.breakpoints.md} {
  margin-left: 16px;
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 67%, rgba(0,0,0,0) 67%, rgba(0,0,0,0) 100%);
}
@media ${props => props.theme.breakpoints.sm} {
  -webkit-mask-image: none;
  margin-left: 16px;
  overflow: visible
  }
`

export const CarouselItemText = styled.p`
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-right: 16px;

@media ${props => props.theme.breakpoints.lg} {
  font-size: 12px;
  line-height: 18px;
  padding-right: 32px;
}
@media ${props => props.theme.breakpoints.md} {
  font-size: 12px;
  line-height: 18px;
  padding-right: 32px;
  }
  @media ${props => props.theme.breakpoints.sm} {
    font-size: 10px;
    line-height: 16px;
    padding-right: 0;
  }
`
export const CarouselButtons = styled.div`
  width: 288px;

  display: none;

@media ${props => props.theme.breakpoints.lg} {
  width: 208px;
}

@media ${props => props.theme.breakpoints.md} {
  visibility: hidden;
  width: 124px;
}

@media ${props => props.theme.breakpoints.sm} {
  margin-bottom: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  visibility: visible;
  width: 100%;
}
`

export const CarouselButton = styled.button<CarouselButtonProps>`
  box-sizing: border-box;
  background: none;
  padding: 4px;
  border: none;
  cursor: pointer;
  margin-right: 4px;
  opacity: ${(props) => props.active === props.index ? `1` : `.33`};
  transform: ${(props) => props.active === props.index ? `scale(1.6)` : `scale(1)`};

  &:focus {
    outline: none;
  }

  @media ${props => props.theme.breakpoints.sm} {
    &:nth-of-type(1) {
      margin-left: 0px;
    }
  }
`

export const CarouselButtonDot = styled.div<CarouselButtonDotProps>`
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  margin: auto;
  width: 3px;
  height: 3px;
`
