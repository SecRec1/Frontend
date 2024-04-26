import React, { Component } from "react";
import axios from "axios";

export default class SpecsDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      specsItem: {},
    };
  }

  componentWillMount() {
    this.getSpecsItem();
  }

  getSpecsItem() {
    axios
      .get(
        `https://jordan.devcamp.space/specs/specs_items/${this.props.match.params.slug}`
      )
      .then((response) => {
        this.setState({
          specsItem: response.data.specs_item,
        });
      })
      .catch((error) => {
        console.log("getspecsitem error", error);
      });
  }

  render() {
    const {
      banner_image_url,
      category,
      description,
      logo_url,
      name,
      thumb_image_url,
      url,
    } = this.state.specsItem;

    const bannerStyles = {
      backgroundImage: "url(" + banner_image_url + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };

    const logoStyles = {
      width: "200px",
    };

    return (
      <div className="specs-detail-wrapper">
        <div className="banner" style={bannerStyles}>
          <img src={logo_url} style={logoStyles} />
        </div>

        <div className="specs-detail-description-wrapper">
          <div className="description">{description}</div>
        </div>

        <div className="bottom-content-wrapper">
          <a href={url} className="site-link" target="_blank">
            Visit {name}
          </a>
        </div>
      </div>
    );
  }
}
