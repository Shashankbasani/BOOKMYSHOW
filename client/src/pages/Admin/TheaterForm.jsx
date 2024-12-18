import { Modal, Form, Row, Col, Input, Button, Checkbox } from 'antd';
import { GetAllTheaters, addTheater } from '../../API/theater';

function TheaterForm({ ismodel, setIsmodel, setTheater }) {
  const handleOk = () => {
    setIsmodel(false);
  };

  const handleCancel = () => {
    setIsmodel(false);
  };

  const onFinish = async (values) => {
    console.log(values); // Check the form values
    const res = await addTheater(values);
    console.log(res);

    if (res) {
      const response = await GetAllTheaters();
      const allTheaters = response.data;
      setTheater(
        allTheaters.map((i) => ({
          ...JSON.parse(JSON.stringify(i)),
          key: i._id,
        }))
      );
      setIsmodel(false);
    }
  };

  return (
    <Modal
      open={ismodel}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Theater</h3>
      <Form
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={onFinish}
      >
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          {/* Name */}
          <Col span={24}>
            <Form.Item
              label="Theater Name"
              name="name"
              rules={[{ required: true, message: 'Theater name is required' }]}
            >
              <Input placeholder="Enter the theater name" />
            </Form.Item>
          </Col>

          {/* Address */}
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Address is required' }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Enter the theater address"
              />
            </Form.Item>
          </Col>

          {/* Phone */}
          <Col span={24}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: 'Phone number is required' },
                {
                  pattern: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number',
                },
              ]}
            >
              <Input placeholder="Enter phone number" maxLength={10} />
            </Form.Item>
          </Col>

          {/* Owner ID */}
          <Col span={24}>
            <Form.Item
              label="Owner ID"
              name="owner"
              rules={[{ required: true, message: 'Owner ID is required' }]}
            >
              <Input placeholder="Enter the Owner ID" />
            </Form.Item>
          </Col>

          {/* isActive Checkbox */}
          <Col span={24}>
            <Form.Item
              name="isActive"
              valuePropName="checked"
              initialValue={false}
            >
              <Checkbox>Is Active</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit and Cancel Buttons */}
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: '1rem', fontWeight: '600' }}
          >
            Submit
          </Button>
          <Button
            className="mt-3"
            block
            onClick={() => setIsmodel(false)}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TheaterForm;
