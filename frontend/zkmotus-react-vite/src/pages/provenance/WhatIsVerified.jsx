import React from 'react';

function WhatIsVerified() {
  return (
    <section className="bg-white text-ink rounded-3xl">
      <div className=" px-6 py-12">
        {/* Section heading */}
        <div className="mb-16 max-w-2xl">
          <span className="mb-4 block text-sm tracking-widest text-burgundy/60">
            VERIFICATION SCOPE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl">
            What is verified
          </h2>
          <p className="mt-6 text-ink/60">
            Verification here is narrow by design.
            Each claim is precise, minimal, and provable.
          </p>
        </div>

        {/* Items */}
        <div className="space-y-14">
          {/* Authenticity */}
          <div className="group grid grid-cols-12 items-start gap-6">
            <div className="col-span-12 md:col-span-2 text-burgundy/40 font-serif text-4xl">
              01
            </div>
            <div className="col-span-12 md:col-span-10">
              <h3 className="text-xl font-medium text-burgundy transition-colors group-hover:text-burgundy/80">
                Authenticity
              </h3>
              <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
                Each piece can be cryptographically proven to originate from
                its declared edition and production run — without relying on
                trust, branding, or centralized records.
              </p>
              <div className="mt-8 h-px w-full bg-burgundy/20 transition-all group-hover:bg-burgundy/40" />
            </div>
          </div>

          {/* Ownership */}
          <div className="group grid grid-cols-12 items-start gap-6">
            <div className="col-span-12 md:col-span-2 text-burgundy/40 font-serif text-4xl">
              02
            </div>
            <div className="col-span-12 md:col-span-10">
              <h3 className="text-xl font-medium text-burgundy transition-colors group-hover:text-burgundy/80">
                Ownership
              </h3>
              <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
                Ownership can be confirmed without revealing identity,
                transaction history, or possession of any other item.
                The proof answers only the question asked.
              </p>
              <div className="mt-8 h-px w-full bg-burgundy/20 transition-all group-hover:bg-burgundy/40" />
            </div>
          </div>

          {/* Privacy */}
          <div className="group grid grid-cols-12 items-start gap-6">
            <div className="col-span-12 md:col-span-2 text-burgundy/40 font-serif text-4xl">
              03
            </div>
            <div className="col-span-12 md:col-span-10">
              <h3 className="text-xl font-medium text-burgundy transition-colors group-hover:text-burgundy/80">
                Privacy
              </h3>
              <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
                Verification discloses only what is necessary — nothing more.
                No identities, no behavioral data, no residual trace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatIsVerified;
