import React from 'react';

function Ownership(props) {
  return (
    <section class="bg-[#F6F1EB] rounded-4xl py-16 mt-18 px-6">
      <div class="max-w-7xl mx-auto px-6">


        <div class="text-center mb-20">
          <p class="text-xs tracking-[0.25em] uppercase text-[#8A6A55]">
            Ownership, Redefined
          </p>
          <h2 class="mt-4 text-4xl font-light tracking-wide text-[#3B2F2F]">
            How Ownership Works
          </h2>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div class="border border-[#E2D6CC] rounded-2xl p-10 bg-[#FAF7F3]">
            <span class="text-lg tracking-widest text-[#8A6A55]">01</span>
            <h3 class="mt-6 text-2xl font-light text-[#3B2F2F]">
              Select
            </h3>
            <p class="mt-4 text-sm leading-relaxed text-[#5C4A42]">
              Choose a limited ZKMotus piece, uniquely serialized and crafted in
              fixed supply.
            </p>
          </div>

          <div class="border border-[#E2D6CC] rounded-2xl p-10 bg-[#FAF7F3]">
            <span class="text-lg tracking-widest text-[#8A6A55]">02</span>
            <h3 class="mt-6 text-2xl font-light text-[#3B2F2F]">
              Verify
            </h3>
            <p class="mt-4 text-sm leading-relaxed text-[#5C4A42]">
              Authenticity and ownership are proven cryptographically, without
              revealing personal identity.
            </p>
          </div>

          <div class="border border-[#E2D6CC] rounded-2xl p-10 bg-[#FAF7F3]">
            <span class="text-lg tracking-widest text-[#8A6A55]">03</span>
            <h3 class="mt-6 text-2xl font-light text-[#3B2F2F]">
              Own
            </h3>
            <p class="mt-4 text-sm leading-relaxed text-[#5C4A42]">
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