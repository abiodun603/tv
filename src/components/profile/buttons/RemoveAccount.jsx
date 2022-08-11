import { Col, Row } from 'react-bootstrap';
import { ButtonText } from '../../widgets/Button';
import ConfirmDialog from '../../dialogs/Confirm';

const RemoveAccount = ({ onClick, dialog }) => {
  return (
    <Row className="mb-4">
      <Col>
        <ButtonText
          onClick={onClick}
          startIcon={
            <span className="account-list__logout-icon icon icon_name_delete" />
          }
        >
          <span className="text-danger font-weight-bold text text_view_secondary text-uppercase">
            Delete My Account
          </span>
        </ButtonText>
        <ConfirmDialog
          opened={dialog.opened}
          onClose={dialog.onClose}
          onSubmit={dialog.onSubmit}
        />
      </Col>
    </Row>
  );
};

export default RemoveAccount;
