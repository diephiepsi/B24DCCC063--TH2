import React from 'react';
import ProTable from '@ant-design/pro-table';
import { levels, blocks, subjects } from '../utils';

const QuestionTable = ({ questions }: { questions: any[] }) => {
  const columns: any = [
    {
      title: 'Nội dung',
      dataIndex: 'content',
      copyable: true,
      ellipsis: true,
      search: false, // Thường không tìm kiếm text dài theo kiểu filter
    },
    {
      title: 'Môn học',
      dataIndex: 'subjectCode',
      valueType: 'select',
      // Quan trọng: valueEnum giúp hiện dropdown tìm kiếm
      valueEnum: subjects.reduce((acc, cur) => ({ ...acc, [cur.value]: { text: cur.label } }), {}),
    },
    {
      title: 'Mức độ',
      dataIndex: 'level',
      valueType: 'select',
      valueEnum: levels.reduce((acc, cur) => ({ ...acc, [cur]: { text: cur } }), {}),
    },
    {
      title: 'Khối kiến thức',
      dataIndex: 'knowledgeBlock',
      valueType: 'select',
      valueEnum: blocks.reduce((acc, cur) => ({ ...acc, [cur]: { text: cur } }), {}),
    },
  ];

  return (
    <ProTable
      headerTitle="Danh sách câu hỏi"
      columns={columns}
      dataSource={questions}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false, // Luôn hiện thanh tìm kiếm
      }}
    />
  );
};

export default QuestionTable;