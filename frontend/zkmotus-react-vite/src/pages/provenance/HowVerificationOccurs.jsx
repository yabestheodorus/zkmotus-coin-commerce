import React from 'react';

function HowVerificationOccurs(props) {
  return (
    <section className="bg-parchment text-ink">
      <div className="mx-auto max-w-5xl px-6 py-32">
        {/* Heading */}
        <h2 className="mb-20 font-serif text-3xl md:text-4xl">
          How verification occurs
        </h2>

        <div className="space-y-20">
          {/* Step 1 */}
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <p className="text-sm tracking-wide uppercase text-burgundy">
                Reference
              </p>
              <h3 className="mt-2 text-xl font-medium">
                Selection establishes reference
              </h3>
            </div>
            <p className="md:col-span-3 text-ink/70">
              A piece is referenced without exposing its serial number or
              internal identifiers. The system recognizes the object,
              not the person.
            </p>
          </div>

          <div className="h-px bg-burgundy/20" />

          {/* Step 2 */}
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <p className="text-sm tracking-wide uppercase text-burgundy">
                Resolution
              </p>
              <h3 className="mt-2 text-xl font-medium">
                Verification resolves truth
              </h3>
            </div>
            <p className="md:col-span-3 text-ink/70">
              Authenticity and ownership are mathematically confirmed
              without revealing origin, identity, or transaction history.
            </p>
          </div>

          <div className="h-px bg-burgundy/20" />

          {/* Step 3 */}
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <p className="text-sm tracking-wide uppercase text-burgundy">
                Confirmation
              </p>
              <h3 className="mt-2 text-xl font-medium">
                Ownership is confirmed
              </h3>
            </div>
            <p className="md:col-span-3 text-ink/70">
              The result is absolute and private. No record is retained.
              No profile is created. The proof exists only in the moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowVerificationOccurs;