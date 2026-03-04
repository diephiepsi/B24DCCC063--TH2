import React from 'react';
import { Form, Button, Card, Space, InputNumber, Select, Alert } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { levels, subjects } from '../utils';

interface Props {
  onGenerate: (values: any) => void;
}

const ExamGenerator: React.FC<Props> = ({ onGenerate }) => {
  const [form] = Form.useForm();

  return (
    <Card title="Cấu trúc đề thi tự động" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Alert
        message="Lưu ý: Hệ thống sẽ lấy ngẫu nhiên câu hỏi từ ngân hàng dựa trên môn học và mức độ bạn chọn."
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
      />
      <Form form={form} layout="vertical" onFinish={onGenerate}>
        <Form.Item
          name="subjectCode"
          label="Chọn môn học để tạo đề"
          rules={[{ required: true, message: 'Vui lòng chọn môn học' }]}
        >
          <Select options={subjects} placeholder="Chọn môn học" />
        </Form.Item>

        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
          <p><b>Số lượng câu hỏi theo mức độ:</b></p>
          <Space wrap size="large">
            {levels.map((level) => (
              <Form.Item
                key={level}
                name={level}
                label={`Mức ${level}`}
                initialValue={0}
              >
                <InputNumber min={0} precision={0} />
              </Form.Item>
            ))}
          </Space>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          icon={<ThunderboltOutlined />}
          style={{ marginTop: 24 }}
        >
          Tạo đề thi ngay
        </Button>
      </Form>
    </Card>
  );
};

export default ExamGenerator;