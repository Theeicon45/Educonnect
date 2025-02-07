import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const PrivacyPolicyModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle modal open
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleOk = () => {
    setIsModalVisible(false);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Button to trigger modal */}
      <Button type="link" onClick={showModal}>
        Privacy Policy
      </Button>

      {/* Modal component */}
      <Modal
        title="Privacy Policy"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // No footer buttons, we handle it manually
        width={600}
      >
        <div className="privacy-policy-text">
          <h2>Privacy Policy</h2>
          <p>
            We take your privacy seriously. By using this system, you consent to our use of your data according to our policy.
          </p>
          <p>
            1. **Data Collection**: We collect personal information necessary to manage your account and provide you with the best experience.
          </p>
          <p>
            2. **Data Use**: Your data is used solely for system functionality and is not shared with third parties unless necessary for service provision.
          </p>
          <p>
            3. **Security**: We take appropriate measures to protect your data, but no method of transmission over the internet is completely secure.
          </p>
          <p>
            4. **Data Retention**: We retain your data for as long as your account is active or as required by law.
          </p>
          <p>
            If you have any questions or concerns about our privacy practices, please contact us.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default PrivacyPolicyModal;
