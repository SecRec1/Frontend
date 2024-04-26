import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SpecsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      specsItemClass: ""
    };
  }

  handleMouseEnter() {
    this.setState({ specsItemClass: "image-blur" });
  }

  handleMouseLeave() {
    this.setState({ specsItemClass: "" });
  }

  render() {
    const { id, description, thumb_image_url, logo_url } = this.props.item;
    return (
      <Link to={`/specs/${id}`}>
        <div
          className="specs-item-wrapper"
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          <div
            className={
              "specs-img-background " + this.state.specsItemClass
            }
            style={{
              backgroundImage: "url(" + thumb_image_url + ")"
            }}
          />

          <div className="img-text-wrapper">
            <div className="logo-wrapper">
              <img src={logo_url} />
            </div>

            <div className="subtitle">{description}</div>
          </div>
        </div>
      </Link>
    );
  }
}