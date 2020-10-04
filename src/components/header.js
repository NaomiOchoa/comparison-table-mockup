import React from "react";

export default function Header() {
  return (
    <header>
      <h1>Wirecutter Mockup</h1>
      <h2>
        A visualization of Wirecutter's{" "}
        <a
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.thewirecutter.com/wp-content/uploads/2020/05/Snow-Boots_-Comparison-Table-Traction-Test-Comparison-Table_-Snow-Boots.pdf"
        >
          comparison table
        </a>{" "}
        for:{" "}
        <a
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.nytimes.com/wirecutter/reviews/best-winter-boots-for-men-and-women/"
        >
          The Best Winter Boots
        </a>
      </h2>
    </header>
  );
}
