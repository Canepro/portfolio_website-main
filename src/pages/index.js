import Acomplishments from '../components/Acomplishments/Acomplishments';
import BgAnimation from '../components/BackgrooundAnimation/BackgroundAnimation';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Technologies from '../components/Technologies/Technologies';
import Timeline from '../components/TimeLine/TimeLine';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://canepros.rocket.chat/livechat/rocketchat-livechat.min.js?_=201903270000';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
  <Layout>
    <Section grid>
      <Hero />
      <BgAnimation />
    </Section>
    <Projects />
    <Technologies />
    <Timeline />
    <Acomplishments />
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w, d, s, u) {
            w.RocketChat = function(c) { w.RocketChat._.push(c) };
            w.RocketChat._ = [];
            w.RocketChat.url = u;
            var h = d.getElementsByTagName(s)[0],
              j = d.createElement(s);
            j.async = true;
            j.src = 'https://canepros.rocket.chat/livechat/rocketchat-livechat.min.js?_=201903270000';
            h.parentNode.insertBefore(j, h);
          })(window, document, 'script', 'https://canepros.rocket.chat/livechat');
        `,
      }}
    />
  </Layout>
);
};
export default Home;
