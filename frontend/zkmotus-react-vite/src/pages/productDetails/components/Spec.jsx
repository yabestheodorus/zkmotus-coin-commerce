import React from 'react';

function Spec({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-ink/40">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default Spec;