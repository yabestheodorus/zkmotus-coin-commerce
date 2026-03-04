import React from "react";

function Footer(props) {
  return (
    <footer className="border-t border-[#E2D6CC]">
      <div className="px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-light tracking-wide text-[#3B2F2F]">
              ZKMotus
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#5C4A42]">
              Contemporary luxury, crafted in limited form and proven authentic
              through private ownership.
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-widest text-[#8A6A55] uppercase">
              Shop
            </h4>
            <ul className="mt-6 space-y-3 text-sm text-[#5C4A42]">
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Collectors’ Choice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Exclusive Designs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Limited Editions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest text-[#8A6A55] uppercase">
              Ownership
            </h4>
            <ul className="mt-6 space-y-3 text-sm text-[#5C4A42]">
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Authenticity
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Verify a Product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Transfer Ownership
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest text-[#8A6A55] uppercase">
              Company
            </h4>
            <ul className="mt-6 space-y-3 text-sm text-[#5C4A42]">
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  About ZKMotus
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Journal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B2F2F]">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-[#E2D6CC] pt-8 md:flex-row">
          <p className="text-xs tracking-wide text-[#8A6A55]">
            © 2026 ZKMotus. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs tracking-wide text-[#8A6A55]">
            <a href="#" className="hover:text-[#3B2F2F]">
              Instagram
            </a>
            <a href="#" className="hover:text-[#3B2F2F]">
              X
            </a>
            <a href="#" className="hover:text-[#3B2F2F]">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
