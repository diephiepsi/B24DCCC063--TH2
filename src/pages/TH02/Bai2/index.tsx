import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Button, message, Card, Form, InputNumber, Table, Modal, Space } from 'antd';
import { PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import QuestionTable from './components/QuestionTable';
import QuestionForm from './components/QuestionForm';
import { levels, subjects } from './utils';

const Bai2Main = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  const handleGenerate = (values: any) => {
    const { subjectCode, ...structure } = values;
    let selected: any[] = [];
    try {
      Object.keys(structure).forEach(lvl => {
        const count = structure[lvl];
        if (count > 0) {
          const pool = questions.filter(q => q.subjectCode === subjectCode && q.level === lvl);
          if (pool.length < count) throw new Error(`Không đủ câu hỏi mức ${lvl} cho môn này!`);
          selected.push(...pool.sort(() => 0.5 - Math.random()).slice(0, count));
        }
      });
      if (selected.length === 0) return message.warning("Hãy nhập số lượng câu hỏi");
      setExams([{ id: `DE-${Date.now()}`, subjectCode, questions: selected, createdAt: new Date().toLocaleString() }, ...exams]);
      message.success('Tạo đề thi thành công!');
    } catch (e: any) { message.error(e.message); }
  };

  return (
    <PageContainer title="Hệ thống Quản lý Đề thi">
      <Tabs type="card">
        <Tabs.TabPane tab="Ngân hàng câu hỏi" key="1">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)} style={{ marginBottom: 16 }}>Thêm câu hỏi</Button>
          <QuestionTable questions={questions} />
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Tạo đề thi tự động" key="2">
          <Card>
            <Form onFinish={handleGenerate} layout="vertical">
              <Form.Item name="subjectCode" label="Chọn môn học" rules={[{ required: true }]}>
                <Space>{subjects.map(s => <Button key={s.value} type="dashed">{s.label}</Button>)}</Space>
              </Form.Item>
              <Space wrap>
                {levels.map(l => (
                  <Form.Item key={l} name={l} label={`Số câu ${l}`} initialValue={0}>
                    <InputNumber min={0} />
                  </Form.Item>
                ))}
              </Space>
              <Button type="primary" htmlType="submit" block icon={<ThunderboltOutlined />}>Bắt đầu tạo đề</Button>
            </Form>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Lịch sử đề thi" key="3">
          <Table 
            dataSource={exams} 
            rowKey="id"
            columns={[
              { title: 'Mã đề', dataIndex: 'id' },
              { title: 'Môn', dataIndex: 'subjectCode' },
              { title: 'Thao tác', render: (_, r) => (
                <Button onClick={() => Modal.info({ title: 'Nội dung đề', content: r.questions.map((q:any) => <p>- {q.content}</p>) })}>Xem chi tiết</Button>
              )}
            ]} 
          />
        </Tabs.TabPane>
      </Tabs>
      <QuestionForm visible={visible} onVisibleChange={setVisible} onFinish={async (v: any) => setQuestions([...questions, { ...v, id: Date.now().toString() }])} />
    </PageContainer>
  );
};

export default Bai2Main;