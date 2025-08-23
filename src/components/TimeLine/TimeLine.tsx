import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { TimeLineData, projects } from '../../constants/constants';
import { Card } from '../ui/card';
import {
  TimelineWrapper,
  TimelineNavigationButton,
  TimelineContainer,
  TimelineCardsWrapper,
  TimelineCard,
  TimelineDot,
  TimelineCardContent,
  TimelineCardHeader,
  TimelineBadge,
  TimelineCardTitle,
  TimelineCardText,
  TimelineChevron,
  TimelineExpandedContent,
  TimelineExpandedInner,
  TimelineHighlightsTitle,
  TimelineHighlightList,
  TimelineHighlightItem,
  TimelineHighlightIcon,
  TimelineHighlightText,
  TimelinePagination,
  TimelinePaginationDot,
} from './TimeLineStyles';

type Highlight = { title: string; done?: boolean };
type YearHighlights = Record<number, Highlight[]>;

// Draft highlights combining existing timeline notes with current projects
const yearHighlights: YearHighlights = {
  2025: [
    { title: 'Shipped portfolio timeline revamp (framer-motion, shadcn-inspired)', done: true },
    { title: 'Active in AI-driven DevOps & security' },
  ],
  2024: [
    { title: 'Dockerized Portfolio (multi-stage build, healthcheck)', done: true },
    { title: 'Rocket.Chat Observability Stack (Prometheus/Grafana)', done: true },
  ],
  2023: [
    { title: 'CI pipeline hardening on GitHub Actions', done: true },
  ],
  2022: [
    { title: 'Azure-focused IaC experiments (Terraform AZ Storage RG)', done: true },
  ],
};

const Timeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedHeight, setExpandedHeight] = useState<number>(160);
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const items = TimeLineData.map((t) => ({ year: t.year, text: t.text }));

  const getHighlights = (year: number, text: string): Highlight[] => {
    const fromMap = yearHighlights[year];
    if (fromMap && fromMap.length > 0) return fromMap;
    // Fallback: show the year text as a single highlight
    return text ? [{ title: text, done: true }] : [];
  };

  useEffect(() => {
    if (!carouselRef.current || !headerRef.current) return;
    const total = carouselRef.current.getBoundingClientRect().height;
    const head = headerRef.current.getBoundingClientRect().height;
    const available = total - head - 110;
    setExpandedHeight(Math.max(available, 80));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const currentItem = items[currentIndex];
        if (getHighlights(currentItem.year, currentItem.text).length > 0) {
          toggleExpand(currentIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, expandedIndex]);

  const toggleExpand = (index: number) => {
    if (index === currentIndex) setExpandedIndex(expandedIndex === index ? null : index);
  };

  const next = () => {
    setCurrentIndex((p) => (p === items.length - 1 ? 0 : p + 1));
    setExpandedIndex(null);
  };
  
  const prev = () => {
    setCurrentIndex((p) => (p === 0 ? items.length - 1 : p - 1));
    setExpandedIndex(null);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setExpandedIndex(null);
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, index: number) => {
    const THRESHOLD = 50;
    if (info.offset.x > THRESHOLD && index === currentIndex) prev();
    else if (info.offset.x < -THRESHOLD && index === currentIndex) next();
  };

  const cardVariants = {
    active: { x: 0, scale: 1, opacity: 1, zIndex: 10, transition: { duration: 0.25 } },
    inactive: { scale: 0.92, opacity: 0.75, zIndex: 0, transition: { duration: 0.25 } },
  } as const;

  return (
    <Section id="about">
      <SectionTitle>About Me</SectionTitle>
      <SectionText style={{ maxWidth: 720, textAlign: 'left', margin: 0 }}>
        I'm an infrastructure‑focused engineer who loves clean UI. I design and run scalable systems, automate cloud operations, and build front‑ends that are fast and accessible.
      </SectionText>

      <TimelineWrapper>
        <TimelineNavigationButton 
          onClick={prev} 
          aria-label="Previous timeline item"
          className="prev"
        >
          <ChevronLeft width={20} height={20} />
        </TimelineNavigationButton>
        
        <TimelineNavigationButton 
          onClick={next} 
          aria-label="Next timeline item"
          className="next"
        >
          <ChevronRight width={20} height={20} />
        </TimelineNavigationButton>

        <TimelineContainer ref={carouselRef}>
          <TimelineCardsWrapper>
            {items.map((item, index) => (
              <TimelineCard
                key={index}
                variants={cardVariants}
                initial="inactive"
                animate={index === currentIndex ? 'active' : 'inactive'}
                style={{ x: `${Math.round((index - currentIndex) * 340)}px` }}
                drag="x"
                dragConstraints={{ left: -50, right: 50 }}
                dragElastic={0.12}
                onDragEnd={(e, info) => handleDragEnd(e, info, index)}
                role="region"
                aria-label={`Timeline item ${index + 1} of ${items.length}`}
              >
                <TimelineDot
                  $isActive={index === currentIndex}
                  variants={cardVariants}
                  initial="inactive"
                  animate={index === currentIndex ? 'active' : 'inactive'}
                />

                <TimelineCardContent layout transition={{ duration: 0.25 }}>
                  <Card style={{ overflow: 'hidden', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', boxShadow: 'var(--shadow-md)' }}>
                    <TimelineCardHeader 
                      ref={index === 0 ? headerRef : null}
                      $isClickable={getHighlights(item.year, item.text).length > 0 && index === currentIndex}
                      onClick={() => getHighlights(item.year, item.text).length > 0 && toggleExpand(index)}
                      role={getHighlights(item.year, item.text).length > 0 ? 'button' : undefined}
                      tabIndex={getHighlights(item.year, item.text).length > 0 && index === currentIndex ? 0 : -1}
                      aria-expanded={expandedIndex === index}
                      aria-controls={getHighlights(item.year, item.text).length > 0 ? `timeline-highlights-${index}` : undefined}
                    >
                      <TimelineBadge>
                        <Calendar width={14} height={14} style={{ marginRight: 6 }} />
                        {item.year}
                      </TimelineBadge>
                      <TimelineCardTitle>{item.year} Milestones</TimelineCardTitle>
                      <TimelineCardText>{item.text}</TimelineCardText>
                      {getHighlights(item.year, item.text).length > 0 && (
                        <TimelineChevron 
                          animate={{ 
                            rotate: expandedIndex === index ? 180 : 0, 
                            opacity: index === currentIndex ? 1 : 0.5 
                          }} 
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown width={18} height={18} />
                        </TimelineChevron>
                      )}
                    </TimelineCardHeader>

                    <AnimatePresence>
                      {expandedIndex === index && index === currentIndex && getHighlights(item.year, item.text).length > 0 && (
                        <TimelineExpandedContent
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: expandedHeight, opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          id={`timeline-highlights-${index}`}
                        >
                          <TimelineExpandedInner>
                            <TimelineHighlightsTitle>Highlights</TimelineHighlightsTitle>
                            <TimelineHighlightList>
                              {getHighlights(item.year, item.text).map((h, i) => (
                                <TimelineHighlightItem 
                                  key={i} 
                                  initial={{ opacity: 0, x: -12 }} 
                                  animate={{ opacity: 1, x: 0 }} 
                                  transition={{ duration: 0.2, delay: i * 0.05 }}
                                >
                                  <TimelineHighlightIcon width={16} height={16} $isDone={h.done || false} />
                                  <TimelineHighlightText>{h.title}</TimelineHighlightText>
                                </TimelineHighlightItem>
                              ))}
                            </TimelineHighlightList>
                          </TimelineExpandedInner>
                        </TimelineExpandedContent>
                      )}
                    </AnimatePresence>
                  </Card>
                </TimelineCardContent>
              </TimelineCard>
            ))}
          </TimelineCardsWrapper>
        </TimelineContainer>

        <TimelinePagination role="tablist" aria-label="Timeline navigation">
          {items.map((_, i) => (
            <TimelinePaginationDot
              key={i}
              $isActive={i === currentIndex}
              onClick={() => goToSlide(i)}
              aria-label={`Go to timeline item ${i + 1}`}
              role="tab"
              aria-selected={i === currentIndex}
            />
          ))}
        </TimelinePagination>
      </TimelineWrapper>

      <SectionDivider />
    </Section>
  );
};

export default Timeline;
