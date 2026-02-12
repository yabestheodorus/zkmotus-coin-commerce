import React from 'react';
import { NavLink } from 'react-router-dom';

function SplitHero(props) {
  return (
    <section className=" bg-parchment text-ink">
      <div className="mx-auto grid  max-w-7xl grid-cols-1 md:grid-cols-2">

        {/* Left — Verification */}
        <NavLink
          to="/verification"
          className="group flex py-12 justify-center border-b md:border-b-0 md:border-r border-burgundy/20 transition-colors hover:bg-black/5"
        >
          <div className="flex flex-col max-w-sm px-8 text-center">
            <p className="mb-4 text-sm tracking-[0.25em] uppercase text-burgundy">
              Verification
            </p>
            <h1 className="font-serif grow text-3xl leading-snug md:text-4xl">
              Private truth,
              <br />
              mathematically proven
            </h1>
            <p className="mt-6 text-ink/60">
              Understand how authenticity and ownership are verified without
              revealing identity.
            </p>

            <div className="mt-12 h-px w-24 mx-auto bg-burgundy/40 transition-all group-hover:w-32" />
          </div>
        </NavLink>

        {/* Right — Collection */}
        <NavLink
          to="/collection"
          className="group flex py-12 justify-center transition-colors hover:bg-black/5"
        >
          <div className="flex flex-col max-w-sm px-8 text-center">
            <p className="mb-4 text-sm tracking-[0.25em] uppercase text-burgundy">
              Collection
            </p>
            <h1 className="font-serif grow text-3xl  leading-snug md:text-4xl">
              Objects defined
              <br />
              by certainty
            </h1>
            <p className="mt-6 text-ink/60">
              Explore pieces whose authenticity and ownership can be
              independently verified.
            </p>

            <div className="mt-12 h-px w-24 mx-auto bg-burgundy/40 transition-all group-hover:w-32" />
          </div>
        </NavLink>

      </div>
    </section>
  );
}

export default SplitHero;