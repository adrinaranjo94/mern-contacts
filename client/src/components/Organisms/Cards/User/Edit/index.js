import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@material-ui/core";
import FormUser from "components/Molecules/Forms/User";

const CardUserEdit = (props) => {
  const { user, history, handlers } = props;
  return (
    <Card>
      <CardContent>
        <FormUser
          onCancel={() => {
            history.push("?action=view");
          }}
          onSubmit={handlers?.onSubmit}
          data={user}
          mode="edit"
        />
      </CardContent>
    </Card>
  );
};

CardUserEdit.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handlers: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
};

export default CardUserEdit;
