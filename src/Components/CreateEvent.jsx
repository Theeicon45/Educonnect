import { Modal, Form, Input, Button, message } from 'antd';

const CreateEvent = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    // Convert date input to ISO format
    const eventDate = new Date(values.Event_Date);

    // Check if the date is valid
    if (isNaN(eventDate.getTime())) {
      message.error('Invalid event date');
      return;
    }

    const formattedValues = {
      ...values,
      Event_Date: eventDate.toISOString(),
    };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formattedValues),
      });

      if (response.ok) {
        message.success('Event created successfully!');
        form.resetFields();
        onClose();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      message.error('An error occurred while creating the event.');
    }
  };

  return (
    <Modal
      title="Create Event"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="Title"
          label="Title"
          rules={[{ required: true, message: 'Please input the event title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Description"
          label="Description"
          rules={[{ required: true, message: 'Please input the event description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="Event_Date"
          label="Event Date"
          rules={[{ required: true, message: 'Please input the event date!' }]}
        >
          <Input type="datetime-local" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEvent;
