import React from "react";
import { Accordion, Button, Icon, Divider } from "semantic-ui-react";
import "./criteria.css";

export default function Criteria({ allCriteria }) {
  const [activeIndex, setActiveIndex] = React.useState(-1);

  function handleClick(idx) {
    activeIndex === idx ? setActiveIndex(-1) : setActiveIndex(idx);
  }

  return (
    <section className="criteria-section">
      <Accordion as="ul" className="criteria-list">
        {allCriteria.map((criteria, i) => {
          return (
            <React.Fragment>
              <li className="criteria-list-item">
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={() => handleClick(i)}
                  className="criteria-title-area"
                >
                  <Icon name="dropdown" size="big" />
                  <h3 className="criteria-title">
                    {criteria["criteria-name"]}
                  </h3>
                  {criteria.active ? (
                    <Button basic className="hide-show-button">
                      Hide
                    </Button>
                  ) : (
                    <Button basic className="hide-show-button">
                      Show
                    </Button>
                  )}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  <div className="criteria-description">
                    <h4 className="criteria-subtitle">Evaluation Factors:</h4>
                    {criteria["evaluation-factors"]}
                    <br></br>
                    <h4 className="criteria-subtitle">Methodology:</h4>
                    {criteria.methodology}
                  </div>
                </Accordion.Content>
              </li>
              <Divider className="criteria-divider" />
            </React.Fragment>
          );
        })}
      </Accordion>
    </section>
  );
}
