import React, { useState } from "react";
import { Modal, Form, Row, Col, InputNumber, Button, DatePicker, Select, Spin } from "antd";
import { addShow, getAllShows } from "../../API/show";

const { Option } = Select;

function ShowForm({ ismodel, setIsmodel, setShow, movies, theaters }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 

  const showTimings = [
    { name: "Morning", time: "10:30 AM" },
    { name: "Matinee", time: "1:30 PM" },
    { name: "FirstShow", time: "6:00 PM" },
    { name: "SecondShow", time: "9:30 PM" },
  ];

  const onFinish = async (values) => {
    setLoading(true); 
    try {
      const { dates, movie, theater, ticketPrice, totalSeats } = values;

      const formattedShows = [];
      dates.forEach((date) => {
        showTimings.forEach((show) => {
          theater.forEach((theaterId) => {
            formattedShows.push({
              name: show.name,
              time: show.time,
              date: date.format("YYYY-MM-DD"),
              movie,
              theater: theaterId,
              ticketPrice,
              totalSeats,
            });
          });
        });
      });

      const promises = formattedShows.map((show) => addShow(show)); 
      await Promise.all(promises);

      const response = await getAllShows();
      setShow(response.data);
      setIsmodel(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding shows:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal
      title="Add Shows"
      open={ismodel}
      onCancel={() => setIsmodel(false)}
      footer={null}
    >
      <Spin spinning={loading}> 
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ticketPrice: 100, totalSeats: 100 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Select Dates"
                name="dates"
                rules={[{ required: true, message: "Please select at least one date" }]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" multiple />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Select Theaters"
                name="theater"
                rules={[{ required: true, message: "Please select at least one theater" }]}
              >
                <Select mode="multiple" placeholder="Select theaters">
                  {theaters.map((theater) => (
                    <Option key={theater._id} value={theater._id}>
                      {theater.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Select Movie"
                name="movie"
                rules={[{ required: true, message: "Please select a movie" }]}
              >
                <Select placeholder="Select a movie">
                  {movies.map((movie) => (
                    <Option key={movie._id} value={movie._id}>
                      {movie.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[{ required: true, message: "Ticket price is required" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter ticket price" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[{ required: true, message: "Total seats are required" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Enter total seats" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
            <Button block onClick={() => setIsmodel(false)} className="mt-2">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default ShowForm;
