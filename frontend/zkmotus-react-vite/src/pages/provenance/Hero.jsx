import React from 'react';
import { NavLink } from 'react-router-dom';

function Hero(props) {
  return (
    <section className="relative bg-parchment text-ink rounded-3xl overflow-hidden">
      {/* subtle texture / gradient */}
      <div className="absolute z-10 inset-0 bg-gradient-to-b from-transparent to-primaryAccent/15 pointer-events-none" />


      <div className="grid grid-cols-1 md:grid-cols-10 pl-6 z-20">

        {/* Text */}
        <div className="md:col-span-7 z-20 text-ink pl-12 pt-24 pb-24 ">
          {/* Eyebrow */}
          <p className="mb-6 text-sm tracking-[0.25em] uppercase text-burgundy">
            Private Verification System
          </p>

          {/* Core statement */}
          <h1 className="font-serif text-4xl leading-tight md:text-6xl md:leading-tight">
            Authenticity can be proven.
            <br />
            <span className="text-burgundy">
              Ownership can remain private.
            </span>
          </h1>

          <p className="my-10 max-w-xl text-lg text-ink/70">
            ZKMotus verifies the authenticity of your items without revealing your identity.
            No accounts. No exposure. Only certainty.
            Collect your luxury items privately and securely today.
          </p>

          <NavLink
            className=" px-8 py-3 rounded-full bg-burgundy
           text-parchment font-medium text-sm hover:brightness-110 
           transition shadow-md cursor-pointer"
            to={"/collection"}>
            Browse Collection
          </NavLink>

          {/* Verification glyph */}
          <div className="mt-24 flex items-center gap-6">
            <div className="h-px w-24 bg-burgundy/40" />
            <span className="text-sm tracking-wide text-ink/50">
              Verified without disclosure
            </span>
          </div>
        </div>

        {/* Illustration */}
        <div className="md:col-span-3 relative mt-20 z-20 md:mt-0">
          <img
            src="/images/banners/banner3.png"
            alt=""
            className="w-full absolute right-0 bottom-0 object-contain opacity-70"
          />
        </div>

        <p className='absolute z-10 left-6 -bottom-56 text-[380px] 
        text-gray-400/10 font-extrabold tracking-tighter select-none'>
          PROVABLE ORIGIN
        </p>

      </div>


    </section>
  );
}

export default Hero;