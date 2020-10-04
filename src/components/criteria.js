import React from "react";
import { connect } from "react-redux";
import { hideCriteria, showCriteria } from "../store/criteria";
import { Accordion, Button, Icon, Divider } from "semantic-ui-react";
import "./criteria.css";

function Criteria({ allCriteria, hideCriteria, showCriteria }) {
  const [activeIndex, setActiveIndex] = React.useState(-1);

  function handleClick(e, idx) {
    if (e.target.type === "submit") return;
    activeIndex === idx ? setActiveIndex(-1) : setActiveIndex(idx);
  }

  return (
    <section className="criteria-section">
      <Accordion as="ul" className="criteria-list">
        {allCriteria.map((criteria, i) => {
          return (
            <React.Fragment key={criteria["criteria-name"]}>
              <li className="criteria-list-item">
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={(e) => handleClick(e, i)}
                  className="criteria-title-area"
                >
                  <Icon name="dropdown" size="big" />
                  <h3 className="criteria-title">
                    {criteria["criteria-name"]}
                  </h3>
                  {criteria.active ? (
                    <Button
                      basic
                      className="hide-show-button"
                      onClick={() => hideCriteria(criteria["criteria-name"])}
                    >
                      Hide
                    </Button>
                  ) : (
                    <Button
                      basic
                      className="hide-show-button"
                      onClick={() => showCriteria(criteria["criteria-name"])}
                    >
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

const mapDispatch = (dispatch) => {
  return {
    hideCriteria: (criteriaName) => dispatch(hideCriteria(criteriaName)),
    showCriteria: (criteriaName) => dispatch(showCriteria(criteriaName)),
  };
};

export default connect(null, mapDispatch)(Criteria);
