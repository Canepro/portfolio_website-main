import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { TimeLineData, projects } from '../../constants/constants';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

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

const height = 480;

const Timeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedHeight, setExpandedHeight] = useState<number>(160);
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const items = TimeLineData.map((t) => ({ year: t.year, text: t.text }));

  useEffect(() => {
    if (!carouselRef.current || !headerRef.current) return;
    const total = carouselRef.current.getBoundingClientRect().height;
    const head = headerRef.current.getBoundingClientRect().height;
    const available = total - head - 110;
    setExpandedHeight(Math.max(available, 80));
  }, []);

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

      <div className="timeline-wrapper" style={{ position: 'relative', marginTop: 24 }}>
        <button onClick={prev} aria-label="Previous" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 20, border: 'none', background: 'var(--color-card-bg)', padding: 8, borderRadius: 999, boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
          <ChevronLeft width={20} height={20} />
        </button>
        <button onClick={next} aria-label="Next" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 20, border: 'none', background: 'var(--color-card-bg)', padding: 8, borderRadius: 999, boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
          <ChevronRight width={20} height={20} />
        </button>

        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, background: 'color-mix(in srgb, var(--color-accent) 25%, transparent)' }} />

        <div ref={carouselRef} style={{ position: 'relative', overflow: 'hidden', height }}>
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-card"
                variants={cardVariants}
                initial="inactive"
                animate={index === currentIndex ? 'active' : 'inactive'}
                style={{ position: 'absolute', width: 260, marginInline: 16, x: `${Math.round((index - currentIndex) * 300)}px`, willChange: 'transform', transform: 'translateZ(0)' }}
                drag="x"
                dragConstraints={{ left: -50, right: 50 }}
                dragElastic={0.12}
                onDragEnd={(e, info) => handleDragEnd(e, info, index)}
              >
                <motion.div
                  variants={cardVariants}
                  initial="inactive"
                  animate={index === currentIndex ? 'active' : 'inactive'}
                  style={{ position: 'absolute', left: '50%', top: -12, width: 16, height: 16, borderRadius: 999, transform: 'translateX(-50%)', zIndex: 10, background: index === currentIndex ? 'var(--color-accent)' : 'transparent', border: index === currentIndex ? 'none' : '2px solid var(--color-accent)' }}
                />

                <motion.div layout style={{ width: '100%' }} transition={{ duration: 0.25 }}>
                  <Card style={{ overflow: 'hidden', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', boxShadow: 'var(--shadow-md)' }}>
                    <div ref={index === 0 ? headerRef : null} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: index === currentIndex ? 'pointer' as const : 'default' }} onClick={() => toggleExpand(index)}>
                      <Badge style={{ fontSize: 12, padding: '4px 10px', background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)', marginBottom: 8 }}>
                        <Calendar width={14} height={14} style={{ marginRight: 6 }} />
                        {item.year}
                      </Badge>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>{item.year} Milestones</h3>
                      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>{item.text}</p>
                      <motion.div animate={{ rotate: expandedIndex === index ? 180 : 0, opacity: index === currentIndex ? 1 : 0.5 }} transition={{ duration: 0.25 }}>
                        <ChevronDown width={18} height={18} style={{ color: 'var(--color-text-secondary)', marginTop: 8 }} />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {expandedIndex === index && index === currentIndex && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: expandedHeight, opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflowY: 'auto' }}>
                          <div style={{ padding: '8px 20px 20px', borderTop: '1px solid color-mix(in srgb, var(--color-border) 60%, transparent)' }}>
                            <h4 style={{ fontSize: 13, fontWeight: 600, margin: '6px 0 10px', color: 'var(--color-text-primary)', textAlign: 'center' }}>Highlights</h4>
                            <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
                              {(yearHighlights[item.year] || []).map((h, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: i * 0.05 }} style={{ display: 'flex', alignItems: 'flex-start' }}>
                                  <CheckCircle width={16} height={16} style={{ marginRight: 8, color: h.done ? '#10B981' : 'var(--color-text-secondary)' }} />
                                  <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{h.title}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, gap: 8 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => { setCurrentIndex(i); setExpandedIndex(null); }} aria-label={`Go to slide ${i + 1}`} style={{ width: 10, height: 10, borderRadius: 999, background: i === currentIndex ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-accent) 30%, transparent)', border: 'none', cursor: 'pointer' }} />
          ))}
        </div>
      </div>

      <SectionDivider />
    </Section>
  );
};

export default Timeline;
