import React from "react";
import {
  LoadingTemplate,
  ErrorTemplate,
  InvalidTemplate,
} from "components/templates";
import PropTypes from "prop-types";

const SwitchStatus = (props) => {
  switch (props.status) {
    case "action_download":
      return props.action_download();
    case "downloading":
      return props.downloading() ? (
        props.downloading()
      ) : (
        <LoadingTemplate
          text={props.translation?.templates?.downloading || "Downloading"}
        />
      );
    case "loading":
      return props.loading() ? (
        props.loading()
      ) : (
        <LoadingTemplate
          text={props.translation?.templates?.loading || "Loading"}
        />
      );
    case "success":
      return props.success();
    case "error":
      return props.error() ? (
        props.error()
      ) : (
        <ErrorTemplate text={props.translation?.templates?.error || "Error"} />
      );
    default:
      return <InvalidTemplate />;
  }
};

SwitchStatus.defaultProps = {
  action_download: () => null,
  downloading: () => null,
  loading: () => null,
  success: () => null,
  error: () => null,
};

SwitchStatus.propTypes = {
  action_download: PropTypes.func,
  downloading: PropTypes.func,
  loading: PropTypes.func,
  success: PropTypes.func,
  error: PropTypes.func,
  status: PropTypes.string.isRequired,
};

export { SwitchStatus };
