import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

function Purpose(props) {

  const content = [

    {

      title: "Why Private Proof Matters",
      subtitle: "Prove ownership and authenticity without exposing yourself.",
      desc: [
        "Demonstrate eligibility for limited luxury purchases, without exposing spending history.",
        "Insurance and claims without oversharing.",
        "High-value resale without broadcasting wealth and private information."
      ],
      footer: [
        "Authenticity enforced",
        "Zero-knowledge proof",
        "Privacy preserved"
      ]

    },
    {
      title: "Purpose",
      subtitle: "Prove authenticity without tracking owners.",
      desc: [
        "Verify luxury goods for resale, insurance, or loans without exposing buyer identity.",
        "Reject counterfeits without creating customer databases or ownership trails."
      ],
      footer: [
        "Counterfeit resistance",
        "Zero-knowledge verification",
        "No ownership surveillance"
      ]
    },

    {
      title: "The Constraint",
      subtitle: "Authenticity must be verifiable without trusting a middleman.",
      desc: [
        "Brands and marketplaces cannot be the sole source of truth—they get breached, forged, or pressured.",
        "Authenticity checks must survive resale, cross-border trade, and platform shutdowns.",
        "Zero-knowledge lets anyone verify a product is real without revealing who owns it or how it was used."
      ],
      footer: [
        "No single point of failure",
        "Verifiable across platforms",
        "Privacy by design"
      ]
    }
  ];

  const [index, setIndex] = useState(0);
  const total = content.length;
  const selectedContent = content[index];

  const prev = () => setIndex((index - 1 + total) % total);
  const next = () => setIndex((index + 1) % total);

  return (

    <section className="flex items-center">
      <div className='max-w-7/12 py-12 translate-x-10'>
        <img src='/images/features/feature2.jpeg' className="w-full h-full rounded-3xl block" />
      </div>
      <div className="mx-auto max-w-5/12 p-12 rounded-3xl -translate-x-10 bg-parchment">

        <div className='mb-6 flex items-center justify-between duration-300 '>
          <p className=" text-sm uppercase tracking-widest text-ink/40">
            {selectedContent.title}
          </p>
          {/* Navigation */}
          <div className='flex items-center w-fit gap-x-6'>

            <div className=" flex items-center">
              <button
                onClick={prev}
                className="p-2 text-ink/40 hover:text-primaryAccent transition hover:cursor-pointer bg-white/55 rounded-full"
                aria-label="Previous section"
              >
                <FaArrowLeft size={15} />
              </button>
            </div>

            <div className=" flex items-center">
              <button
                onClick={next}
                className="p-2 text-ink/40 hover:text-primaryAccent transition hover:cursor-pointer bg-white/55 rounded-full"
                aria-label="Next section"
              >
                <FaArrowRight size={15} />

              </button>
            </div>
          </div>

        </div>


        <h2 className="max-w-3xl font-serif text-lg leading-snug md:text-3xl">
          {selectedContent.subtitle}
        </h2>

        {selectedContent.desc.map((text, i) => (
          <p
            key={i}
            className={`max-w-2xl text-md text-ink/70 ${i === 0 ? "mt-8" : "mt-4"
              }`}
          >
            {text}
          </p>
        ))}

        <div className="mt-14 flex items-center gap-4 text-sm text-ink/50">
          {selectedContent.footer.map((item, i) => (
            <span key={item} className="flex items-center gap-4">
              {i > 0 && <span className="h-px w-6 bg-burgundy/40" />}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>





  );
}

export default Purpose;