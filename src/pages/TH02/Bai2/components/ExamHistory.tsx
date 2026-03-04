import React from 'react';
import { Table, Button, Modal, Tag, Space, Empty } from 'antd';
import { EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import { Exam } from '../utils';

interface Props {
  exams: Exam[];
}

const ExamHistory: React.FC<Props> = ({ exams }) => {
  const viewDetails = (record: Exam) => {
    Modal.info({
      title: `Chi tiết Đề thi - Mã: ${record.id}`,
      width: 700,
      content: (
        <div style={{ marginTop: 20 }}>
          <p><b>Môn học:</b> {record.subjectCode}</p>
          <p><b>Thời gian khởi tạo:</b> {record.createdAt}</p>
          <hr />
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {record.questions.map((q, index) => (
              <div key={q.id} style={{ marginBottom: 15, padding: '10px', background: '#fafafa', borderRadius: '4px' }}>
                <p><b>Câu {index + 1} ({q.level}):</b></p>
                <p>{q.content}</p>
                <small style={{ color: '#888' }}>Khối kiến thức: {q.knowledgeBlock}</small>
              </div>
            ))}
          </div>
        </div>
      ),
      okText: 'Đóng',
    });
  };

  const columns = [
    {
      title: 'Mã đề thi',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Môn học',
      dataIndex: 'subjectCode',
      key: 'subjectCode',
      filters: [
        { text: 'Lập trình Web', value: 'IT01' },
        { text: 'Cấu trúc dữ liệu', value: 'IT02' },
      ],
      onFilter: (value: any, record: Exam) => record.subjectCode === value,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: Exam, b: Exam) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Quy mô',
      key: 'count',
      render: (_: any, record: Exam) => (
        <Tag color="cyan">{record.questions.length} câu hỏi</Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Exam) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => viewDetails(record)}>Xem đề</Button>
          <Button icon={<PrinterOutlined />} type="dashed">In đề</Button>
        </Space>
      ),
    },
  ];

  if (exams.length === 0) return <Empty description="Chưa có đề thi nào được tạo" />;

  return (
    <Table
      columns={columns}
      dataSource={exams}
      rowKey="id"
      bordered
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ExamHistory;