import React from "react";
import { Icon } from "semantic-ui-react";

export default function Footer() {
  return (
    <footer>
      <p>
        This project was inspired by a{" "}
        <a
          className="footer-link"
          href="https://www.nytimes.com/wirecutter/blog/comparison-tables/"
        >
          Wirecutter blog post
        </a>{" "}
        on the spreadsheets they use to organize their research. I loved the
        granularity of the data and thought it would be a fun challenge to try
        to visualize it in a digestible way.
      </p>
      <p>
        <b>
          Got feedback? I'd love to hear it. <br></br>
        </b>
        <a className="footer-link" href="mailto:naomi.m.ochoa@gmail.com">
          Send it my way!
        </a>
      </p>
      <p>
        {`Created by Naomi Ochoa `}
        <a href="https://www.linkedin.com/in/naomi-m-ochoa/">
          <Icon circular inverted color="grey" name="linkedin" />
        </a>
      </p>
    </footer>
  );
}
