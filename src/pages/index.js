import Acomplishments from '../components/Acomplishments/Acomplishments';
import BgAnimation from '../components/BackgrooundAnimation/BackgroundAnimation';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Technologies from '../components/Technologies/Technologies';
import Timeline from '../components/TimeLine/TimeLine';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

import React, { useEffect, useRef } from 'react';

const Home = () => {
  // Define a ref variable to store the livechat script
  const livechatScript = useRef(null);

  // Use an effect hook to load and unload the livechat script on mount and unmount
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');

    // Set the source and attributes of the script
    script.src =
      'https://canepros.rocket.chat/livechat/rocketchat-livechat.min.js?_=201903270000';
    script.async = true;
    script.id = 'livechat-script';

    // Append the script to the document head
    document.head.appendChild(script);

    // Set the livechat script ref variable to the script element
    livechatScript.current = script;

    // Return a cleanup function to unload the livechat script on unmount
    return () => {
      // Remove the script element from the document head
      document.head.removeChild(livechatScript.current);

      // Set the livechat script ref variable to null
      livechatScript.current = null;
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

