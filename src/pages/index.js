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
  // Define a state variable to store the livechat script
  const [livechatScript, setLivechatScript] = React.useState(null);

  // Define a function to load the livechat script
  const loadLivechatScript = () => {
    // Create a script element
    const script = document.createElement('script');

    // Set the source and attributes of the script
    script.src = 'https://canepros.rocket.chat/livechat/rocketchat-livechat.min.js?_=201903270000';
    script.async = true;
    script.id = 'livechat-script';

    // Append the script to the document body
    document.body.appendChild(script);

    // Set the livechat script state variable to the script element
    setLivechatScript(script);
  };

  // Define a function to unload the livechat script
  const unloadLivechatScript = () => {
    // Remove the script element from the document body
    document.body.removeChild(livechatScript);

    // Set the livechat script state variable to null
    setLivechatScript(null);
  };

  // Use an effect hook to load and unload the livechat script on mount and unmount
  useEffect(() => {
    // Load the livechat script on mount
    loadLivechatScript();

    // Return a cleanup function to unload the livechat script on unmount
    return () => {
      unloadLivechatScript();
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
