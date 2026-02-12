import React from 'react';
import HowVerificationOccurs from './HowVerificationOccurs';
import WhatIsVerified from './WhatIsVerified';
import Hero from './Hero';
import SplitHero from './SplitHero';
import Purpose from './Purpose';



function Provenance(props) {
  return (
    <section className=" mb-24 flex flex-col gap-8 font-libre">
      {/* <SplitHero /> */}
      <Hero />
      <Purpose />
      <WhatIsVerified />
      <HowVerificationOccurs />
    </section>
  );
}

export default Provenance;