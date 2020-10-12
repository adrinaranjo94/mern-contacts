import React from "react";
import PropTypes from "prop-types";
import DialogDefault from "../../Default";
import FormUser from "components/Molecules/Forms/User";

const DialogAddUser = (props) => {
  return (
    <DialogDefault
      open={props.open}
      handlers={props.handlers}
      title={"Add User"}
    >
      <FormUser
        onCancel={props.handlers?.onCancel}
        onSubmit={props.handlers?.onSubmit}
        data={props.data}
      />
    </DialogDefault>
  );
};

DialogAddUser.defaultProps = {
  open: false,
};

DialogAddUser.propTypes = {
  open: PropTypes.bool,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.object,
};

export default DialogAddUser;
