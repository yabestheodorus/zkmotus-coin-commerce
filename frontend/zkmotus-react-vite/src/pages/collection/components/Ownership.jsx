import React from "react";

function Ownership(props) {
  return (
    <section className="mt-18 rounded-4xl bg-[#F6F1EB] px-6 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <p className="text-xs tracking-[0.25em] text-[#8A6A55] uppercase">
            Ownership, Redefined
          </p>
          <h2 className="mt-4 text-4xl font-light tracking-wide text-[#3B2F2F]">
            How Ownership Works
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E2D6CC] bg-[#FAF7F3] p-10">
            <span className="text-lg tracking-widest text-[#8A6A55]">01</span>
            <h3 className="mt-6 text-2xl font-light text-[#3B2F2F]">Select</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#5C4A42]">
              Choose a limited ZKMotus piece, uniquely serialized and crafted in
              fixed supply.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E2D6CC] bg-[#FAF7F3] p-10">
            <span className="text-lg tracking-widest text-[#8A6A55]">02</span>
            <h3 className="mt-6 text-2xl font-light text-[#3B2F2F]">Verify</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#5C4A42]">
              Authenticity and ownership are proven cryptographically, without
              revealing personal identity.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E2D6CC] bg-[#FAF7F3] p-10">
            <span className="text-lg tracking-widest text-[#8A6A55]">03</span>
            <h3 className="mt-6 text-2xl font-light text-[#3B2F2F]">Own</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#5C4A42]">
              Hold private, permanent proof of ownership that can unlock future
              access or be transferred.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ownership;
