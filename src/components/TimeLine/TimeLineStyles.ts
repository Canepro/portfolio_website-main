import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { CheckCircle } from 'lucide-react';
import { CarouselMobileScrollNodeProps, CarouselItemProps, CarouselButtonProps, CarouselButtonDotProps } from '../../types/styled-components';

export const TimelineWrapper = styled.div`
  position: relative;
  margin-top: 32px;
`;

export const TimelineNavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  border: none;
  background: var(--color-card-bg);
  padding: 8px;
  border-radius: 999px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--color-card-hover);
    box-shadow: var(--shadow-md);
  }
  
  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.prev {
    left: 0;
  }
  
  &.next {
    right: 0;
  }
`;

export const TimelineContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 560px;
`;

export const TimelineCardsWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const TimelineCard = styled(motion.div)`
  position: absolute;
  width: 320px;
  margin-inline: 16px;
  will-change: transform;
  transform: translateZ(0);
`;

export const TimelineDot = styled(motion.div)<{ $isActive: boolean }>`
  position: absolute;
  left: 50%;
  top: -14px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  transform: translateX(-50%);
  z-index: 10;
  background: ${props => props.$isActive ? 'var(--color-accent)' : 'transparent'};
  border: ${props => props.$isActive ? 'none' : '2px solid var(--color-accent)'};
`;

export const TimelineCardContent = styled(motion.div)`
  width: 100%;
`;

export const TimelineCardHeader = styled.div<{ $isClickable: boolean }>`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: ${props => props.$isClickable ? 'pointer' : 'default'};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$isClickable ? 'var(--color-card-hover)' : 'transparent'};
  }
`;

export const TimelineBadge = styled(Badge)`
  font-size: 12px;
  padding: 4px 10px;
  background: color-mix(in srgb, var(--color-accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, transparent);
  margin-bottom: 8px;
`;

export const TimelineCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
`;

export const TimelineCardText = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 4px;
`;

export const TimelineChevron = styled(motion.div)`
  color: var(--color-text-secondary);
  margin-top: 10px;
`;

export const TimelineExpandedContent = styled(motion.div)`
  overflow-y: auto;
`;

export const TimelineExpandedInner = styled.div`
  padding: 8px 20px 20px;
  border-top: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
`;

export const TimelineHighlightsTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  margin: 6px 0 10px;
  color: var(--color-text-primary);
  text-align: center;
`;

export const TimelineHighlightList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TimelineHighlightItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
`;

export const TimelineHighlightIcon = styled(CheckCircle)<{ $isDone: boolean }>`
  margin-right: 8px;
  color: ${props => props.$isDone ? '#10B981' : 'var(--color-text-secondary)'};
`;

export const TimelineHighlightText = styled.span`
  font-size: 13px;
  color: var(--color-text-secondary);
`;

export const TimelinePagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

export const TimelinePaginationDot = styled.button<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: ${props => props.$isActive ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-accent) 30%, transparent)'};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$isActive ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-accent) 50%, transparent)'};
  }
  
  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

// Legacy components (keeping for backward compatibility)
export const CarouselContainer = styled.ul`
  max-width: 1040px;
  background: transparent;
  padding: 0rem;
  list-style:none;
  display: flex;
  justify-content: space-between; 
  gap: 16px;
  margin-left: 32px;
  &:first-of-type{
    margin-left: 0px;
  }
  margin-bottom: 80px;
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
`;

export const CarouselMobileScrollNode = styled.div<CarouselMobileScrollNodeProps>`
  @media ${props => props.theme.breakpoints.sm} {
    display: flex;
    min-width: ${({ final }) => final ? `120%;` : `min-content`}
  }
`;

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
`;

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
`;

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
`;

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
`;

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
`;

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
`;

export const CarouselButtonDot = styled.div<CarouselButtonDotProps>`
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  margin: auto;
  width: 3px;
  height: 3px;
`;
